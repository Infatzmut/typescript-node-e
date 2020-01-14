import fs from 'fs';
import path from 'path';


function errorLogger(message :string){
    const date = new Date().toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    const fullmessage = `${message}  ${date} \n`;
    setTimeout(() =>fs.appendFile(path.join(__dirname, '../access.log'), fullmessage, (err) => {
      if(err) throw err;
    }),200);
  }

class BaseController {
    protected sucessStatus = 'OK';
    protected errorStatus = 'ERROR';
    protected responseData = {
        status: '',
        data: {},
        message: ''
        }

    constructor() {}

    getSuccessResponse(data: any, message: string){
        this.responseData.status = this.sucessStatus;
        this.responseData.data = data;
        this.responseData.message = message;
        return this.responseData
    }

    getErrorResponse(message: string){
        this.responseData.status = this.errorStatus;
        this.responseData.data = {};
        this.responseData.message = message;
        errorLogger(message);
        return this.responseData;
    } 
}

export const baseController = new BaseController();