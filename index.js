const express = require("express")
const app = express()
const newsController = require("./controllers/news.controller")


app.use("/", newsController)
const port = process.env.port || 3001

app.listen(port, ()=>{
    console.log("listening on 3001")
})

