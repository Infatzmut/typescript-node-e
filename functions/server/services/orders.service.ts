
import {baseService} from './base.service';
import {Order} from '../models/order';

export function setupOrderServices(dbInstance: any){
    const collection = dbInstance.collection('orders');

    async function getOrdersOfUser(username: String){
        const userOrders: any[] = [];
        try{
            await collection.where('username' ,'==', username).get()
            .then((snapshot: { empty: any; forEach: (arg0: (doc: any) => void) => void; }) => {
                if(snapshot.empty){
                    baseService.getServiceResponse("Ok", 404, "No user found", {})
                    return;
                }
                snapshot.forEach((doc: { id: String; data: () => Order; }) => {
                    const order = {
                        id: doc.id,
                        ...doc.data()
                    }
                    userOrders.push(order)
                })
                baseService.getServiceResponse("Ok", 200, `Getting orders from ${username}`, userOrders);
            })
        } catch(error){
            baseService.getServiceResponse("Error", 400, error.message, {})
        }
        return baseService.returnData;
    }

    async function getAllOrders(){
        const allOrders: any = [];
        try{
            await collection.get()
            .then((snapshot: any[]) => {
                snapshot.forEach((doc: { id: String; data: () => Order; }) => {
                    allOrders.push({
                        id : doc.id,
                        ...doc.data()
                    })
                })
                baseService.getServiceResponse("Ok", 200, "Succesfully delivered all the orders", allOrders)
            })
        }catch(error){
            baseService.getServiceResponse("Error", 400, error.message, {})
        }
        return baseService.returnData;
    }
    async function findOne(id: String){
        let result = {}
        try{
            const doc = await collection.doc(id).get()
            result = doc.data()
        } catch(error){
            result = {}
        }
        return result;
    }

    async function updateOrder(id: String, status: any){
        let newOrder: any;
        try{   
            newOrder = await findOne(id);
            newOrder.status = status;
            await collection.doc(id).update(newOrder)
            const orderRef = await collection.doc(id).get();
            const orderUpdated = {
                id,
                ...orderRef.data()
            }
            
            baseService.getServiceResponse("Ok", 200, "Successfully updated", orderUpdated)
        }catch(error){
            baseService.getServiceResponse("Error", 400, error.message, {})
        }
        return baseService.returnData;
    }
    
    return {
        getAllOrders,
        getOrdersOfUser,
        updateOrder
    }
}