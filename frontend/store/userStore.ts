import { User } from '~/models/User';

interface UserStoreState {
    user: User | null;
}

interface UserStoreStatePayload<T> {
    action: string;
    value: T;
}

export const state = () => ({
    user: null,
});

export const mutations = {
    setUser(state: UserStoreState, payload: UserStoreStatePayload<User>) {
        state.user = payload.value;
    },
    unsetUser(state: UserStoreState) {
        state.user = null;
    },
};

export const getters = {
    isLoggedIn: (state: UserStoreState) => Boolean(state.user),
};
