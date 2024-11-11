// Backend: application services, accessible by URIs

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Insert a new user
app.post('/insert', (request, response) => {
    console.log("app: insert a new user.");
    const { username, password, firstname, lastname, salary, age, registerday, signintime } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewUser(username, password, firstname, lastname, salary, age, registerday, signintime);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Read all users
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllUsers();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Search for a user by username
app.get('/search/:username', (request, response) => {
    const { username } = request.params;
    console.log(username);

    const db = dbService.getDbServiceInstance();

    let result;
    if (username === "all") 
        result = db.getAllUsers();
    else
        result = db.searchByUsername(username);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});
// Search by first or last name
app.get('/search/name/:firstname/:lastname?', (request, response) => {
    const { firstname, lastname } = request.params;
    const db = dbService.getDbServiceInstance();
    
    const result = db.searchByFirstOrLastName(firstname, lastname || '');

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Search by salary range
app.get('/search/salary/:min/:max', (request, response) => {
    const { min, max } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchBySalaryRange(min, max);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Search by age range
app.get('/search/age/:min/:max', (request, response) => {
    const { min, max } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByAgeRange(min, max);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Search users registered after a specific user
app.get('/search/after/:username', (request, response) => {
    const { username } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchUsersRegisteredAfter(username);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Search users who never signed in
app.get('/search/never-signed-in', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.searchUsersNeverSignedIn();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Search users registered on the same day as a specific user
app.get('/search/same-day/:username', (request, response) => {
    const { username } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchUsersRegisteredOnSameDay(username);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Return users who registered today
app.get('/search/today', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.searchUsersRegisteredToday();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// Sign in route
app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const db = dbService.getDbServiceInstance();
    
    // Perform authentication logic here
    const result = db.authenticateUser(username, password); // Example function

    result
        .then(isAuthenticated => {
            if (isAuthenticated) {
                res.json({ success: true, message: "User signed in!" });
            } else {
                res.json({ success: false, message: "Invalid username or password." });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Authentication failed' });
        });
});


// Set up the web server listener
app.listen(5050, () => {
    console.log("I am listening on the fixed port 5050.");
});
