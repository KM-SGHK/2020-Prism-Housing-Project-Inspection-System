
import { Bearer } from 'permit';
import jwtSimple from 'jwt-simple';
import express from 'express';
import jwt from './jwt';
import { userService } from './main';

const permit = new Bearer({
    query: 'access_token',
});

export const createIsLoggedIn = (rolesIDs: number[]) => async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const token = permit.check(req);
        if (!token) {
            return res.status(401).json({ msg: 'Permission Denied1' });
        }
        const payload = jwtSimple.decode(token, jwt.jwtSecret);
        const user = await userService.getUserById (payload.id);
        if (user) {
            if (!rolesIDs.includes(user.role_id)) {
                return res.status(401).json({ msg: 'Permission Denied2' });
            }
            req.user = user;
            return next();
        } else {
            return res.status(401).json({ msg: 'Permission Denied3' });
        }
    } catch (e) {
        console.error(e.message);
        return res.status(401).json({ msg: 'Permission Denied4' });
    }
};









// import { Request, Response, NextFunction } from "express";

// export function isLoggedIn_developer(req: Request, res: Response, next: NextFunction) {
//     if (req.session?.user) {
//         if (req.session.user.role_id === 1) {
//             next();
//         }
//     } else {
//         res.redirect("/index.html");
//     }
// }

// export function isLoggedIn_inspector(req: Request, res: Response, next: NextFunction) {
//     if (req.session?.user) {
//         if (req.session.user.role_id === 2) {
//             next();
//         }
//     } else {
//         res.redirect("/index.html");
//     }
// }


// export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
//     if (req.session?.user) {
//         next();
//     } else {
//         res.redirect("/index.html");
//     }
// }

// export const checkRoleID = (roleID: number) => (req: Request, res: Response, next: NextFunction) => {
//     if (req.session?.user.role_id === roleID) {
//         next();
//     } else {
//         res.redirect("/index.html");
//     }
// }