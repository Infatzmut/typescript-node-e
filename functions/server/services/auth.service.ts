

import {baseService} from './base.service';

export function setupAuthServices (dbInstance: any, admin: any) {
    const collection = dbInstance.collection('users');
    const createAdminUser = async (displayName: string, password: string, email:string, role: string) => {
        try {
            const {uid} = await admin.createUser({displayName , password , email });
            const newUser = {
                displayName,
                email,
                uid,
                role
            }
            await collection.add(newUser)    
            await admin.setCustomUserClaims(uid, {role});
            baseService.getServiceResponse('Ok', 201, 'Created Successfully', {uid, role})
        } catch( error){
            baseService.getServiceResponse('Error', 500, `Error : ${error.code} - ${error.message}`, {})
        }
        return baseService.returnData;
    }

    const verifyUser = (uid: string) => {
        try {
            collection.where('uid', '==', uid).get()
            .then((snapshot: { empty: any; forEach: (arg0: (doc: any) => void) => void; role: any; }) => {
                if(snapshot.empty){
                    baseService.getServiceResponse('Error', 404, 'Not found', {})
                } else {
                    snapshot.forEach(async (doc: any)  => {
                       const user = {
                           id : doc.id,
                           ...doc.data()
                       }
                       console.log(user);
                       
                    baseService.getServiceResponse('Ok', 200, "Founded",await user)
                    });   
                                       
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


