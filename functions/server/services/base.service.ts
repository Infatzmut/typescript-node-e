class BaseService {
    returnData:any;
    constructor(){
        this.returnData = {
            status : '',
            data: {},
            message: '',
            responseCode: 200
        }
    }
    
    getServiceResponse(status: string, responseCode: number,
                     message: string, data: any){
        this.returnData.status = status
        this.returnData.message = message;
        this.returnData.responseCode = responseCode;
        this.returnData.data = data;
        return this.returnData;
    }
}

export const baseService = new BaseService();