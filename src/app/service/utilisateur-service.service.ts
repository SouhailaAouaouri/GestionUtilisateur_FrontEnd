import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utilisateur} from '../model/utilisateur';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService {
  urlpath: string;

  constructor(private http: HttpClient) {
    this.urlpath = 'http://localhost:8080/Utilisateurs';
  }
  importExcel(formData: FormData): Observable<any>
{
    return this.http.post(this.urlpath + '/import-excel' , formData) ;
  }

  getAllUtilisateurs() {

    return this.http.get<Utilisateur[]>(this.urlpath);

  }
  findByEmail(email: string)
  {
    return this.http.get<Utilisateur>(this.urlpath + '/email/' + email);
  }
  login(email: string, pwd: string)
  {
    return this.http.get<Utilisateur>(this.urlpath + '/login/' + email + '/' + pwd);
  }
  getUtilisateurById(id: number){
    return this.http.get<Utilisateur>(this.urlpath + '/' + id);

  }
  getUtilisateurNormale() {

    return this.http.get<Utilisateur[]>(this.urlpath + '/SimpleUtilisaeur');

  }
  getSuperUtilisateur() {

    return this.http.get<Utilisateur[]>(this.urlpath + '/SuperUtilisaeur');

  }
  createSuperUtlisateur(u: Utilisateur){

    return this.http.post(this.urlpath, u);
  }
  updateUtlisateur(u: Utilisateur) {
    return this.http.put(this.urlpath, u);

  }
  updateRoleUtlisateur(u: Utilisateur) {
    return this.http.put(this.urlpath + '/updateRole/', u);

  }
  deleteUtilisateur(id: number){
    return this.http.delete(this.urlpath + '/' + id);

  }

}
