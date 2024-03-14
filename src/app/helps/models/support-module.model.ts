import { SupportModel } from "./support.model";

export interface SupportModuleModel {
    id: number;
    module: string;
    supports: SupportModel[];
    created: Date;
    update_created: Date;
}