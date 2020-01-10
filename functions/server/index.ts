import express , { Request, Response }from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileSystem from 'fs';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
// importing routes
import mainController from './controllers';
const app = express();

// Settings 
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use(morgan('combined', {
    skip: function(req:Request, res: Response) { return res.statusCode < 400},
    stream: fileSystem.createWriteStream(path.join(__dirname,'access.log'), {flags: 'a'})
}));
// Routes
app.use('/api', mainController);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocument, {explorer: true}));

// Starting the server

app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
    
})

export default app;