const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
const saltRounds = 10;

const port = process.env.PORT || 3000;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000'],
    optionSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))


app.use(function (req, res, next) {
    //res.header('Access-Control-Allow-Origin', req.header('origin'));
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    //header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    //res.header({'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'})
    //res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next();
});

// app.use(cors({ 
//      origin: ['https://localhost:3000'],
//    // origin: [`http://localhost:${port}`, `https://localhost:${port}`],
//     methods: ['GET', 'POST'],
//     // credentials:true,
//     // optionSuccessStatus:200,
//    // header:('Access-Control-Allow-Credentials', true),
//    // header:('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'),
//    //headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
// }));

//res.header('Access-Control-Allow-Origin', 'https://localhost:3000');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extened: true }));
app.use(session({
    key: 'userId',
    secret: 'subscribe',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }))

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'database#30',
    database: 'employeeSystem'
})


var del = db._protocol._delegateError;
db._protocol._delegateError = function (err, sequence) {
    if (err.fatal) {
        console.trace('fatal error: ' + err.message);
    }
    return del.call(this, err, sequence);
};

db.connect(function (err) {
    if (err) {
        {
            console.log(err)
        }
        console.log("connected")
    }
})
// User Register Form
app.post('/register', (req, res) => {
    console.log("register", req.body)
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    // db.query("INSERT INTO employeeUserSchema (firstName, lastName, email, password) VALUES (?,?,?,?)",
    //     [firstName, lastName, email, password], (err, result) => {
    //         if (err,result) {
    //             console.log(err)
    //         } else {
    //             res.send({RegisteredValues:"Uservalues Inserted"})
    //         }
    //     })

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log({ registererr: "err" })
        }
        db.query("INSERT INTO employeeUserSchema (firstName, lastName, email, password) VALUES (?,?,?,?)",
            [firstName, lastName, email, hash], (err, result) => {
                if (err, result) {
                    console.log({ ServerregisterErr: "err" })
                } else {
                    res.send({ RegisteredValues: "Uservalues Inserted" })
                }
            })
    })
})
//middleware
const verifyJwt = (req, res, next) => {
    const token = req.headers["x-access-token"]

    if (!token) {
        res.send("We need token, please try next time!")
    } else {
        jwt.verify(token, "jwtsecret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "you failed to Authenticate" })
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }

}
app.get("/isUserAuth", verifyJwt, (req, res) => {
    res.send("Yo, you're Authenticated!")
})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});


//User Login Form
app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query("SELECT * FROM employeeUserSchema WHERE email = ?;",
        email, (err, result) => {
            if (err) {
                res.send({ err: err })
                console.log({ loginerr: "err" })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {

                    if (response) {
                        // console.log("loginserver", { i: req.session.user })
                        // console.log("loginserver2222", { result, user })
                        const id = result[0].id
                        const token = jwt.sign({ id }, "jwtSecret", {
                            expiresIn: 300,
                        })
                        req.session.user = result;
                        res.json({ auth: true, token: token, result: result })
                        //res.send(result)
                    } else {
                        res.json({ auth: false, message: "wrong email or password combination!" })
                    }
                })
            } else {
                res.send({ auth: false, message: "User does not exist!" })
                // console.log({ loginuserexisterr: result[0].email })
            }
        }
    )

})


// Employee DataBase API
app.post('/create', (req, res) => {
    console.log("name", req.body)
    const name = req.body.name
    const age = req.body.age
    const country = req.body.country
    const position = req.body.position
    const wage = req.body.wage

    db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
        [name, age, country, position, wage], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("values Inserted")
            }
        })
})

//Receiving employees data 
app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.put('/update', (req, res) => {
    const id = req.body.id
    // const name = req.body.name
    // const age = req.body.age
    // const country = req.body.country
    // const position = req.body.position
    const wage = req.body.wage
    db.query("UPDATE employees SET  wage = ? WHERE id = ?", [wage, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log("yey, your server is listening on port 3001")
})