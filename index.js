const { faker } = require('@faker-js/faker'); // Required Faker
const mysql = require('mysql2'); // Required MySQL

// forming connection with database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'FIRST_APPLICATION',
    password: 'admin123',
});

// method to run query of database in node

let Q = "SHOW DATABASES";
try {
    connection.query(Q, (err, result) => {
        if (err) throw err
        console.log(result)
        console.log(result.length)
        console.log(result[0])
        console.log(result[1])
    })
} catch (err) {
    console.log(err)
}

connection.end() // to stop the connection

// Pre Written Code 🚀
let getRandomeUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}

// console.log(getRandomeUser());


