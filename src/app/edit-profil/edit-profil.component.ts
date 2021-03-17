import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../model/utilisateur';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilisateurServiceService} from '../service/utilisateur-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {
  u: Utilisateur = new Utilisateur();
  id1: number;
  form = this.fb.group({
    id: [null],
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    email: new FormControl('', [ Validators.required, Validators.email]),
    pwd: new FormControl('', Validators.required),
  });
  // tslint:disable-next-line:max-line-length
  constructor( private router: Router, private snackBar: MatSnackBar, private fb: FormBuilder, private route: ActivatedRoute, private utilisateservice: UtilisateurServiceService) {}

  ngOnInit(): void {
    this.id1 = this.route.snapshot.params.id;
    console.log(this.id1);
    this.utilisateservice.getUtilisateurById(this.id1)
      .subscribe(data => {
        console.log(data);
        this.id.setValue(data.id);
        this.email.setValue(data.email);
        this.prenom.setValue(data.prenom);
        this.nom.setValue(data.nom);
        this.pwd.setValue(data.pwd);

      }, error => console.log(error));
  }




  get id(){
    return this.form.get('id');
  }
  get email(){
    return this.form.get('email');
  }
  get pwd(){
    return this.form.get('pwd');
  }

  get nom(){
    return this.form.get('nom');
  }
  get prenom(){
    return this.form.get('prenom');
  }

  retour() {
    this.router.navigate(['/SignIn']);
  }

  onSubmit() {
    this.u.id = this.id.value;
    this.u.nom = this.nom.value;
    this.u.prenom = this.prenom.value;
    this.u.email = this.email.value;
    this.u.pwd = this.pwd.value;
    this.utilisateservice.updateUtlisateur(this.u)
      .subscribe(data => {
          console.log(data);
          this.snackBar.open('Utilisateur modifier avec succès', '', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bb']
        });

      }, error => {
        console.log(error);
      });

}}
