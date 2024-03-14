import { Component } from '@angular/core';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.scss']
})
export class NoInternetComponent {

  text = "C'est de notre faute, nous vous avons interrrompu parce que la connexion internet de votre appareil n'est plus disponible.";

}
