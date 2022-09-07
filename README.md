# Happy Notes
A study note taking application in the style of flash cards. A new user can sign up with Happy Notes to help them study for their next big interview or exam. Login takes the user to their dashboard, where they can create a new deck specific to their study topic and add new flash cards. At the dashboard, a user can navigate through their collection of flash cards and click on the card to reveal the answer. A user also has the option to edit and/or delete a specific card if they wish. Happy Notes is complete with passport and user authentication so users can rest assure that their flash card collections are private to them and cannot be accessed by any other user.
 
**Link to project:** https://happy-notes-app.herokuapp.com/
 
![Happy notes frontpage](https://github.com/jericashall/happy-notes/blob/main/happynotes.png)
 
## How It's Made:
 
**Packages/Dependencies used:**
 
bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator, materialize, swiper.js
 
The selected tech used by the app is with the intention to provide the best user experience and security of information. Happy Notes is created by developers who use and are familiar with study apps, but wanted a more personalized approach to their study applications. It was important to our team of developers to provide users with the option to make changes to their studying material without having to navigate through a complex system, so the entire team consulted with each other to design a dashboard for their collection where they had access to all the features of the app in one place. Materialize components were used to streamline the buttons and user interface, and swiper.js provided the smoothness and functionality of swiping through the collection. Express is king in providing our team of developers the abstraction to implement features more easily on the backend using node.js, as well as the capability to include many devs tools to build the Happy Notes app. 


![Happy Notes app in use](https://github.com/yiremorlans/happy-notes/blob/main/happynotes.gif)
 
Security is a key feature of the Happy Notes application. Implementing bcrypt ensures the user's sign up passwords remain private by passing it through hashing algorithm to increase their complexity before it is stored in the database. Passport sessions allow the user to securely remain logged in to their account and return to their study session as they need. MongoDB provides a robust storage system for housing all the associated information from the users collections, to their sessions and credentials. Mongoose is used to provide structure to our schemas when being passed into our Mongo database.

**Install all the dependencies or node packages used for development via Terminal:**

`npm install`

**Things to add**

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
 ---
 
 
## Optimizations
 
Happy Notes future optimizations include ongoing improvements to the user interface as the team gathers more feedback from users. The team opted to go with a default dark theme, however future versions of the app may include option for light theme as well. There is room to implement an edit/delete features for specific study decks and performance improvements as the app continues testing among users. A further optimization would be adding a feature that allows users to hide cards that they are comfortable with from the default view and a toggle option to let them view the hidden cards seperately.
 
## Lessons Learned:

Happy Notes is a collaborative effort between a group of developers working together for the first time, and growing their skills as developers in a team environment. The team of Happy Notes had to get more comfortable with many technologies while creating a full stack web app that incorporates a node.js MVC structure. The devs wanted a friendly and robust UI that involved learning how to manipulate elements through various CSS properties and incorporating front end frameworks and components like Materialize and Swiper.js. A good portion involved using package libraries' respective documentation to troubleshoot issues encountered along the way. The team incorporated method-override to send put requests through forms making Happy Notes a RESTful application. Our devs also required a deep dive into understanding relationships in a non-relational database like for implementing subdocuments within the schema using mongoose and one-to-many relationships data model. The use of the MVC structure for this project allowed the devs to work on sections of the program logic at the same time while using git, making collaboration easier.

## Happy Notes Team:
 
- <a href="https://github.com/degenerating">Christian L.</a>
- <a href="https://github.com/QuocNguyen2412">Danny N.</a>
- <a href="https://github.com/hlsamuel00">Harvey S.</a>
- <a href="https://github.com/jericashall">Jerica H.</a>
- <a href="https://github.com/leandro-alba">Leandro A.</a>
- <a href="https://github.com/yiremorlans">Yire M.</a>
