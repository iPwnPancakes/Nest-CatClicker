import { Injectable } from '@nestjs/common';
import { DomainEvents } from '../../../shared/domain/events/DomainEvents';
import { IHandle } from '../../../shared/domain/events/IHandle';
import { UserCreated } from '../../Users/domain/events/userCreated';
import { CreateOwner } from '../useCases/createOwner/CreateOwner';

@Injectable()
export class AfterUserCreated implements IHandle<UserCreated> {
    constructor(private createOwnerCommand: CreateOwner) {
        this.setupSubscriptions();
    }

    public setupSubscriptions(): void {
        DomainEvents.registerHandler(
            this.onUserCreated.bind(this),
            UserCreated.name,
        );
    }

    private async onUserCreated(event: UserCreated): Promise<void> {
        try {
            await this.createOwnerCommand.execute({
                user_id: event.user.userId.id.toString(),
            });
        } catch (err) {
            console.error(err);
        }
    }
}
