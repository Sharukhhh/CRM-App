import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import connectDB from './database/connect.js'

const app = express();


app.use(cors());
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/' , userRoutes);

connectDB();

app.listen(4000 , () => {
    console.log('Server on');
});
