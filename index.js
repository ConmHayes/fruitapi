//Fruit Api using express
require('dotenv').config()
const fruits = require("./fruits.json")
const express = require("express")
const app = express()
const port = process.env.PORT

// example middlewear
// app.use((req, res, next) => {
//     console.log("I'm a piece of middlewear")
//     next()
// })

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello Fruits Api")
})

app.get("/fruits", (req, res) => {
    res.send(fruits)
})


const getFruitIndex = fruitName => {
    //Take in a lowercase fruitname and returns the index of the fruit or -1

    return fruits.findIndex((fruit) => fruit.name => fruit.name.toLowerCase() == fruitName)
}


app.post("/fruits", (req, res) => {

    const fi = getFruitIndex(req.body.name.toLowerCase())
    if (fi > -1) {
        res.status(409).send("The fruit already exist")
    } else {
        //create and array of al ids 
        const ids = fruits.map((fruit) => fruit.ids)
        //get max id
        let maxId = Math.max(...ids)
        //incremment that by one
        maxid++
        //Adjust id to new max id
        req.body.id = maxId

        fruit.push(req.body)
        res.status(201).send(req.body)
    }


    const fruits = req.body
    console.log(fruit) // Good for debugging
    res.send("New Fruit Created")
})

app.delete("/fruit/:name", (req, res) => {
    const fi = getFruitIndex(req.params.name.toLowerCase())
    if (fi == -1) {
        res.status(404).send(`Fruit can not be found`)
    } else {
        fruit.splice(fi, 1)
        res.sendStatus(200)
    }
})

app.get("/fruits/:name", (req, res) => {
    //res.send(`Return a fruit with ${req.params.name} name`)
    const name = req.params.name.toLowerCase() // Gets name of what i searched
    //Search Fruits.json to return if name match
    const fruit = fruits.find(fruit => fruit.name.toLowerCase() == name)
    if (fruit == undefined) {
        res.status(404).send("The fruit doesn't exist")
    } else {
        res.send(fruit)
    }

})

app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`)
})




















//Not useing Express
// const http = require("http") //Inbuilt to node

// const server = http.createServer((req, res) => {
//     console.log(res.url)
//     console.log(req.method)
//     res.setHeader("Content-Type", "text/html")
//     //res.statusCode("404") //This displace and error code
//     res.end("<img src='https://pbs.twimg.com/media/Dj8XlmjV4AEzsvr.jpg'> :)")
// }) //Creates server and sends the response

// server.listen(3000, () => { console.log("Server Ready") }) // Stars server