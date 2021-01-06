import mongoose from 'mongoose';

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

const User = mongoose.model('users', UserSchema);
export default User;
