import { PersonnelModel } from "src/app/personnels/models/personnel-model"; 
import { IndemniteContentModel } from "./indemnite-content.model";

export interface IndemniteModel {
    id: number; 
    personnel: PersonnelModel;
    intitule: string;
    statut: string;
    monnaie: string;
    taux_dollard: string;
    content: IndemniteContentModel[];
    total_a_payer: string;
    signature: string;
    created: Date;
    update_created: Date;
    entreprise: string;
    code_entreprise: string;
}
