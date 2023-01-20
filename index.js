
import dotenv from 'dotenv'
import app from "./server.js"
dotenv.config

const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
    console.log(`Server connected Successfully\nand it is running on\nhttp://localhost:${PORT}`);
});