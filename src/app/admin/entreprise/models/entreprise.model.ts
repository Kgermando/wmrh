import { AbonnementAdminModel } from "../../abonnement-admin/models/abonnement.model";

export interface EntrepriseModel {
    id: number;
    company_name: string;
    rccm: string;
    id_nat: string;
    responsable: string;
    telephone: string;
    email: string;
    adresse: string;
    code_entreprise: string;
    nbre_employe: number;
    statut: boolean; // statut abonnement
    abonnements: AbonnementAdminModel[];
    signature: string;
    created: Date;
    update_created: Date;
}