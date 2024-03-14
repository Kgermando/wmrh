import { PersonnelModel } from "src/app/personnels/models/personnel-model";
import { DepartementModel } from "../../departements/model/departement-model";

export interface ServicePrefModel { 
    id: number; 
    service: string;
    personnels: PersonnelModel[];
    departement: DepartementModel;
    signature: string;
    created: Date;
    update_created : Date;
    entreprise: string;
    code_entreprise: string; 
}