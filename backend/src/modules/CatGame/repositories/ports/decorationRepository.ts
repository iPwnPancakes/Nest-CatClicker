import { Decoration } from '../../domain/Decoration';
import { Decorations } from '../../domain/Decorations';

export interface IDecorationRepository {
    exists(decorationId: string): Promise<boolean>;
    getDecorationByDecorationId(decorationId: string): Promise<Decoration>;
    getDecorationsByRoomId(roomId: string): Promise<Decoration[]>;
    save(decoration: Decoration): Promise<void>;
    saveBulk(decorations: Decorations): Promise<void>;
    delete(decoration: Decoration): Promise<void>;
}
