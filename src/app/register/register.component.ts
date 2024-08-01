import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [
    ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent,
    FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,
    CommonModule, ReactiveFormsModule
  ]
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      mot_de_passe: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordsMatch });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordsMatch(formGroup: FormGroup) {
    const password = formGroup.get('mot_de_passe')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, mot_de_passe } = this.registerForm.value;

      this.registerService.registerAdmin({ username, mot_de_passe })
        .subscribe({
          next: (response: any) => {
            console.log('Succès:', response);
            this.router.navigate(['/login']); // Rediriger vers le tableau de bord après la connexion
          },
          error: (error: any) => {
            console.log('Erreur', error);
            // Handle registration error
          }
        });
    }
  }
}
