import { PersonnelModel } from "src/app/personnels/models/personnel-model";
import { ServicePrefModel } from "../../services/models/service-models";
import { FonctionModel } from "../../fonction/models/fonction-model";

export interface DepartementModel {
    id: number;
    departement: string; 
    personnels: PersonnelModel[];
    services: ServicePrefModel[];
    fonctions: FonctionModel[];
    signature: string; 
    created: Date; 
    update_created: Date;  
    entreprise: string; 
    code_entreprise: string;
}