const express = require("express")
const app = express()
const newsController = require("./controllers/news.controller")
const cors = require("cors")


app.use("/", newsController)
app.use(cors())
const port = process.env.PORT || 3001

app.listen(port, ()=>{
    console.log("listening on 3001")
})

