import { Request, Response, NextFunction } from "express";

export function isLoggedIn_inspector(req: Request, res: Response, next: NextFunction) {
  if (req.session?.user) {
      if(req.session.user.role_id===2){
        next();
      }
  } else {
    res.redirect("/index.html");
  }
}
