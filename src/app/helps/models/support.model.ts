import { SupportModuleModel } from "./support-module.model";

export interface SupportModel {
    id: number;
    module: SupportModuleModel;
    section: string;
    documentation: string;
    created: Date;
    update_created: Date;
}