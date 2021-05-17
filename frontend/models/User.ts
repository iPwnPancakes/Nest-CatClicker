interface UserProps {
    username: string;
}

export class User {
    private props;

    public constructor(props: UserProps) {
        this.props = props;
    }

    get username(): string {
        return this.props.username;
    }
}
