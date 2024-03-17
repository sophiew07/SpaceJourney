//This is required to get input from the user in the console.
const readline = require('readline-sync');

// import RiTa library
let rita = require('rita');

/*
Title: Let's Go To Space!
Purpose: Determine the path that the user will travel based on the given input, and how long it will take them to travel their whole journey

Author: Sophie Wong
Date Created: 15-Dec-2023
Last Updated: 23-Dec-2023
*/

/** 
 * Finds key when given value
 *
 * @ param {array} object - JSON object that the key will be from
 * @ param {string | number | error message} value - Value in the JSON object being referenced
 * 
 * @returns {string} Returns the key of the given value from the JSON object
 */
const keyFromValue = (object,value) => {
  
  // error checking
  if (object == planetColour){
    if (typeof value !== "string"){
      throw new TypeError("TypeError: input should be a string");
    }
    if (!Object.values(planetColour).includes(value)){
      throw new RangeError("RangeError: input should be a colour from the list");
    }
  }
  else if (object == spaceship){
    if (isNaN(value)){
      throw new TypeError("TypeError: input should be a number");
    }
    if (value < 1 || value > 8){
      throw new RangeError("RangeError: input should be a number between 1-8");
    }
  }

  // finding result of function
  return Object.keys(object).find(key => object[key] == value);
}


// creating arrays
let planets = ['earth','mars','venus','jupiter','neptune','uranus','saturn','mercury'];
let constellations = ['ursa major','ursa minor','cassiopeia','orion','libra','capricornus','taurus','virgo','sagittarius','aries','scorpius','cancer','leo','gemini','pisces','aquarius','canis major','canis minor'];
let userPlanets = [];
let userConstellations = [];
let userTimeTravelling = [];

// creating JSON-style objects
let spaceship = {'Gemini 2':1,'Gemini 4':2,'Apollo 9':3,'Apollo 14':4,'Orion':5,'Atlantis':6,'Mariner 5':7,'Mariner 3':8};
let planetColour = {'earth neptune':'blue',  'mars':'red',  'venus saturn':'yellow',  'jupiter':'beige',  'uranus':'light blue',  'mercury':'grey'};

// creating variables
let spaceshipSelection = 0;
let userSpaceship = '';
let totalTime = 0;
let distance = 0;

// determining which planets user wants to visit
console.log("Colours: \n" + Object.values(planetColour).join(", ") + "\n");

let userColour = readline.question("Out of the colours listed above, which do you like? (Add each colour one at a time, and input '.' when you are done.): ");

// determining which planets user wants to visit based on input
while (userColour != "."){
  userColour = userColour.toLowerCase().trim();
  
  while (!Object.values(planetColour).includes(userColour)){
    
    // error checking
    try {
      keyFromValue(planetColour,userColour);
    } catch (error){
      console.log(error.message);
    }
    userColour = readline.question("\nPlease correctly spell the colour, following the spelling above: ");
    userColour = userColour.toLowerCase().trim();
  }
  
  // ensuring planet is not pushed into userPlanets twice
  if (userPlanets.includes(keyFromValue(planetColour,userColour))){
    userPlanets.pop(userColour);
    userColour = userColour.toLowerCase().trim();
  }
  
  // adding new planet into userPlanets
  else {
    if (keyFromValue(planetColour,userColour) == "earth neptune") {
      if (!userPlanets.includes("earth")){
        userPlanets.push("earth");
      }
      if (!userPlanets.includes("neptune")){
        userPlanets.push("neptune");
      }
    }
    else if (keyFromValue(planetColour,userColour) == "venus saturn"){
      if (!userPlanets.includes("venus")){
        userPlanets.push("venus");
      }
      if (!userPlanets.includes("saturn")){
        userPlanets.push("saturn");
      }
    }
    else {
      userPlanets.push(keyFromValue(planetColour,userColour));
    }
    userColour = readline.question("Input your next answer: ");
  }
}

// displaying current planets to user
console.log("These are the planets that you will be visiting: " + userPlanets.join(", "));


// replacing planets in the array
planetSplice = readline.question("\nWould you like to replace any planets from this list?: ");
planetSplice = planetSplice.toLowerCase().trim();

// deals with invalid input
while ((planetSplice !== "yes") && (planetSplice !== "no")){
  planetSplice = readline.question("Please input 'yes' or 'no': ");
  planetSplice = planetSplice.toLowerCase().trim();
}

// user wants to replace a planet
while (planetSplice.trim() == "yes"){
  let removePlanet = readline.question("Which planet would you like to replace?: ");
  removePlanet = removePlanet.toLowerCase().trim();
  let indexOfPlanet = userPlanets.findIndex((planet) => planet.trim().toLowerCase() === removePlanet.trim().toLowerCase());

  // invalid input (planet is not present in userPlanets)
  while (indexOfPlanet === -1){
    removePlanet = readline.question("Please input a planet that is in the list: ");
    removePlanet = removePlanet.toLowerCase().trim();
    indexOfPlanet = userPlanets.findIndex((planet) => planet.trim().toLowerCase() === removePlanet.trim().toLowerCase());
  }

  // removing desired planet
  userPlanets.splice(indexOfPlanet,1);

  // determining which planet user wants to put into userPlanets instead
  let replacePlanet = readline.question("Which planet would you like to add as the replacement?: ");
  replacePlanet = replacePlanet.toLowerCase().trim();

  // deals with invalid input (incorrect spelling or planet is already in userPlanets)
  while (userPlanets.includes(replacePlanet) || !planets.includes(replacePlanet)){
    replacePlanet = readline.question("Please input a planet that is not in your list, and ensure the spelling is correct!: ");
    replacePlanet = replacePlanet.toLowerCase().trim();
  }
  
  // adds desired planet into userPlanets in same index as the removed planet
  userPlanets.splice(indexOfPlanet,0,replacePlanet);

  // determines if more planets will be replaced
  planetSplice = readline.question("Would you like to replace another planet?: ");
  planetSplice = planetSplice.toLowerCase().trim();
  
  while ((planetSplice !== "yes") && (planetSplice !== "no")){
    planetSplice = readline.question("Please input 'yes' or 'no': ");
    planetSplice = planetSplice.toLowerCase().trim();
  }
}
if (planetSplice == "no"){
  console.log();
}


// counting planets to choose which spaceship the user will use to travel
for (planet of userPlanets){
  spaceshipSelection += 1;
}
userSpaceship = keyFromValue(spaceship,spaceshipSelection);


// determining which constellation user wants to visit
constellations.sort()
console.log("\nConstellations: \n" + constellations.join(", ") + "\n");

let userConstellationChoice = readline.question("Out of the constellations listed above, which would you like to visit? (Add each constellation one at a time, and input '.' when you are done.): ");

while (userConstellationChoice !== "."){
  userConstellationChoice = userConstellationChoice.toLowerCase().trim();

  // deals with invalid input (incorrect spelling)
  while (!constellations.includes(userConstellationChoice)){
    userConstellationChoice = readline.question("Please correctly spell the constellation, following the spelling above: ");
    userConstellationChoice = userConstellationChoice.toLowerCase().trim();
  }

  // deals with invalid input (constellation already in userConstellations)
  while (userConstellations.includes(userConstellationChoice)){
    userConstellationChoice = readline.question("This constellation has already been chosen, choose another one: ");
    userConstellationChoice = userConstellationChoice.toLowerCase().trim();
  }

  // adds desired constellations to userConstellations
  userConstellations.push(userConstellationChoice);

  // displaying current constellations to user
  console.log("\nThese are the current constellations in your list: " + userConstellations.join(", "));
  
  userConstellationChoice = readline.question("Input your next answer: ");
}


// finalizing user's travel path
const userChoices = userPlanets.concat(userConstellations);
let userChoicesRandom = rita.randomOrdering(userChoices);

// calculating the distance between each plant/constellation
for (let choice = 0;choice < userChoicesRandom.length - 1;choice++){
  let currentChoice = userChoicesRandom[choice];
  let nextChoice = userChoicesRandom[choice+1];

  // planet --> planet
  if (planets.includes(currentChoice) && planets.includes(nextChoice)){
    distance = 1290;
  }

  // planet --> constellation or constellation --> planet
  else if (constellations.includes(currentChoice) && constellations.includes(nextChoice)){
    distance = 124;
  }

  // constellation --> constellation
  else {
    distance = 593;
  }

  // calculating time (in seconds) how long it takes to travel from one destination to another
  let timeTravelled = Math.round((distance/12)*100);
  userTimeTravelling.push(timeTravelled);
}

// calculating user's total travel time
for (time in userTimeTravelling){
  totalTime += userTimeTravelling[time];
}
totalTime = totalTime/100;

// final display message
console.log("Here is your designated path: " + String(userChoicesRandom.join(" -> ")));
console.log("You will be taking the " + String(userSpaceship) + " spaceship, and it will take approximately " + String(totalTime) + " seconds to complete the journey!");



// exports for unit testing
module.exports = {
  keyFromValue,
  planetColour,
  spaceship,
  constellations
};