import { Document } from 'mongoose';

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

export interface ExistingUser extends Document {
    _id: string;
    username: string;
    password: string;
}
