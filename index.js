const { faker } = require('@faker-js/faker'); // REQUIRED FAKER 
const mysql = require('mysql2'); // REQUIRED MYSQL


// FORMING CONNECTION WITH DATABASE
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'FIRST_APPLICATION',
    password: 'admin123',
});




// METHOD TO RUN QUERY OF DATABASE IN NODE

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



connection.end() // TO STOP THE CONNECTION



// PRE WRITTEN CODE 🚀
let getRandomeUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
}



