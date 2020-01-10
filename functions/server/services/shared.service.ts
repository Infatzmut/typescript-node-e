import {baseService} from './base.service';

export function setupSharedServices(dbInstance: any){
    const orderCollection = dbInstance.collection('orders');
    const productsCollection = dbInstance.collection('productos');
    const orderDetailsCollection = dbInstance.collection('orderDetails');
    

    async function createOrder(order: any, details: any){
        try {
            await order.products.forEach(async (product: { id: string; quantity: number; }) => {
                const singleProduct = await productsCollection.doc(product.id).get()
                const data = singleProduct.data();
                data.info.stock = data.info.stock - product.quantity;
                await productsCollection.doc(product.id).update(data);
            })
            await orderCollection.add(order).then(async (res: { id: any; }) => {
                details.order_id = res.id;
                await orderDetailsCollection.add(details)
                baseService.getServiceResponse("Ok", 201, "Success",`Order id: ${res.id}`)
            })
                
        } catch(error){
            console.log(error);
            baseService.getServiceResponse("Error", 400, error.message, {})
        }
    return baseService.returnData;
    }

    return {
        createOrder
    }
}