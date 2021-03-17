import { Component, OnInit } from '@angular/core';
import {Utilisateur} from '../model/utilisateur';
import {UtilisateurServiceService} from '../service/utilisateur-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit {

  formData: FormData = new FormData();
  readytoupload = false;
  u: Utilisateur = new Utilisateur();
  utilisateursSimple: Utilisateur[];


  private selectedFiles: any;
  constructor(private service: UtilisateurServiceService, private router: Router ) { }

  ngOnInit(): void {
    this.service.getUtilisateurNormale().subscribe(
      data =>  this.utilisateursSimple = data
    );

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.formData.append('file', file);
      this.readytoupload = true;
    }
  }
  uploadFile() {
    if (this.readytoupload){
      this.service.importExcel(this.formData).subscribe(data => {
        alert('l\'importation a effectué avec succées');
      });
      setTimeout(
        // tslint:disable-next-line:only-arrow-functions
        function(){
          location.reload();
        }, 500);
    }
  }

  deleteUtilisateur(id) {
    this.service.getUtilisateurById(id).subscribe(
      data => {
        this.u = data;
        this.service.updateRoleUtlisateur( this.u).subscribe(
          res => console.log(res)
        );
        setTimeout(
          // tslint:disable-next-line:only-arrow-functions
          function(){
            location.reload();
          }, 500);
      }
    );

  }

  retour() {
    this.router.navigate(['/SignIn']);

  }
}
