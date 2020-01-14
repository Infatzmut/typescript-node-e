

import {baseService} from './base.service';

export function setupAuthServices (dbInstance: any, admin: any) {
    const collection = dbInstance.collection('users');
    const createAdminUser = async (displayName: string, password: string, email:string, role: string) => {
        try {
            const {uid} = await admin.auth().createUser({displayName , password , email });
            const newUser = {
                displayName,
                email,
                uid,
                role
            }
            await collection.add(newUser)    
            await admin.auth().setCustomUserClaims(uid, {role});
            baseService.getServiceResponse('Ok', 201, 'Created Successfully', {uid, role})
        } catch( error){
            baseService.getServiceResponse('Error', 500, `Error : ${error.code} - ${error.message}`, {})
        }
        return baseService.returnData;
    }

    const verifyUser = (uid: string) => {
        try {
            collection.where('uid', '==', uid).get()
            .then((snapshot: { empty: any; role: string; }) => {
                if(snapshot.empty){
                    baseService.getServiceResponse('Error', 404, 'Not found', {})
                } else {
                     baseService.getServiceResponse('Ok', 200, "Founded", snapshot.role)                  
                }
            })
        } catch (error) {
            baseService.getServiceResponse('Error', 500, `Error : ${error.message}`, {})
        }
        return baseService.returnData;
    }
    return {
        createAdminUser,
        verifyUser
    }
}


