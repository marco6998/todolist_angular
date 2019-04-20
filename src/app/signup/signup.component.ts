import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  passwordPreviews = {
    first: true,
    confirm: true
  }
  signupForm: FormGroup;
  submittedForm: boolean = false;
  errorMessage: string = '';
  // firstStatus: boolean = true;
  // firstStatus: boolean = true;
  passText: string = 'Contraseña';

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.buildForm();

  }
  buildForm() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      secondLastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      username: ['', [Validators.required], this.checkValidUsername()],
      passwords: this.fb.group({
        psw: ['', [Validators.required]],
        confirm: ['', [Validators.required]]
      }, {
          validator: (group: FormGroup) => {
            let first = group.get('psw').value;
            let confirm = group.get('confirm').value;

            return first === confirm ? null : { notSame: true };
          }
        })
    });
    this.signupForm.valueChanges
      .subscribe(() => {
        this.errorMessage = '';
        this.submittedForm = false;
      })
  }
  checkValidUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> => {
      return this.authService.findUsername(this.signupForm.get('username').value)
        .pipe(
          map((res: any) => {
            return res.username ? { usernameExits: true } : null;
          })
        )
    }
  }

  getIcon(value: boolean): string {
    if (value) {
      return 'eye';
    } else {
      return 'eye-slash';
    }
  }
  signup(event: Event): void {
    event.preventDefault();
    this.submittedForm = true;
    if (this.signupForm.invalid) {
      this.errorMessage = 'Por favor revisa los campos';
      return;
    }
    this.alertService.show({
      title: 'Super Alerta',
      body: '¿Estás seguro de jakiar la N A S A?',
      cancelButton: true,
      type: 'success'
    })

    let user=this.signupForm.value;

    this.authService.signup(user)
    .suscribe((res)=>{
      cnsol.log(res);
      console.log('registroExistoso')
    },(err)=>{
      console.log(err);
      console.log('Registro fallido');
    })
  }
}
