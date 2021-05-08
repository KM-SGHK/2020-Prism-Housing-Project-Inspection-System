import { UserService } from "../service/UserService";
import express from 'express'
import jwtSimple from 'jwt-simple'
import { checkPassword } from "../hash";
import jwt from "../jwt";

export class AuthController {
     constructor(private userService: UserService) {

    }

    login = async (req: express.Request, res: express.Response) => {
        try {
            console.log(req.body.username)
            console.log(req.body.password)
            if (!req.body.username || !req.body.password) {
                return res.status(400).json({error: 'No username or password'})
            }

            const user = await this.userService.getUserByName(req.body.username);
            if (user == null) {
                return res.status(401).json({error: 'Incorrect username'})
            }
            if (!await checkPassword(req.body.password, user.password)) {
                return res.status(401).json({error: 'Incorrect password'})
            }

            const payload = {
                id: user.id
            };

            const token = jwtSimple.encode(payload, jwt.jwtSecret)

            // (R1)寫埋role info 俾frontend
            return res.json({
                token: token,
                user: user, 
                role: user.role_id
            });
        } catch (e) {
            console.error(e);
            return res.status(500).json({error: 'Internal Server error'});
        }
    }
}