const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express')
const app = express()
const path = require('path')

// SETTING EJS 
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

const port = 8080

// USING METHOD OVERRIDE
const methodOverride = require("method-override")
app.use(methodOverride("_method"))

// PARSING FORM DATA
app.use(express.urlencoded({extended : true}))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: 'admin123'
});

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password()
    ]
}

// let q = "INSERT INTO user (id , username , email , password) VALUES ?"
// let users = [["123b", "123_newuserb", "abc@gmail.comb", "abcb"], ["123c", "123_newuserc", "abc@gmail.comc", "abcc"]]

// let data = []
// for (let i = 1; i < 100; i++) {
//     // console.log(getRandomUser())
//     data.push(getRandomUser())
// }




// UNIVERSAL ROUTE ( HOME )
app.get("/", (req, res) => {
    let q = 'SELECT count(*) FROM user';
    try {
        connection.query(q, (err, result) => {
            if (err) throw err
            // res.send(result[0]["count(*)"])

            let count = result[0]["count(*)"]
            res.render("home.ejs", { count })

        })
    } catch (err) {
        console.log(err)
        res.send("SOME ERROR OCCURED")
    }
})

// SECOND ROUTE - FETCH AND SHOW ALL THE USERNAME EMAIL AND USERID 
app.get("/user", (req, res) => {
    let Q = "SELECT * FROM user"
    try {
        connection.query(Q, (err, users) => {
            if (err) throw err
            res.render("ShowUser.ejs", { users })
        })
    } catch (err) {
        console.log(err)
        res.send("SOME ERROR OCCURED IN DB : (")
    }
})

// START THE SERVER 
app.listen(port, () => {
    console.log("APP IS LISTENING ON PORT 8080")
})

// EDIT USERNAME 😄 ROUTE
app.get("/user/:id/edit", (req, res) => {
    let id = req.params.id // TAKING ID FROM URL

    // WE HAVE TO SEARCH THE USER USING HIS ID IN THE DB USER TABLE
    let Q = `SELECT * FROM user WHERE id = '${id}'`

    try {
        connection.query(Q , (err , result)=>{
            if (err) throw err

            // console.log(result) 🐦‍🔥
            let USER = result[0]
            res.render("Edit.ejs" , { USER })
        })
    } catch (err) {
        console.log(err)
        res.send("ERROR IN DATABASE")
    }

})

// UPDATE ROUTE 
app.patch("/user/:id",(req , res)=>{
    res.send("UPDATED")

    // CODE PENDING LAST 🔴
})

// connection.end()

