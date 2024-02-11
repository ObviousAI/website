// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import auth0 from '../../utils/auth0';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    try {
        await auth0.handleLogin(req, res);
    } catch (error: any) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}

