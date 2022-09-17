const express = require("express")
const faker = require("faker")
const mysql = require('mysql')
const app = express()

const port = 3000

const connection = mysql.createConnection({
    host: 'db',
    user: 'mysql',
    password: 'mysql',
    database: 'mysql',
})

const sqlCreateTable = 'CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY (id));'
connection.query(sqlCreateTable)


app.get("/",(req, res) => {
    const sqlInsert = `INSERT INTO people (name) values ('${faker.name.firstName()}');`
    connection.query(sqlInsert)

    const sqlSelect = `SELECT * FROM people;`
    connection.query(sqlSelect, function (error, results, fields) {
        if (results) {
            const data = results.map((data) => `<li>${data.name}</li>`)
            res.send(`<h1>Full Cycle Rocks!</h1><ul>${data.join("")}</ul>`)
        } else {
            res.send(`<h1>Full Cycle Rocks!</h1>`)
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
