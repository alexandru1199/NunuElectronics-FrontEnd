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
    const { fname, lname, email, problem, country, subject } = this.formData;
  
    const emailSubject = 'Mesaj Important - Acțiune necesară';
    const textContentUser = `Salut ${fname}, ne-ai contactat despre ${problem}. Vom reveni curând.`;
    const htmlContentUser = `<html><body><h1>Salut ${fname},</h1><p>Ți-am primit cererea despre: <strong>${problem}</strong></p><p>Țara: ${country}</p><p>Detalii: ${subject}</p></body></html>`;
  
    const userPayload = new EmailPayload(email, emailSubject, textContentUser, htmlContentUser);
  
    const supportText = `Client: ${fname} ${lname}\nEmail: ${email}\nȚara: ${country}\nProblemă: ${problem}\nDetalii: ${subject}`;
    const supportHtml = `<html><body><h1>Cerere nouă de la client</h1><ul>
      <li><strong>Nume:</strong> ${fname} ${lname}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Țara:</strong> ${country}</li>
      <li><strong>Problemă:</strong> ${problem}</li>
      <li><strong>Detalii:</strong> ${subject}</li>
    </ul></body></html>`;
  
    const supportPayload = new EmailPayload('nunuelectronics2@gmail.com', 'Cerere nouă client', supportText, supportHtml);
  
    // Trimite emailul către utilizator
    this.emailService.sendEmail(userPayload).subscribe({
      next: () => console.log('Email trimis către client'),
      error: (err) => alert('Eroare trimitere către client: ' + err.message)
    });
  
    // Trimite emailul către suport
    this.emailService.sendEmail(supportPayload).subscribe({
      next: () => alert('Mesajul a fost trimis cu succes!'),
      error: (err) => alert('Eroare trimitere către suport: ' + err.message)
    });
  }
  
}