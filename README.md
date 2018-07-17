This is a two-week meal planner written in React. It searches for recipes using the Edamam recipe search API. It saves your schedule using my own Node/Express backend, with a MongoDB

Right now, the program can show you what meals/recipes you have on what day, look at recipe ingredients, search and add new recipes to your schedule, and delete existing reicpes.

This program has a backend, primarily for users who want to login/signup and save their two-week schedule. Passwords are encrypted on the server-side using bcrypt (although it is still not recommended to use an important username/password combination).

All source code can be found under /src/js directory. The root component is PlanContainer.js, which holds the logic for all the other stateless child components.

The server-side code can be found in a seperate repository.

This program has styling using SCSS, with seperate SCSS files for corresponding components, which can all be found under src/scss.