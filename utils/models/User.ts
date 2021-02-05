import mongoose from 'mongoose';
import { ExistingUser } from '../../interfaces';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { collection: 'users', minimize: false }
);

const User = mongoose.model<ExistingUser & Document>('users', UserSchema);
export default User;
