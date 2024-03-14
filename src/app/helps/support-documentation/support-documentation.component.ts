import { Component, OnInit } from '@angular/core';
import { SupportModel } from '../models/support.model';
import { CustomizerSettingsService } from 'src/app/customizer-settings/customizer-settings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SupportService } from '../support.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-support-documentation',
  templateUrl: './support-documentation.component.html',
  styleUrls: ['./support-documentation.component.scss']
})
export class SupportDocumentationComponent implements OnInit {
  isLoading = false;

  support: SupportModel | any;

  id: any;

  constructor(
    public themeService: CustomizerSettingsService,
    private route: ActivatedRoute,
    private router: Router, 
    private supportService: SupportService, 
    private toastr: ToastrService,
) {}


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isLoading = true;
    this.supportService.get(this.id).subscribe((item) => {
      this.support = item;
      this.isLoading = false;
    });
  }


  edit(id:number) {
    this.router.navigate(['/layouts/helps/support/', id, 'edit']);
  }


  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enregistrement ?')) {
      this.supportService
        .delete(id)
        .subscribe({
          next: () => {
            this.toastr.info('Success!', 'Supprimé avec succès!'); 
            this.router.navigate(['/layouts/helps/support']);
          },
          error: err => {
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          }
        }
      );
    }
  }

}
