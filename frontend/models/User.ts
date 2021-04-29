interface UserProps {
    username: string;
}

export class User {
    private props;

    private constructor(props: UserProps) {
        this.props = props;
    }

    get username(): string {
        return this.props.username;
    }
}
