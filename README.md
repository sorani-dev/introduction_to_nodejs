# Introduction to Node.

By LinuxFoundationX LFW111x

From edX course


## Syllabus

- Welcome!
    - Welcome!
- Chapter 1. Setting Up
    - Introduction
    - Setting Up Node
    - Knowledge Check
- Chapter 2. Service Mocking 
    - Introduction, Terminé
    - Exploring Service Mocking
    - Knowledge Check
- Chapter 3. Going Real-Time 
    - Introduction
    - Real-Time Functionality
    - Knowledge Check
- Chapter 4. Building CLI Tools
    - Introduction
    - Working with CLI Tools
    - Knowledge Check
- Chapter 5. Navigating the Ecosystem
    - Introduction
    - Node.js Ecosystems
    - Knowledge Check.
- Chapter 6. What's Next
    - Introduction
    - Where to Go From Here
    - Knowledge Check
    - Course Feed-back
- Final Exam
    - Before You Take the Final Exam
    - Final Exam

## Important Dates

- **Mon. 1 août 2022**:
    Course Start
- **Mon. 8 août 2022**:
Limit date for upgrading for verified certificate.
- **Wed. 17 août 2022**:
    Course ends. Couse content will be archived and will not be active anymore.
- **Mon. 19 sept. 2022**:
    Audit mode expires.

## How to use

### installation

Install the dependancies with: `npm install`
- if you use Node version 14 or above you can change the package.json dependancies and install
  - fastify with `npm install fastify`
  - fastify cors with: `npm install @fastify/cors`, 
  - serve with: `npm install serve`.
  
- if you use a Node.js version below 14 use the following vrrsions in package.json:
  - fastify with `npm install fastify@^3`
  - fastify cors with: `npm install @fastify/cors^7`, 
  - serve with: `npm install --save-dev serve^13`.
  
### Running the app

- to run in development mode: run `npm dev` for the server and `npm start` for the static front-end website
- to run in production mode: run `npm start:serve` for the server and `npm start` for the static front-end website

