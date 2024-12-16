import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateComponent } from '../components/template/template.component';
import { HomepageComponent } from '../components/homepage/homepage.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TemplateComponent,HomepageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Nunu-Electronics';
  playAudio() {
    let audio = new Audio();
    audio.src = "../assets/sounds/ÜN ÜN ÜN.mp3"; // Ensure the path is correct
    audio.load();
    audio.play();
    console.log(audio);

    // Stop the audio after 2 seconds
    setTimeout(() => {
        audio.pause();
        audio.currentTime = 0; // Reset to the beginning if needed
    }, 1300); // 2000ms = 2 seconds
}
}