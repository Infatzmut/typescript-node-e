import {baseService} from './base.service'

export function setupOrderDetailService(dbInstance: any){
    const collection = dbInstance.collection('orderDetails');
    const getDetails = async (orderId: String) => {
        let orderDetail = {}
        try{
            await collection.where("order_id", '==', orderId).get()
            .then((((snapshot: { empty: any; forEach: (arg0: (doc: { id: any; data: () => {}; }) => void) => void; }) => {
                if(snapshot.empty){
                    console.log("No record found");
                    return;
                }
                snapshot.forEach((doc: { id: any; data: () => {}; }) => {
                    orderDetail = {
                        id: doc.id,
                        ...doc.data()
                    };
                });
                baseService.getServiceResponse("Ok", 200, "Order Details information", orderDetail);
            })));
        }catch (error){
            baseService.getServiceResponse("error", 400, error.message, {});
        }
        return baseService.returnData;
    }
    
    return {
        getDetails,
    }
}