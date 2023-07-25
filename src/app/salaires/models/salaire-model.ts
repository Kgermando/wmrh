import { PersonnelModel } from "src/app/personnels/models/personnel-model";

export class SalaireModel {
    id: number;
    personnel: PersonnelModel;
    monnaie: string;
    taux_dollard : string; 
    nbr_dependants: number;
    alloc_logement: string;
    alloc_transport: string;
    alloc_familliale: string;
    salaire_base: string;  // Par jour 
    primes: string;
    prime_anciennete: string;
    heures_supp: number;
    heureSupplementaireMonnaie: string;
    conge_paye: string;
    nbre_jrs_preste: number; // Nombre de jours presents
    rbi: string;  // Remuneration brute imposable
    cnss_qpo: string; // Impôt de 5% => 0.05
    rni: string;  // Remuneration Nette Imposable
    ipr: string;  // Impôt Professionnel sur les Rémunérations (IPR)
    syndicat: string;  // 1 % 
    penalites: string;  // Sanctions sur le salaire net à payer
    avance_slaire: string;
    net_a_payer: string;
    statut: string; // Genereted, Traitement, Disponible
    signature: string;
    created: Date;
    update_created: Date;
    entreprise: string;
    code_entreprise: string; 
}