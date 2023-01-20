import express from 'express'
import FileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import session from 'express-session'
import sequelizeStore from 'connect-session-sequelize'
import cors from 'cors'
import db from './config/DatabaseConnection.js'
import UserRoute from './routes/UserRoute.js'
import LoginRoute from './routes/LoginRoute.js'
import LoanRequestRoute from './routes/LoanRequestRoute.js'
import path from "path"
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
const app = express();


const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({
    db: db
});
// (async () => {
//     await db.sync()
// })();

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3668'
}))
// app.use(cors());
app.use(express.static("public"));
app.use(express.json())
app.use(FileUpload());
app.use(UserRoute)
app.use(LoginRoute)
app.use(LoanRequestRoute)
// store.sync();



export default app




