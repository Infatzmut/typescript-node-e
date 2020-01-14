import {setupProductService} from './product.service';
import {setupServiceProviders}from '../providers';
import {setupOrderDetailService} from './order.details.service';
import {setupOrderServices} from './orders.service';
import {setupSharedServices} from './shared.service';
import {setupAuthServices} from './auth.service'

export function setupDbServices(){
    const serviceProvider = setupServiceProviders();
    const orderDetailsService = setupOrderDetailService(serviceProvider.dbInstance);   
    const productService = setupProductService(serviceProvider.dbInstance);
    const ordersService = setupOrderServices(serviceProvider.dbInstance);
    const sharedService = setupSharedServices(serviceProvider.dbInstance);
    const authService = setupAuthServices(serviceProvider.dbInstance, serviceProvider.adminAuth);
    return {
        productService,
        orderDetailsService,
        ordersService,
        sharedService,
        authService
    }
}