const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const DBconnection = require('./config/database');
const connectDB = require('./config/database');

dotenv.config({path:path.join(__dirname,"config/config.env")});

app.listen(process.env.PORT,()=>{
    console.log(`server is running PORT ${process.env.PORT} in ${process.env.NODE_ENV}`);
})
connectDB();