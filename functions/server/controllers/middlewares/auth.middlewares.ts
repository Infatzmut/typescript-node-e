import {Request, Response, NextFunction} from 'express';
import * as admin from 'firebase-admin';
import {setupDbServices} from '../../services';

const dbServices = setupDbServices();

export const checkAuthorization = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authtoken && req.headers.authtoken.toString().split(' ')[0] === 'Bearer' 
        && req.headers.authtoken.toString().split(' ')[1]){
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

export const checkIfAdmin =async (req: Request, res: Response, next: NextFunction) => {
        let searchRole: any;
        checkAuthorization(req, res, async (info) =>{
            const {uid} = info
             searchRole  = await dbServices.authService.verifyUser(uid)
            if(searchRole.data.role === 'admin'){
                next();
                return;
            }
            else {
                return res.status(403).json({"message":"Unauthorized, not an admin user"})
            }
        } )
}