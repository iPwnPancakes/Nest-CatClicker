interface UserProps {
    username: string;
}

export class User {
    private props;

    public constructor(props: UserProps) {
        if (!props.username) {
            throw new Error('Username is required');
        }

        this.props = props;
    }

    get username(): string {
        return this.props.username;
    }
}
