const express = require('express'); 
const app = express(); 
const usersRouter = require('./routes/users') 
const cors = require('cors')
//CORS
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback){
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback (new Error("Not allowed by CORS"))
        }
    }
};
app.use(cors(corsOptions))

const db = require("./models")


app.use(express.json())
//routers
app.use('/api/users', usersRouter) 


db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("server is running")
    });
});




