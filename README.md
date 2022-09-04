# Happy Notes
A study note taking application in the style of flash cards. A new user can sign up with Happy Notes to help them study for their next big interview or exam. Login takes the user to their dashboard, where they can create a new deck specific to their study topic and add new flash cards. At the dashboard, a user can navigate through their collection of flash cards and click on the card to reveal the answer. A user also has the option to edit and/or delete a specific card if they wish. Happy Notes is complete with passport and user authentication so users can rest assure that their flash card collections are private to them and cannot be accessed by any other user.
 
**Link to project:** http://recruiters-love-seeing-live-demos.com/
 
![Happy notes frontpage](https://github.com/jericashall/happy-notes/blob/main/happynotes.png)
 
## How It's Made:
 
**Tech used:**
 
bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator, materialize, swiper.js
 
The selected tech used by the app is with the intention to provide the best user experience and security of information. Happy Notes is created by developers who use and are familiar with study apps, but wanted a more personalized approach to their study applications. It was important to our team of developers to provide users with the option to make changes to their studying material without having to navigate through a complex system, so the entire team consulted with each other to design a dashboard for their collection where they had access to all the features of the app in one place. Materialize components were used to streamline the buttons and user interface, and swiper.js provided the smoothness and functionality of swiping through the collection. Express is king in providing our team of developers the abstraction to implement features more easily on the backend using node.js, as well as the capability to include many devs tools to build the Happy Notes app. 

[insert pic here]
![alt tag](http://placecorgi.com/1200/650)
 
Security is a key feature of the Happy Notes application. Implementing bcrypt ensures the user's sign up passwords remain private by passing it through hashing algorithm to increase their complexity before it is stored in the database. Passport sessions allow the user to securely remain logged in to their account and return to their study session as they need. MongoDB provides a robust storage system for housing all the associated information from the users collections, to their sessions and credentials. Mongoose is used to provide structure to our schemas when being passed into our Mongo database.
 
 
## Optimizations
*(optional)*
 
You don't have to include this section but interviewers *love* that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are **GREAT** to bring up in interviews and you can use this section as reference when studying for technical interviews!
 
## Lessons Learned:
 
No matter what your experience level, being an engineer means continuously learning. Every time you build something you always have those *whoa this is awesome* or *fuck yeah I did it!* moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing.
 
## Happy Notes Team:
 
- <a href="https://github.com/degenerating">Christian L.</a>
- <a href="https://github.com/QuocNguyen2412">Danny N.</a>
- <a href="https://github.com/hlsamuel00">Harvey S.</a>
- <a href="https://github.com/jericashall">Jerica H.</a>
- <a href="https://github.com/leandro-alba">Leandro A.</a>
- <a href="https://github.com/hlsamuel00">Yire M.</a>
