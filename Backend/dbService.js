// Database services, accessible by DbService methods.

const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

let instance = null;

// Database connection setup
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "web_app",
    port: 3306
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Database connected: ' + connection.state);
    }
});

// The DbService class with methods for managing the Users table
class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    // Fetches all users from the Users table
    async getAllUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Insert a new user into the Users table
    async insertNewUser(username, password, firstname, lastname, salary, age, registerday, signintime) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = `
                    INSERT INTO Users (username, password, firstname, lastname, salary, age, registerday, signintime)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;
                connection.query(query, [username, password, firstname, lastname, salary, age, registerday, signintime], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.insertId);
                });
            });
            return {
                id: insertId,
                username: username,
                firstname: firstname,
                lastname: lastname,
                registerday: registerday,
                signintime: signintime
            };
        } catch (error) {
            console.log(error);
        }
    }

    // Search for a user by username
    async searchByUsername(username) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Users WHERE username = ?;";
                connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    else resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    // Search users by first and/or last name
async searchByFirstOrLastName(firstname, lastname) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM Users WHERE firstname LIKE ? OR lastname LIKE ?;";
            connection.query(query, [`%${firstname}%`, `%${lastname}%`], (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Search users by salary range
async searchBySalaryRange(minSalary, maxSalary) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM Users WHERE salary BETWEEN ? AND ?;";
            connection.query(query, [minSalary, maxSalary], (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Search users by age range
async searchByAgeRange(minAge, maxAge) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM Users WHERE age BETWEEN ? AND ?;";
            connection.query(query, [minAge, maxAge], (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Search users who registered after a specific user
async searchUsersRegisteredAfter(userId) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM Users
                WHERE registerday > (
                    SELECT registerday FROM Users WHERE username = ?
                );
            `;
            connection.query(query, [userId], (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Search users who never signed in
async searchUsersNeverSignedIn() {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM Users WHERE signintime IS NULL;";
            connection.query(query, (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Search users registered on the same day as a specific user
async searchUsersRegisteredOnSameDay(userId) {
    try {
        const response = await new Promise((resolve, reject) => {
            const query = `
                SELECT * FROM Users
                WHERE registerday = (
                    SELECT registerday FROM Users WHERE username = ?
                );
            `;
            connection.query(query, [userId], (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}

// Return users who registered today
async searchUsersRegisteredToday() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM Users WHERE registerday = ?;";
            connection.query(query, [today], (err, results) => {
                if (err) reject(new Error(err.message));
                else resolve(results);
            });
        });
        return response;
    } catch (error) {
        console.log(error);
    }
}


}

module.exports = DbService;
