import { PersonnelModel } from "src/app/personnels/models/personnel-model";
import { CorporateModel } from "src/app/preferences/corporates/models/corporate.model";

export interface IndeminteModel {
    id: number;
    corporate: CorporateModel;
    personnel: PersonnelModel;
    intitule: string;
    statut: string;
    monnaie: string;
    taux_dollard: string;
    content: IndemniteContentModel[];
    signature: string;
    created: Date;
    update_created: Date;
    entreprise: string;
    code_entreprise: string;
}

export interface IndemniteContentModel {
    nom: string;
    montant: string;
}