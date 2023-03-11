# Welcome to the PokeTracker App!

## Summary

Gotta catch 'em all has been the goal of almost every Trainer since the days of Pokemon Red and Blue.

Your goal is to provide a prototype that will help Trainers keep track of the Pokemon they have already caught.

You are required to complete the `Main Objective` of the app, but a `Secondary Objective` has also been provided if you have time to complete it.

## Prototype Requirements

### Main Objective
For this prototype, you will build a web application that allows users to see a list of Pokemon using the starter template in the `client` directory.

The user should have the ability to filter this list based on name, Pokedex number, and the Pokemon's primary and secondary types.
In addition, the user should also be able to mark a Pokemon as "caught".

Each Pokemon's caught status needs to be saved so that when the user come back to the app after closing it their progress is still reflected.

Provided in the `design` folder is a list of screenshots that contain how the design should look. Feel free to make any modifications to the design that you feel would make for a better UX.

The list of Pokemon to sort can be found in `client/src/data/pokemon.ts`.

Below is a list of these requirements in a list format.
- As a standard user I should be able to see a list of Pokemon introduced in Pokemon Scarlet/Violet (103 in total)
- As a standard user I should be able to filter the list by typing in the Pokemon's name or Pokedex number
- As a standard user I should be able to filter the list by selecting the Pokemon's Type 1 and/or Type 2
- As a standard user I should be able to toggle a Pokemon's status as caught/uncaught
- As a standard user I should be able to see a count how many Pokemon I have as a number and a percent

### Secondary Objective
The secondary objective is not required and should only be completed if time allows. This part of the prototype is for the server side of the application.

For this optional objective, you will need to set up an API that the client built in the `Main Objective` uses to get the list of Pokemon. An Express application has been set up in the `server` directory.

The API will also have a need for endpoints that allow admin users to modify data.
You will need to set up the authentication so that only an admin user can access endpoints that modify Pokemon data.

Please take into consideration access to the API from both the web application and from external requests, say from something like Postman.

As part of the seed data a `user` table with an admin user already created.
The seed data for the provided `pokemon` table contains a few errors that an admin needs to be able to correct.

1. Skeledirge #911 should have it's Type 2 be ghost
2. Toedscool #948 image_url should be "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/914.png"
3. Pokemon #1000 is missing. Here is the data that needs to be added
   - name: "gholdengo",
   - dex_number: 1000,
   - type_1: "steel",
   - type_2: "ghost",
   - image_url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1000.png",
4. Pokemon #1009 has snuck their way onto the list and needs to be removed

<strong>Note:</strong> These are the test cases that will be used to see if functionality is in place. When validating this functionality a new database will be created and seeded with the incorrect data.

Below is a list of these requirements in a list format.
- As an admin user I should be able to call an endpoint to create Pokemon data
- As an admin user I should be able to call an endpoint to modify Pokemon data
- As an admin user I should be able to call an endpoint to delete Pokemon data
- As non admin user I should NOT be able to create Pokemon data
- As non admin user I should NOT be able to modify Pokemon data
- As non admin user I should NOT be able to delete Pokemon data

## Technical Requirements
You will need to have [Node v18.14](https://nodejs.org/en/) installed on your computer.

### Main Objective Requirements
The front end needs to be built with Vite/React 18 using TypeScript. The repo already has the configuration set up.
Tailwind CSS has been configured as well, but feel free to use whatever method of styling you are comfortable with.

### Secondary Objective Requirements (Not Required)
For the back end server you are required to use Node v18.18 with Express using TypeScript and Prisma ORM for data management.

Express has been configured to deal with CORS but aside from that it is a vanilla setup. Feel free to add any packages you feel would improve the app.
Prisma has also been installed and configured to use a SQLite DB.
A seed file is also provided with the data needed to populate the `pokemon` and `user` tables.
If at any point you wish to reset the database, you can run `npm run seed-db` from the root of the project.

## Project Setup
To set up the project you will first need to have the code locally.

Scripts have been set up for you in the root `package.json` file.
For the Main Objective, you can run `npm run setup:client` to install packages, then run `npm run start:client` to run the Vite dev server.

For the Secondary Objective, you can run `npm run setup:server`.
This command will install all the project dependencies and create the SQLite database.
Then you can run `npm run start:server` to start the Express app.


## Conclusion
You should now be ready to begin creating the prototype. The design screenshots provided should give you a solid starting point, but feel free to add your own flare to it.

Remember this is a prototype and functionality/code will be of more value than how the app looks.

Below is a list of links to various documentation links for the different packages used:
### Main Objective
- [Typescript](https://www.typescriptlang.org/docs/)
- [React](https://reactjs.org/docs/getting-started.html)
- [React Router](https://reactrouter.com/en/main)
- [Tailwind](https://tailwindcss.com/docs/installation)

### Secondary Objective
- [Express](https://expressjs.com/en/guide/routing.html)
- [Prisma](https://www.prisma.io/docs)
- [Prisma Studio](https://www.prisma.io/studio)
- [Passport](https://www.passportjs.org/docs/)

Good luck and happy programming!