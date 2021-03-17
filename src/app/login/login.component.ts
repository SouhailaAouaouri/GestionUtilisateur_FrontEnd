import { Component, OnInit } from '@angular/core';
import {UtilisateurServiceService} from '../service/utilisateur-service.service';
import {Utilisateur} from '../model/utilisateur';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
u: Utilisateur = new Utilisateur();
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  constructor(private utilisateurService: UtilisateurServiceService,
              private router: Router,
              private snackBar: MatSnackBar,
              private cookie: CookieService)
  {

  }

  ngOnInit(): void {
  }
  signIn(): void {
    if (this.form.valid) {

      this.utilisateurService.login(this.email.value, this.password.value)
        .subscribe(data => {
            this.u = data;
            if (this.u == null){
              this.snackBar.open('email ou mot de passe invalide  ', '', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['aa']
              });
            }
            if (this.u.role === 'Super Utilisateur') {
              this.cookie.set('login', this.u.email);
              this.toHomePage();
              this.snackBar.open('Welcome ' + this.u.nom + ' ' + this.u.prenom, '', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['bb']
              });
            } else {
              // pour ajouter une cookie
              this.cookie.set('login', this.u.email);
              this.toProfilPage();
              this.snackBar.open('Welcome ' + this.u.nom + ' ' + this.u.prenom, '', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['bb']
              });
            }
            console.log(data);
          },
          error => {
            console.log(error);
          });
    }else{
      this.validateAllFormFields(this.form);

    }
  }
   toProfilPage(): void{
    this.router.navigate(['/profil', this.u.id]);

  }

  toHomePage(): void{

    this.router.navigate(['/Home']);
  }

  toSignUp(): void {
    this.router.navigate(['/SignUp']);
  }
  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }
  validateAllFormFields(formGroup: FormGroup)
  {Object.keys(formGroup.controls).forEach(field =>
  {const control = formGroup.get(field);
   if (control instanceof FormControl)
    {control.markAsTouched({ onlySelf: true }); }
    else if (control instanceof FormGroup)
    {this.validateAllFormFields(control); }});
  }


}
