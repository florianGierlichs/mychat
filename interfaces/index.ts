export type User = {
    id: number;
    name: string;
};

export type Room = {
    name: string;
    clientCount?: number;
    users?: string[];
};

export type ChatProps = {
    socket: any;
    username?: string;
};

export type ExistingUser = {
    _id: string;
    username: string;
    password: string;
};
