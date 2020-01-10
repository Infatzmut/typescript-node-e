import {baseService} from './base.service';

export function setupProductService(dbInstance: any){
    
    const collection = dbInstance.collection('productos');

    async function getAllProducts(){
        try {
            const allProducts: any[] = []
            await collection.get()
            .then((snapshot: any) =>{ 
                snapshot.forEach((doc: { id: any; data: () => any; })  => {           
                    allProducts.push({
                        id : doc.id,
                        ...doc.data()}
                    )
                })
            baseService.getServiceResponse("Ok", 200, "Getting products", allProducts)
            })
        } catch(error) {
            baseService.getServiceResponse("Error", 400, error.message, {})
        } 
        return baseService.returnData;
        
    } 

async function findOneProduct(id: string){
    let result = {}
    try{
        const doc = await collection.doc(id).get();
         result = doc.data()
    } catch(error){
       // TODO : logger errores
    }
    return result;
}

async function getProduct(id: string){
    try{
        const product = await findOneProduct(id);
        baseService.getServiceResponse("Ok", 200, "Product info", product)
    }catch(error){
        baseService.getServiceResponse("Error", 400, error.message, {})
    }
    return baseService.returnData;
}

async function createProduct(product: any){
    if(typeof(product) !== "object"){
        return baseService.getServiceResponse("Error" ,400, "Must be an object", {})
    }
    try{
         await collection.add(product).then((response: { id: any; }) => {
            baseService.getServiceResponse("Ok" ,201, "Product added", `Id: ${response.id}`); 
         })            
    }catch(error){
        baseService.getServiceResponse("Error", 400, error.message, {})            
    } 
    return baseService.returnData;
}

    async function updateProduct(id: string, data: any){
        try{   
            const product = await findOneProduct(id);
            // product.info = data;
            await collection.doc(id).update(product);
            let orderRef = await collection.doc(id).get();
            const orderUpdated = {
                id,
                ...orderRef.data()
            }
            
            baseService.getServiceResponse("Ok", 200, "Successfully updated", orderUpdated)
        }catch(error){
            console.log("Error: ", error);
            baseService.getServiceResponse("Error", 400, error.message, {})
        }
        return baseService.returnData;
    }

    async function deleteProduct(id: string){
        try{
            await collection.doc(id).delete();
            baseService.getServiceResponse("Ok" ,202, "Deleted Successfully", {})
        }catch(error){
            baseService.getServiceResponse("Error" ,400, error.message, {})          
        }
        return baseService.returnData;
    }
    return {
        getAllProducts,
        deleteProduct,
        updateProduct,
        createProduct,
        getProduct
    }
}