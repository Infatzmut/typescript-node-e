import {baseController} from '../base.controller';
import {Request,  Response, NextFunction} from 'express';
import {setupDbServices} from '../../services/';
import * as admin from 'firebase-admin';

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

class UserController {

    /*async get (req: Request, res: Response) {

    }*/

    async post (req: Request, res: Response) {
        let responseCode;
        let responseData;
        const {displayName, password, email, role } = req.body;
        
        if(!displayName || !password || !email || role){
            responseCode = 400;
            responseData = baseController.getErrorResponse("Misssing fields")
        } else {
            try {
                const newUser = await dbServices.authService.createAdminUser(displayName, password, email, role);
                responseCode = newUser.responseCode;
                responseData = baseController.getSuccessResponse(newUser.data,newUser.message);
            } catch(error) {
                responseCode = 500;
                responseData = baseController.getErrorResponse(error.message)        
            }  
        }
        return res.status(responseCode).json(responseData)
    }
}

export const userController = new UserController();