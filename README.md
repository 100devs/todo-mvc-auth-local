# Our Awesome Project
Welcome!

Feeling rushed or overwhelmed with day-to-day tasks?

Our todo list app features priority dates so you can make sure you're not forgetting what's important and when tasks are due!

We've built our app using model-view-controller (MVC) architecture for organization and structure. And we've added authentication so users of our app can signup, login, and personalize their app experience.

Take a look around and see what we've been up to!

Thanks for stopping by!

### Technologies
HTML for content and structure, CSS and materialize for styling, JavaScript for behavior and interaction, Passport.js for authentication, Express as a framework for Node.js, EJS as a templating language, and MongoDB as a database.

Packages and Dependencies
bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

## Our Team
|Name	| Website	| GitHub
|-----|----------|-------|
|Lauren Doughty|	[Lauren's website](laurendoughty.netlify.app/)|	[Lauren's GitHub](https://github.com/LaurenDoughty)|
|Brandi H |	[Brandi's website](alternategait.dev) |	[Brandi's GitHub](https://github.com/alternategait)|
|Sehjong Hamjong	| [Sehjong's website](https://sehjong.me/)	| [Sehjong's GitHub](https://github.com/sehjong)|
|Michael Nguyen |	[Michael's website](https://michaelnguyen.netlify.app/)	| [Michael's GitHub](https://github.com/MichaelNDev) |
|Philip Simpson |	[Philip's Website](https://www.phitdev.com/) |	[Philip's GitHub](https://github.com/phitdev) |
|Ben Thrasher |	[Ben's Website](https://benthrasher.dev/) |	[Ben's GitHub](https://github.com/binthroot) |

## Our Contributions
##### Lauren Doughty

-documentation, README.md

##### Brandi H

- reviewed and approved pull-requests
- updated todo schema
- added logic to add class to li for urgent vs non-urgent
- added sticky-note styling in CSS
- added logic in ejs and styling in CSS for completed todos, and icons

##### Sehjong Hamjong

- documentation, README.md

##### Michael Nguyen

- added a welcome back message at top of page

##### Philip Simpson

- Materialize and CSS to all views: index, login, signup, todos
- added classes for styling purposes
- utilized Materialize via href links
- created classes via materialize npm docs
  -style.css
  -login.ejs
  -signup.ejs
  -index.ejs
  -todos.ejs
- layout HTML within ejs files for label and inputs

##### Ben Thrasher

- added new elements in todo.ejs, updated todo controller
- addressed full date display issues
- depricated passport from 0.6 to 0.5.3 and fixed logout issues
- Todos page automatically renders sticky notes in ascending due date order


#### Things to install (all the dependencies or node packages used for development via Terminal)

npm install express --save

npm install mongodb --save

npm install ejs --save

npm install dotenv --save

#### Things to add

Create a .env file and add the following as key: value

PORT: 2121 (can be any port example: 3000)

DB_STRING: your database URI
