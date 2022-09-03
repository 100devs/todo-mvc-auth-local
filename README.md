### Introduction

Based on : A Simple ToDo App is built using the MVC Architecture, we have also implemented "authorization" so folx can sign up, customize & personalize the app

#### Group members
[Laura Abro](https://twitter.com/labrocadabro)  -  [Thierry Parlier](https://twitter.com/mrnemesys)


###### [Original version here for read about this amazing projet](https://github.com/100devs/todo-mvc-auth-local)
---


### Change made in package
1. Updated all the package dependencies to last stable version.
1. Added [express-async-errors](https://www.npmjs.com/package/express-async-errors)
1. Added [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose)
1. Added [cors](https://www.npmjs.com/package/cors)

---

### Change in the application view
We use [Bare](https://startbootstrap.com/template/bare) as a starter for our design.
And added Bootstrap to quicken the development of our application.

Bare css files and Js files are separated from the css/js files we will use in the application.
Created a partial folder to provide an unique head and footer for the main application.
As the application will not be big, the css for all the pages will be written in the css/style.css file.

As we use vanilla JavaScript, each page will have his specific javascript linked in the file and will not be used in any other page.

All repeating/common javascript will be written in the js/main.js file. This file
The Js/bare.js will be untouched and will be updated if the template is updated by the author.


### Change made in configuration.
:exclamation::exclamation::exclamation: **rename .env.example to .env to get you app to work and add your own stuff**

Added .env in gitignore to not expose the configuration and credentials but added a .env.example file so everyone know what is use as configuration and create easily the .env file to work with.

```env
NODE_ENV = development // can be in development mode or production

PORT = 3000 // Your prefered port number to connect to
DB_STRING = YOUR_DB_STRING // Your database url string Atlas or compass (local )
DB_ENV = local // prefered environment for the database
DB_STRING_WEB = YOUR_DB_STRING_WEB // Your Atlas url (or other online)
DB_STRING_LOCAL = YOUR_DB_STRING_LOCAL // Your compass url ( or other local dabase)
DB_NAME = conjug // Name of the database you want to use

USERS_COLLECTION_NAME = users // Name of the users collection
TODOS_COLLECTION_NAME = todos // Name of the users collection

SECRET= IDONTHAVETOKNOWIT // Change your secret key here

// Your google credential
GOOGLE_CLIENT_ID = YOUR_GOOGLE_SECRET_ID // Add your
GOOGLE_SECRET = YOUR_GOOGLE_SECRET



```
