const express = require("express")
const app = express()
const data = require("./data.json")
const jwt = require("jsonwebtoken")
const PORT = 4444

app.use(express.json())


const checkJTW = (req, res, next) =>{

    const tokenInfo = req.headers.authorization;
    const verify = jwt.verify(tokenInfo, "token", (err, user)=>{
        if(err){
            res.send({message: "token is wrong"})
        }
        return user
    })
    console.log(verify)
    if(!verify){
        res.send({message:"no token sent"})
    }

    next()
}

app.get("/users", checkJTW ,(req,res)=>{
    res.send({message:"done"})
})

app.post("/login", (req, res)=>{
    const body = req.body;
    const info = jwt.sign(body, "token")

    res.send(info)

})



app.listen(PORT, console.log(`Your server is running at port ${PORT}`))