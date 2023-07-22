export interface PreferenceModel {
    id: number;  
    
    // Infos entreprise
    company_name: string;
    nbr_employe: number;
    cnss: string;
    numero_taxe: string;
    rccm: string;
    id_nat: string;
    numero_impot: string;
    email: string;
    telephone: string;
    adresse: string;

    // Date de paie
    date_paie : Date;

    // Impôt societe
    cnss_qpp : string;
    inpp : string;
    onem : string;

    // Parametre de deduction
    cotisation_syndicale : string;
    cnss_qpo : string; 

    // Taux
    monnaie : string;
    nbre_heure_travail : number;
    taux_dollard : number;

    // Jours feries
    new_year: Date;
    noel: Date;
    martyr_day: Date;
    kabila_day: Date;
    lumumba_day: Date;
    labour_day: Date;
    liberation_day: Date;
    indepence_day: Date;
    parent_day: Date;
    kimbangu_day: Date;

    // Ancienneté
    prime_ancien_0: number;
    prime_ancien_5: number;
    prime_ancien_10: number;
    prime_ancien_15: number;
    prime_ancien_20: number;
    prime_ancien_25: number;

    // Categories
    categorie_mo: string;
    categorie_ts: string;
    categorie_tsq: string;
    categorie_tq: string;
    categorie_thq: string;

    signature: string;
    created: Date;
    update_created : Date;
    entreprise: string;
    code_entreprise: string;
}