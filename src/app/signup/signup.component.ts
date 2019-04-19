import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  passwordPreviews = {
    first: true,
    confirm: true
  }
  // firstStatus: boolean = true;
  // firstStatus: boolean = true;
  passText: string = 'Contraseña';

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  getIcon(value: boolean): string {
    if (value) {
      return 'eye';
    } else {
      return 'eye-slash';
    }
  }
  signup(event: Event):void{
    event.preventDefault();
    this.alertService.show({
      tittle: 'Super Alerta', 
      body:'¿Estás seguro de jakiar la N A S A?'
    })

  }
}
