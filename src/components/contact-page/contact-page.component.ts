import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from './email.service';
import { CouponService } from './coupon.service';
import { EmailPayload } from '../../models/email-payload.model';
import { CouponCreate } from '../../models/CouponCreate';
import { TokenService } from '../profile/tokenservice';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent {
  formData = {
    fname: '',
    lname: '',
    email: '',
    country: '',
    problem: '',
    subject: '',
    userId: 0 // completat automat dacă ai sistem de autentificare
  };

  constructor(
    private emailService: EmailService,
    private couponService: CouponService,
    private tokenService: TokenService,
    private router: Router // Injectăm TokenService
  ) {}

  ngOnInit(): void {
    // Obținem userId din TokenService
    this.formData.userId = this.tokenService.getUserId() ?? 0;
  }

  onSubmit() {
    const { fname, lname, email, problem, country, subject, userId } = this.formData;

    // 1. Creare cupon
    const couponPayload: CouponCreate = {
      userId,
      discountValue: 20,
      expirationDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) // +1 lună
    };

    this.couponService.createCoupon(couponPayload).subscribe({
      next: (couponResponse) => {
        const couponCode = couponResponse.code;

        // 2. Email pentru client cu cupon
        const htmlContentUser = `<html><body><h1>Salut ${fname},</h1>
          <p>Ți-am primit cererea despre: <strong>${problem}</strong></p>
          <p>Țara: ${country}</p>
          <p>Detalii: ${subject}</p>
          <h3>🎁 Cod cupon: <span style="color:green">${couponCode}</span></h3>
          <p>Folosește-l pentru 20% reducere. Valabil 30 de zile.</p>
        </body></html>`;

        const textContentUser = `Salut ${fname}, ne-ai contactat despre ${problem}. Codul tău de reducere este: ${couponCode}`;

        const userPayload = new EmailPayload(email, 'Mesaj Important - Cupon inclus', textContentUser, htmlContentUser);

        this.emailService.sendEmail(userPayload).subscribe({
          next: () => console.log('Email trimis către client cu cupon'),
          error: (err) => alert('Eroare trimitere către client: ' + err.message)
        });

        // 3. Email pentru suport
        const supportHtml = `<html><body><h1>Cerere nouă de la client</h1><ul>
          <li><strong>Nume:</strong> ${fname} ${lname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Țara:</strong> ${country}</li>
          <li><strong>Problemă:</strong> ${problem}</li>
          <li><strong>Detalii:</strong> ${subject}</li>
          <li><strong>Cupon Generat:</strong> ${couponCode}</li>
        </ul></body></html>`;

        const supportText = `Client: ${fname} ${lname}\nEmail: ${email}\nCupon: ${couponCode}`;

        const supportPayload = new EmailPayload('nunuelectronics2@gmail.com', 'Cerere nouă client + cupon', supportText, supportHtml);

        this.emailService.sendEmail(supportPayload).subscribe({
          next: () => alert('Mesajul a fost trimis cu succes!'),
          error: (err) => alert('Eroare trimitere către suport: ' + err.message)
        });
      },
      error: (err) => alert('Eroare generare cupon: ' + err.message)
    });
    this.router.navigate(['']);
  }
}
