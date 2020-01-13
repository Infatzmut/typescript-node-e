import * as admin from 'firebase-admin';
import  {Request , Response, NextFunction } from 'express';

export const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authtoken && req.headers.authtoken.toString().split(' ')[0] === 'Bearer'){
        admin.auth().verifyIdToken(req.headers.authtoken.toString().split(' ')[1])
            .then((userInfo)=> {
                next(userInfo)
                })
            .catch((error)=> {
                res.status(403).json({"message": 'Unauthorized:' + error.message.split('.')[0]})
            })
    } else {
        res.status(403).send('Unauthorized, missing authtoken')
    }
} 

export const checkIfAdmin = (req: Request, res: Response, next: NextFunction) => {
        checkAuthorization(req, res, (info) =>{
            console.log(info);
            
            if(info.admin === 'true'){
                next();
                return;
            }
            else {
                return res.status(203).json({"message":"Unauthorized"})
            }
        } )
}