import { Request, Response, NextFunction } from "express";

export function isLoggedIn_developer(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user) {
    if(req.session.user.role_id===1){
      next();
    }
  } else {
    res.redirect("/index.html");
  }
}
