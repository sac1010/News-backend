const express = require("express")
const axios = require("axios")
const router = express.Router()

router.get("/topstories", async(req, res)=>{
    try{
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
        const storyIds = response.data
        const size = 8
        const pages = Math.ceil(storyIds.length/size) 
        const page = req.query.page || 1
        const pageIds = storyIds.splice((page-1)*size, size)
    
                const promises = []
                for(let i=0; i<pageIds.length; i++){
                    const result =  axios.get(`https://hacker-news.firebaseio.com/v0/item/${pageIds[i]}.json?print=pretty`)
                    promises.push(result)
                    
                }
                const results = await Promise.all(promises);
                const stories  = results.map((res)=>res.data) 
        res.status(200).send({stories, pages})
    }catch(err){
        res.send(err)
    }


})

router.get("/newstories", async(req, res)=>{
    
    try{
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty`)
        const storyIds = response.data
        const size = 8
        const pages = Math.ceil(storyIds.length/size) 
        const page = req.query.page || 1
        const pageIds = storyIds.splice((page-1)*size, size)
    
                const promises = []
                for(let i=0; i<pageIds.length; i++){
                    const result =  axios.get(`https://hacker-news.firebaseio.com/v0/item/${pageIds[i]}.json?print=pretty`)
                    promises.push(result)
                    
                }
                const results = await Promise.all(promises);
                const stories  = results.map((res)=>res.data) 
        res.status(200).send({stories, pages})
    }catch(err){
        res.status(500).send(err)
    }


})

router.get("/beststories", async(req, res)=>{
    try{
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty`)
        const storyIds = response.data
        const size = 8
        const pages = Math.ceil(storyIds.length/size) 
        const page = req.query.page || 1
        const pageIds = storyIds.splice((page-1)*size, size)
    
                const promises = []
                for(let i=0; i<pageIds.length; i++){
                    const result =  axios.get(`https://hacker-news.firebaseio.com/v0/item/${pageIds[i]}.json?print=pretty`)
                    promises.push(result)
                    
                }
                const results = await Promise.all(promises);
                const stories  = results.map((res)=>res.data) 
        res.status(200).send({stories, pages})
    }catch(err){
        res.send(err)
    }


})
 

module.exports = router