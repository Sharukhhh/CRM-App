import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import connectDB from './database/connect.js'

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://crm-app-navy.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    next();
});


const corsOptions = {
    origin: 'https://crm-app-navy.vercel.app',
    methods: 'GET,PUT,PATCH,POST,DELETE',
}

app.use(cors(corsOptions));
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/' , userRoutes);

connectDB();

app.listen(4000 , () => {
    console.log('Server on');
});
