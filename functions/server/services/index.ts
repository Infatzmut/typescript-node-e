import {setupProductService} from './product.service';
import {setupServiceProviders}from '../providers';
import {setupOrderDetailService} from './order.details.service';
import {setupOrderServices} from './orders.service';
import {setupSharedServices} from './shared.service';

export function setupDbServices(){
    const serviceProvider = setupServiceProviders();
    const orderDetailsService = setupOrderDetailService(serviceProvider.dbInstance);   
    const productService = setupProductService(serviceProvider.dbInstance);
    const ordersService = setupOrderServices(serviceProvider.dbInstance);
    const sharedService = setupSharedServices(serviceProvider.dbInstance);
    return {
        productService,
        orderDetailsService,
        ordersService,
        sharedService
    }
}