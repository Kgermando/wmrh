import { AvanceSalaireModel } from "src/app/avance-salaires/models/avance-salaire-model";
import { HeureSuppModel } from "src/app/heures-supp/models/heure-supp-model";
import { PenaliteModel } from "src/app/penalites/models/penalite-model";
import { ApointementModel } from "src/app/presences/models/presence-model";
import { PrimeModel } from "src/app/primes/models/prime-model";
import { SalaireModel } from "src/app/salaires/models/salaire-model";

export interface PersonnelModel {
    id: number;
    photo: string;
    nom: string;
    postnom: string;
    prenom: string;
    email: string;
    telephone: string;
    sexe: string;
    adresse: string;
    matricule: string;
    category: string; 

    statut_personnel: boolean; 
    role: number;
    permission: string;

    numero_cnss: string;
    date_naissance: Date;
    lieu_naissance: string;
    nationalite: string;
    etat_civile: string;
    nbr_enfants: number;
    
    departement: string;
    title: string;
    fonction: string;
    services: string;
    site_location: string;
    type_contrat: string;
    date_debut_contrat: Date;
    date_fin_contrat: Date;
    
    salaire: string;
    compte_bancaire: string;
    nom_banque: string;
    frais_bancaire: string;
    
    syndicat: boolean; 
    cv_url: string; 

    password: string;

    presences: ApointementModel[];
    primes: PrimeModel[]; 
    penalites: PenaliteModel[];
    avances_salaires: AvanceSalaireModel[];
    heures_supp: HeureSuppModel[];
    salaires: SalaireModel[];
    
    signature: string; 
    created: Date; 
    update_created : Date; 
    
    
    entreprise: string; 
    code_entreprise: string; 
    
}