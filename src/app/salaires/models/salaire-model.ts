import { PersonnelModel } from "src/app/personnels/models/personnel-model";

export class SalaireModel {
    id: number;
    personnel: PersonnelModel;
    alloc_logement: string;
    alloc_transport: string;
    alloc_familliale: string;
    salaire_base: string;  // Par jour 
    primes: string;
    prime_anciennete: string;
    heures_supp: number;
    conge_paye: string;
    nbre_jrs_preste: number; // Nombre de jours presents
    rbi: string;  // Remuneration brute imposable
    cnss_qpo: string; // Impôt de 5% => 0.05
    rni: string;  // Remuneration Nette Imposable
    ipr: string;  // Impôt Professionnel sur les Rémunérations (IPR)
    syncdicat: string;  // 1 % 
    penalites: string;  // Sanctions sur le salaire net à payer
    net_a_payer: string;
    signature: string;
    created: Date;
    update_created: Date;
    entreprise: string;
    code_entreprise: string; 
}