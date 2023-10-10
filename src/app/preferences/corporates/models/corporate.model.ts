import { EntrepriseModel } from "src/app/admin/entreprise/models/entreprise.model";
import { SiteLocationModel } from "../../site-location/models/site-location-model";
import { ServicePrefModel } from "../../services/models/service-models";
import { FonctionModel } from "../../fonction/models/fonction-model";
import { TitleModel } from "../../titles/models/title-model";
import { DepartementModel } from "../../departements/model/departement-model";
import { PersonnelModel } from "src/app/personnels/models/personnel-model";

export interface CorporateModel {
    id: number;
    entreprise_id: EntrepriseModel;
    personnels: PersonnelModel[];
    logo: string; 
    corporate_name: string; // Nom de la corporate 
    statut: boolean; // statut entreprise sous traitant 
    code_corporate: string; 
    nbre_employe: number; 
    rccm: string; 
    id_nat: string; 
    numero_impot: string; 
    numero_cnss: string; 
    responsable: string; 
    telephone: string; 
    email: string; 
    adresse: string;
    departements: DepartementModel[];
    titles: TitleModel[];
    fonctions: FonctionModel[];
    services: ServicePrefModel[];
    site_locations: SiteLocationModel[];
    code_entreprise: string; 
    signature: string; 
    created: Date;
    update_created: Date;
}