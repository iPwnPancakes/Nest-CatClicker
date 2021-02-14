import { Decoration } from "../../domain/Decoration";

export interface IDecorationRepository {
    exists(decorationId: string): Promise<boolean>;
    getDecorationByDecorationId(decorationId: string): Promise<Decoration>;
    getDecorationByOwnerId(decorationId: string): Promise<Decoration>;
    save(decoration: Decoration): Promise<void>;
    delete(decoration: Decoration): Promise<void>;
}
