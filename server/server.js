require('dotenv').config()

const controller = require('./controller')
const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const massive = require('massive');
const axios = require('axios')

const app = express();

let {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING
} = process.env

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))


app.use(bodyParser.json());

massive(CONNECTION_STRING)
    .then( (dbInstance) => {
        app.set('db', dbInstance)
        console.log('connected to the db')
    })
    .catch( (err) => {
        console.log(err)
    })

app.post('/api/auth/register', controller.register);

app.post('/api/auth/login', controller.login);

app.get('/api/posts/:id', controller.getPosts);

// app.get('/auth/callback', async (req, res) => {
//     // auth0 sending code in req.query.code
//     let payload = {
//         client_id: REACT_APP_CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//         code: req.query.code,
//         grant_type: 'authorization_code',
//         redirect_uri: `http://${req.headers.host}/auth/callback`
//     }
//     // exchange code for token. token is on resWithToken.data.access_token
//     let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload).catch(console.error)
//     // exchange token for user data
//     let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${resWithToken.data.access_token}`).catch(console.error);
//     console.log(resWithUserData.data)

//     let {email, picture, sub, name} = resWithUserData.data;
//     // check if user already exists in database
//     const db = app.get('db')
//     let foundCustomer = await db.find_customer([sub])
//     if(foundCustomer[0]){
//         // found user existing in  the db, put returned user on session
//         req.session.user = foundCustomer[0]
//     } else {
//         // no user was found by that google id. create user
//         let createdCustomer = await db.create_customer([name, sub, picture, email])
//         req.session.user = createdCustomer[0]
//     }

//     res.redirect('/#/private')
// })

// app.get('/api/user-data', authBypass, (req, res) => {
//     if(req.session.user) {
//         res.status(200).send(req.session.user);
//     } else {
//         res.status(401).send('Please login')
//     }
// })

// app.get('/auth/logout', (req,res) => {
//     req.session.destroy();
//     res.redirect('http://localhost:3000/#/')
// })

app.listen(SERVER_PORT, () => {
    console.log(`Docked at port: ${SERVER_PORT}`)
})