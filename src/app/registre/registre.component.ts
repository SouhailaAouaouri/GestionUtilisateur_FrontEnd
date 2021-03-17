import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../model/utilisateur';
import {UtilisateurServiceService} from '../service/utilisateur-service.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {

  constructor(private service: UtilisateurServiceService,
              private router: Router,
              private snackBar: MatSnackBar) { }


  get nom(){
    return this.form.get('nom');
  }
  get prenom(){
    return this.form.get('prenom');
  }
  get email(){
    return this.form.get('email');
  }
  get password(){
    return this.form.get('password');
  }
  u: Utilisateur = new Utilisateur();
  form = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
  }
  addUser(): void{
    console.log(this.form.value);
    this.service.createSuperUtlisateur(this.form.value).subscribe(
      data => {
        console.log(data);
        this.snackBar.open('Super Utilisateur ajouté avec succès', '', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bb']
        });

      }, error => {
        console.log(error);
      });


  }

  onSubmit(): void{

    if (this.form.valid) {
      this.service.findByEmail(this.email.value)
        .subscribe(data => {
            this.u = data ;
            if (this.u == null ){
              this.addUser();
              this.toSignIn();
            }else{
              this.snackBar.open('L\'utilisateur existe déjà', '', {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['aa']
              });
            }
          },
          error => console.log(error));
    }else{
      this.validateAllFormFields(this.form);
    }
  }

  toSignIn(): void{
    this.router.navigate(['/SignIn']);
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
