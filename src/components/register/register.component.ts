import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from './regiser.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      // Trimitem username, password și adăugăm roleId: 3
      const payload = {
        UserName: formValue.username,
        password: formValue.password,
        roleId: 3
      };

      this.registerService.register(payload).subscribe({
        next: () => this.router.navigate(['']),
        error: () => {
          this.errorMessage = 'Înregistrare eșuată. Verificați datele!';
        }
      });
    }
  }
}
