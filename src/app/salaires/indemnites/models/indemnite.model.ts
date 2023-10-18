import { PersonnelModel } from "src/app/personnels/models/personnel-model";

export interface IndeminteModel {
    id: number;
    personnel: PersonnelModel;
    statut: boolean;
    content: IndemniteContentModel[];
    signature: string;
    created: Date;
    update_created: Date;
    entreprise: string;
    code_entreprise: string;
}

export interface IndemniteContentModel {
    nom: string;
    monnaie: string;
    montant: string;
}