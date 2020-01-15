

import {baseService} from './base.service';

export function setupAuthServices (dbInstance: any, admin: any) {
    const collection = dbInstance.collection('users');
    
    const createUser = async (displayName: string, password: string, email:string, role: string) => {
        try {
            const {uid} = await admin.createUser({displayName , password , email });
            const newUser = {
                displayName,
                email,
                uid,
                role
            }
            await collection.add(newUser); 
            baseService.getServiceResponse('Ok', 201, 'Created Successfully', {uid, role})
        } catch( error){
            baseService.getServiceResponse('Error', 500, `Error : ${error.code} - ${error.message}`, {})
        }
        return baseService.returnData;
    }

    const verifyUser = async (uid: string) => {
        let user  
        try {
            await collection.where('uid', '==', uid).get()
            .then((snapshot: { empty: any; forEach: (arg0: (doc: any) => void) => void; role: any; }) => { 
                    snapshot.forEach((doc: any)  => {
                        user = {
                           id : doc.id,
                           ...doc.data()
                       }
                    }); 
                }
            )
            baseService.getServiceResponse('Ok',200,"Successful",user)
        } catch (error) {
            console.log(error);      
            baseService.getServiceResponse('Error', 400,error.message, {})
        }
        return baseService.returnData
    }


    return {
        createUser,
        verifyUser,
    }
}


