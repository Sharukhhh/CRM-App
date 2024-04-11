import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import connectDB from './database/connect.js'

const app = express();

const corsOptions = {
    origin: 'https://crm-app-navy.vercel.app/',
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
