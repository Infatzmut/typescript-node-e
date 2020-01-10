import * as admin from 'firebase-admin';
const serviceAccount = require('../services-config/app.json')
let app: any = null;
// require('dotenv').config();
export default function setupFirebaseApplication(){
    if(!app){
        app = admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://bxcommerce.firebaseio.com'
        })
    }
    return app;
}