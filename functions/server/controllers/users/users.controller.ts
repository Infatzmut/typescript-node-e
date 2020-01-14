import {baseController} from '../base.controller';
import {Request,  Response} from 'express';
import {setupDbServices} from '../../services/';

const dbServices = setupDbServices();


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