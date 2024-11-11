
**Abdulla Maruf**

 



**Project description**

In this project, we create a user table and then use it to register a new user and then allows the user to sign into a website.

**View Demo**  
Youtube: https://youtu.be/G66KqOr02bk


We implemented the following interface and functoinalty: 
1. User registration.
2. User sign-in.
3. search users by first and/or last name.
4. search users by userid;
5. search all users whose salary is between X and Y. 
6. Search all users whose ages are between X and Y.
7. Search users who registered after john registered, where ```john``` is the userid.
8. search users who never signed in.
9. Search users who registered on the same day that john registered. 
10. Return the users who registered today;

Show and explain the results above in a video. Submit all SQL statements in a file called sql.txt. 

We create the user table using the following CREATE TABLE stmt (feel free to revise it): 


```SQL
CREATE TABLE Users(
   username VARCHAR(50) primary key,
   password VARCHAR(50), 
   firstname VARCHAR(50),
   lastname VARCHAR(50),
   salary FLOAT,
   age INTEGER,
   registerday DATE,
   signintime DATETIME
) 
```
 Start the Backend by running ```npm start```.

Now you can access the Frontend via [http://localhost/database_javascript/project1/Frontend/auth.html].

Enjoy. 
Team Unknown

