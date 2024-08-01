import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent,
    FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,
    CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      mot_de_passe: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // Arrêter ici si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }
    const username = this.f['username'].value; // Extraire le nom d'utilisateur

    this.loginService.login(this.f['username'].value, this.f['mot_de_passe'].value).subscribe({ 
      next:(response:any)=>{
        // Stocker les informations de l'utilisateur ou gérer la session comme nécessaire
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/home']); // Rediriger vers le tableau de bord après la connexion
      },
      error:(error:any)=>{
        console.log(error)
        this.errorMessage = 'Invalid credentials';
      }
  });
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}