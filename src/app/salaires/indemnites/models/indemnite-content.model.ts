import { IndeminteModel } from "./indemnite.model";

export interface IndemniteContentModel {
    id: number;
    indemnite: IndeminteModel;
    nom: string;
    montant: string;
}