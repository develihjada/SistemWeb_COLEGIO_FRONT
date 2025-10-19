import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Client, IMessage, Frame, StompSubscription } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from '../../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  private client: Client;
  private isConnected = false;
  private connectionPromise: Promise<void>;
  private connectionResolver!: () => void;

  private apoderadoSubject = new Subject<string>();
  apoderadoChanges$ = this.apoderadoSubject.asObservable();

  // Observable público con el estado de la conexión (true = conectado)
  private connectionStatusSubject = new BehaviorSubject<boolean>(false);
  connectionStatus$ = this.connectionStatusSubject.asObservable();

  private defaultUrl = environment.apiws;

  constructor() {
    // Inicializar la promesa de conexión. Los consumidores pueden await
    // this.connectionPromise para esperar hasta que la conexión STOMP esté lista.
    this.connectionPromise = new Promise<void>((resolve) => {
      this.connectionResolver = resolve;
    });

    this.client = new Client({
      reconnectDelay: 5000,
      debug: (str) => { /* uncomment for verbose logging: console.debug(str); */ },
      webSocketFactory: () => {
        const SockCtor = (SockJS as any).default ?? (SockJS as any);
        return new SockCtor(this.defaultUrl);
      },
    });

    // Se ejecuta cuando STOMP establece conexión con el servidor
    this.client.onConnect = (frame: Frame) => {
      console.log('✅ Conectado al WebSocket');
      // Marcar como conectado, emitir estado y resolver la promesa si alguien estaba esperando
      this.isConnected = true;
      this.connectionStatusSubject.next(true);
      try {
        if (this.connectionResolver) this.connectionResolver();
      } catch (e) {
        // noop
      }
      try {
        // Nos suscribimos al topic donde el backend publica cambios de apoderados
        this.client.subscribe('/topic/apoderados', (message: IMessage) => {
          if (message.body) {
            // Emitimos el cuerpo del mensaje hacia los consumidores del servicio
            this.apoderadoSubject.next(message.body);
          }
        });
      } catch (err) {
        console.error('Error al suscribirse al topic de apoderados', err);
      }
    };

    this.client.onStompError = (frame) => {
      console.error('❌ Error STOMP:', frame);
    };
  }

  /**
   * Espera a que la conexión STOMP se establezca. Útil para llamadas que requieren
   * estar conectadas (por ejemplo, publish/subscribe). Devuelve inmediatamente si
   * ya estamos conectados.
   */
  async waitUntilConnected(): Promise<void> {
    if (this.isConnected) return;
    return this.connectionPromise;
  }

  connect(): void {
    // Conecta con reconexión automática según la configuración existente
    if (!this.client.active) {
      this.client.activate();
    }
  }

  connectConfigured(autoReconnect: boolean = true): void {
    this.client.reconnectDelay = autoReconnect ? 5000 : 0;
    if (!this.client.active) this.client.activate();
  }


  connectOnce(): void {
    this.connectConfigured(false);
  }

  disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
    }
    // Resetear el estado de conexión y la promesa para futuras reconexiones
    this.isConnected = false;
    this.connectionStatusSubject.next(false);
    this.connectionPromise = new Promise<void>((resolve) => {
      this.connectionResolver = resolve;
    });
  }

  subscribe(destination: string, callback: (message: IMessage) => void): StompSubscription | null {
    if (!this.client || !this.client.active) {
      this.connect();
    }
    try {
      return this.client.subscribe(destination, callback as any);
    } catch (err) {
      console.error('Fallo al suscribirse', err);
      return null;
    }
  }

  private timeout(ms: number) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms));
  }

  /**
   * Publica un mensaje y espera a que la conexión STOMP esté establecida (timeout en ms).
   */
  async publish(destination: string, body: any, waitMs = 5000): Promise<void> {
    // Si no estamos conectados, intentar conectar y esperar hasta waitMs
    if (!this.isConnected) {
      console.warn('Cliente STOMP no conectado, intentando conectar antes de publicar');
      // Intentamos una conexión con reconexión automática corta
      this.connectConfigured(true);
      try {
        await Promise.race([this.waitUntilConnected(), this.timeout(waitMs)]);
      } catch (err) {
        console.error('No se pudo establecer conexión STOMP antes de publicar:', err);
        return;
      }
    }

    try {
      this.client.publish({ destination, body: typeof body === 'string' ? body : JSON.stringify(body) });
    } catch (err) {
      console.error('Fallo al publicar mensaje', err);
    }
  }
}
