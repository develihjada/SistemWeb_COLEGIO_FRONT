import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../components/sidebar/sidebar';


@Component({
  selector: 'app-inicio-page',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './inicio-page.html',
  styleUrl: './inicio-page.css'
})
export class InicioPage {
  sidebarVisible = false;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
