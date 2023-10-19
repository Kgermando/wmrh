import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { PersonnelModel } from 'src/app/personnels/models/personnel-model';
import { IndemniteService } from '../indemnite.service';  
import { IndeminteModel } from '../models/indemnite.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { PreferenceModel } from 'src/app/preferences/reglages/models/reglage-model';
import { ReglageService } from 'src/app/preferences/reglages/reglage.service';
import { CalculateDialog } from '../../statuts-paie/fiche-paie/fiche-paie.component';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import jsPDF from "jspdf";
// import html2canvas from 'html2canvas'; 

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts'; 
import { NotifyService } from 'src/app/notify/notify.service';
import { monnaieDataList } from 'src/app/shared/tools/monnaie-list';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-indemnite-edit',
  templateUrl: './indemnite-edit.component.html',
  styleUrls: ['./indemnite-edit.component.scss']
})
export class IndemniteEditComponent {
  isLoading = false;

  formGroup!: FormGroup;
  content: FormArray;

  currentUser: PersonnelModel | any; 
  isActive: boolean = false;

  id: number;
  indemnite: IndeminteModel;
  preference: PreferenceModel;
  monnaieList = monnaieDataList;

  @ViewChild('htmlData', { static: false}) htmlData!: ElementRef;

  total = 0;

 

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authService: AuthService,
      private route: ActivatedRoute, 
      private indemniteService: IndemniteService,
      private reglageService: ReglageService,
      public dialog: MatDialog,
      private toastr: ToastrService, 
  ) {}

  ngOnInit(): void { 
    this.id = this.route.snapshot.params['id']; 

    this.formGroup = this.formBuilder.group({ 
      intitule: [''],
      monnaie: [''],
      taux_dollard: [''],
      content: this.formBuilder.array([this.createItem()]),
    }); 

    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.indemniteService.get(this.id).subscribe(item => {
          this.indemnite = item;
          this.reglageService.preference(this.indemnite.personnel.corporates.code_corporate).subscribe(reglage => {
            this.preference = reglage;
            this.formGroup.patchValue({
              intitule: this.capitalizeTest(this.indemnite.intitule),
              monnaie: this.indemnite.monnaie,
              taux_dollard: this.indemnite.taux_dollard,
              statut: this.indemnite.statut,
              content: this.indemnite.content, 
              signature: this.currentUser.matricule, 
              update_created: new Date()
            });
          }); 
        });
      },
      error: (error) => {
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
   
  }

  public toggle(event: MatSlideToggleChange) {
    this.isActive = event.checked;
  }

  get formData() {
    return <FormArray>this.formGroup.get('content');
  }
 

  createItem(): FormGroup {
    return this.formBuilder.group({
      nom: '', 
      montant: ''
    });
  }

   // Au clic de l'utilisateur sur le bouton "Ajouter une ligne"
  addItem(event: any): void {
    this.content = this.formGroup.get('content') as FormArray;
    this.content.push(this.createItem());
  }

  // Au clic de l'utilisateur sur le bouton "X" pour supprimer une ligne
  deleteItemLine(e: any, i: any): void {
    e.preventDefault();
    this.content = this.formGroup.get('content') as FormArray;
    console.log(this.content);
    this.content.removeAt(i);
  }

  /************************************************/
  // Fonction utilitaire pour afficher le prix total
  getTotalPrice() {
    this.content = this.formGroup.get('content') as FormArray;
    let contents = this.content.value;
    let total = 0;
    for (let item of contents) {
      total += parseFloat(item.montant);
    }
    if (!isNaN(total)) {
      return total.toFixed(2);
    } else {
      return 0
    }
  }

  onSubmit() {}


  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) { 

      var personnel = {
        date_paie: new Date(),
        statut_paie: 'En attente',
        signature: this.currentUser.matricule,
        update_created: new Date(),
        entreprise: this.currentUser.entreprise,
        code_entreprise: this.currentUser.code_entreprise
      };
      this.indemniteService.delete(id).subscribe({
        next:  res => {
          this.toastr.info('Supprimé avec succès!', 'Supprimée!');
          this.router.navigate(['/layouts/salaires', this.indemnite.personnel.corporates.id, 'indemnites']);
        },
        error: err => { 
          this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          console.log(err);
        }
      });
    }
  }

  public openPDF(): void {
    let pdf = new jsPDF("p", "pt", "a4");
    var dateNow = new Date();
    var dateNowFormat = formatDate(dateNow, 'dd-MM-yyyy_HH:mm', 'en-US');
    pdf.html(this.htmlData.nativeElement, {
      callback: (pdf) => {
        pdf.addPage("a4", "p")
        pdf.save(`Indemnite-${dateNowFormat}.pdf`)
      }
    });
  }


  openDialog() {
      this.dialog.open(CalculateDialog, { disableClose: true });
  }



  capitalizeTest(text: string): string {
    return (text && text[0].toUpperCase() + text.slice(1).toLowerCase()) || text;
  }
 
}
