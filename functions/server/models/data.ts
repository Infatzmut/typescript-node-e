import {Product} from './product';

export interface ProductDataModel {
    status : String,
    data : Product,
    message : String
}

export interface ProductArrayDataModel{
    status: String,
    data : Array<Product>,
    message: String
}


