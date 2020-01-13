import {baseController} from '../base.controller';
import {Request , Response} from 'express';
import {setupDbServices} from '../../services';
import {Product} from '../../models/product'
const dbService = setupDbServices();

class ProductsController {
    async get (req: Request , res: Response) {
        let responseCode;
        let responseData;
        
        try{
            const products = await dbService.productService.getAllProducts() ;
            responseCode = products.responseCode;
            responseData = baseController.getSuccessResponse(products.data, products.message)    
       }catch(error){
        responseCode = 500;
        responseData = baseController.getErrorResponse(error.message); 
        
       }
        return res
            .status(responseCode)
            .json(responseData);
    } 
    
    async post (req: Request, res: Response ){
        let responseCode;
        let responseData;
            if(!req.body){
                responseData = baseController.getErrorResponse("Missing the body")
                return res.status(400).json(responseData)
            }
        try{
            const product : Product = req.body
            const uploadProduct = await dbService.productService.createProduct(product)
            responseCode = uploadProduct.responseCode;
            if(uploadProduct.status.toLowerCase() === "error"){
                responseData = baseController.getErrorResponse(uploadProduct.message)
            } else {
                responseData = baseController.getSuccessResponse(
                        uploadProduct.data, 
                        uploadProduct.message);
            }
        }catch(error){
            responseCode = 500;
            responseData = baseController.getErrorResponse(error.message) 
        }
        return res
            .status(responseCode).json(responseData);
    }
}

export const productsController = new ProductsController();