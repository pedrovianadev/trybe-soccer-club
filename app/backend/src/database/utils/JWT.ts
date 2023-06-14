import { sign } from 'jsonwebtoken';
import ILogin from '../../Interfaces/ILogin';

const JWT_SECRET = process.env.JWT_SECRET as string;

const generateToken = (login: ILogin) =>
  sign(login, JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' });

export default generateToken;
