// for restore login

// route, /user, refer to jason demo 

import { Request, Response } from 'express';
// import { UserService } from '../services/UserService';

export class UserController {
	// constructor(private userService: UserService) {}
	constructor() {}

	getUserInfo = async (req: Request, res: Response) => {
		try {
			if (req.user) {
				const {password, ...others} = req.user;
				return res.json({ user: {...others} })
			}
			return res.status(400).json({ msg: 'user undefined' });
		} catch (e) {
			console.log(e);
			res.status(500).json({ msg: "internal server error" });
			return;
		}
	}
}


// import { Request, Response } from "express";
// import { UserService } from "../service/UserService";
// import { checkPassword } from "../hash";

// export class UserController {
//     constructor(private service: UserService) { }

//     login = async (req: Request, res: Response) => {
//         // try... catch...
//         const { username, password } = req.body;
//         console.log(req.body)
//         const user = await this.service.getUserByName(username);
//         if (!user) {
//             return res.status(401).redirect("/login.html?error=Incorrect+Username");
//         }
//         const match = await checkPassword(password, user.password);
//         if (match) {
//             if (req.session) {
//                 req.session.user = {
//                     id: user.id,
//                     role_id: user.role_id
//                 };
//                 if (req.session.user.role_id === 1) {
//                     return res.redirect("/developer/developer_index.html"); // To the protected page.
//                 } else if (req.session.user.role_id === 2) {
//                     return res.redirect("/inspector/flats.html");
//                 }
//             }

//         } else {
//             return res.status(401).redirect("/index.html?error=login.failed");
//         }
//     };

//     logout = async (req: Request, res: Response) => {
//         if (req.session) {
//             console.log(req.session)
//             delete req.session.seller;
//         }
//         res.redirect('index.html');
//     };

// }