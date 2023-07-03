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
    role: number;

    numero_cnss: string;
    date_naissance: Date;
    lieu_naissance: string;
    nationalite: string;
    etat_civile: string;
    nbr_enfant: string;
    nbr_dependants: string;
    nbr_dependants_max: string;
    
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
    statut_personnel: boolean; 
    syndicat: boolean; 
    cv_url: string;   
    
    signature: string; 
    created: Date; 
    update_created : Date; 
    password: string; 
    statut_presence: boolean; 
    entreprise: string; 
    code_entreprise: string;  
    
}