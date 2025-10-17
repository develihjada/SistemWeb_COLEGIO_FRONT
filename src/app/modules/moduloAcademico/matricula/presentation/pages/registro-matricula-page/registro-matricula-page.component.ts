import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-registro-matricula-page',
  standalone: true,
  imports: [],
  templateUrl: './registro-matricula-page.component.html',
  styleUrl: './registro-matricula-page.component.css'
})
export class RegistroMatriculaPageComponent {

  private location = inject(Location);

  currentStep: number = 1;
  formData: any = {};

  goToStep(step: number): void {
    if (step >= 1 && step <= 4) {
      this.currentStep = step;
    }
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    } else {
      console.log('Matrícula Finalizada', this.formData);
    }
  }

  prevStep(): void {

    if(this.currentStep == 1) {
      this.location.back();
    }

    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }


}
