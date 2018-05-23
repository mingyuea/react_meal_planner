This is a two-week meal planner written in React. It searches for recipes using the Edamam recipe search API. 

Right now, the program can show you what meals/recipes you have on what day, look at recipe ingredients, search and add new recipes to your schedule, and delete existing reicpes.

This program has no backend yet. Your schedule will not be saved upon closing the browser. Future plans are to include localstorage to store component state into the browser, so that schedule data will have persistence.

All source code can be found under /src/js directory. The root component is PlanContainer.js, which holds the logic for all the other stateless child components.

This program has styling using SCSS, with seperate SCSS files for corresponding components, which can all be found under src/scss.