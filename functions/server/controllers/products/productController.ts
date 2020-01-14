import { baseController } from "../base.controller";
import { Request, Response} from 'express';
import {setupDbServices} from '../../services';

const dbservice = setupDbServices();

class ProductController {
    async get(req: Request, res: Response){
        let responseCode;
        let responseData;

        if(!req.params.id){
           return res.status(400).json(baseController.getErrorResponse('Param is missing'))
       }
       try{
            const product = await dbservice.productService.getProduct(req.params.id);
            responseCode = product.responseCode;
            responseData = baseController.getSuccessResponse(product.data,product.message);
       }catch(error){
           responseCode = 500;
           responseData = baseController.getErrorResponse(error);
       }
       return res.status(responseCode).json(responseData);
   }
    async del(req: Request, res: Response)  {
        if(!req.params.id){
            return res
                .status(400)
                .json(baseController.getErrorResponse('id is missing'));
        }
        let responseCode;
        let responseData;
        try {
            let productDeleted = await dbservice.productService.deleteProduct(req.params.id);
            responseCode = productDeleted.responseCode;
            responseData = baseController.getSuccessResponse(
                productDeleted.data, 
                productDeleted.message)
        }catch(error){
            responseCode = 500;
            baseController.getErrorResponse(error.message);
        }
        return res
            .status(responseCode)
            .json(responseData)
        }

    async  update  (req: Request, res: Response) {
        let responseCode;
        let responseData;
        if (!req.params.id || typeof(req.body) !== "object"){
            responseCode = 400;
            responseData = baseController.getErrorResponse("Must provide an id");
        } else {
            try{
                let productUpdated = await dbservice.productService.updateProduct(req.params.id, req.body);
                responseCode = productUpdated.responseCode;
                responseData = baseController.getSuccessResponse(productUpdated.data, productUpdated.message);
            }catch(error){
                responseCode = 500;
                responseData = baseController.getErrorResponse(error.message);
            }
        }
        return res.status(responseCode).json(responseData);
        }
}

export const productController = new ProductController();