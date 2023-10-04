import { EntrepriseModel } from "src/app/admin/entreprise/models/entreprise.model";

export interface CorporateModel {
    id: number;
    entreprise_id: EntrepriseModel;
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
    code_entreprise: string; 
    signature: string; 
    created: Date;
    update_created: Date;
}