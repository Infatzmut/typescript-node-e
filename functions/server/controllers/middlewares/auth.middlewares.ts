import {Request, Response, NextFunction} from 'express';
import * as admin from 'firebase-admin';
import {setupDbServices} from '../../services';

const dbServices = setupDbServices();

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
        res.status(403).send({"message": 'Unauthorized, missing authtoken'})
    }
} 

export const checkIfAdmin = (req: Request, res: Response, next: NextFunction) => {
        checkAuthorization(req, res, async (info) =>{
            const {uid} = info
            const searchRole = await dbServices.authService.verifyUser(uid)
            if(searchRole.data === 'admin'){
                next();
                return;
            }
            else {
                return res.status(203).json({"message":"Unauthorized"})
            }
        } )
}