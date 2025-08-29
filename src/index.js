// Basic Server configuraitopn
const express = require('express')
const {ServerConfig,logger} = require('./config')
const apiRoutes = require('./routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,async ()=>{
    console.log("server started at port 3000");
    // logger.info("successfully started the server",{})

    // bad code alert
    const {City,Airport} = require("./models")
    const city = await City.findByPk(7);
    console.log(city);
    // const airport = await Airport.create({name:'Chennai Airport',code:'CHN', cityId: 7})
    // await City.destroy({
    //     where:{
    //         id:7
    //     }
    // })

    
})