import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, ToastModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private AuthService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    // Check if "Remember Me" was checked previously
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      this.loginForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill out all fields correctly.',
      });
      return;
    }

    const email = this.loginForm.value.email.toLowerCase(); // Email is not case-sensitive
    const password = this.loginForm.value.password; // Password is case-sensitive
    const rememberMe = this.loginForm.value.rememberMe;

    // Save email to localStorage if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    // Call the login method from AuthService
    this.AuthService.login(email, password).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful! Redirecting...',
        });

        this.AuthService.setToken(response.token);
       
        // Redirect to dashboard or home page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/welcome']); // Adjust the route as needed
        }, 2000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message, // Display the error message from the API
        });
      },
    });

  }

  // navigateToForgotPassword() {
  //   this.router.navigate(['/forgot-password']);
  // }
}