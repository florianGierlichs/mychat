import { verify } from 'jsonwebtoken';

const authenticateJWT = (jwt: string): any => {
    return verify(jwt, process.env['SECRET_KEY']!);
};

export default authenticateJWT;
