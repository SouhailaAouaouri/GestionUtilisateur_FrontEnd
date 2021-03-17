import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistreComponent} from './registre/registre.component';
import {ListUtilisateurComponent} from './list-utilisateur/list-utilisateur.component';
import {EditProfilComponent} from './edit-profil/edit-profil.component';

const routes: Routes = [
  { path: 'SignIn', component: LoginComponent },
  { path: 'SignUp', component: RegistreComponent },
  { path: 'Home', component: ListUtilisateurComponent },
  { path: 'profil/:id', component: EditProfilComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
