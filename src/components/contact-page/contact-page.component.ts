import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importă FormsModule
import { EmailService } from './email.service';
import { EmailPayload } from '../../models/email-payload.model';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule],  // Adaugă FormsModule aici
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {

  // Creează un obiect formData care conține toate datele
  formData = {
    fname: '',
    lname: '',
    email: '',
    country: '',
    problem: '',
    subject: ''
  };

  constructor(private emailService: EmailService) {}

  // Funcția de trimitere a email-ului
  onSubmit() {
    const { fname, email, problem, country, subject } = this.formData;  // Nu mai e nevoie să declarăm din nou 'subject'
    
    const to = email;
    const emailSubject = 'Mesaj Important - Acțiune necesară';  // Noul subiect pentru email
    const textContent = `Salut ${fname}, ne-ai contactat despre ${problem}. Vom reveni curând.`;

    const htmlContent = `<html><body><h1>Salut ${fname},</h1><p>Ți-am primit cererea despre: <strong>${problem}</strong></p><p>Țara: ${country}</p><p>Detalii: ${subject}</p></body></html>`;

    const payload = new EmailPayload(to, emailSubject, textContent, htmlContent);

    this.emailService.sendEmail(payload).subscribe({
      next: () => alert('Email trimis cu succes!'),
      error: (err) => alert('Eroare la trimitere: ' + err.message)
    });
  }
}
