# Background of Frontend

## React

All code include tag are written in js file instead of html file.

## UI design

Tailwind CSS and DaisyUI. All style must be written in className.

## State Management

React Redux

## Routing

React-router-dom

## Environment Management

In order to use different API for different environment(development, production), I have set up 2 .env file:
`.env.development`
`.env.production`

### Format:

React_App_API= TYPE_YOUR_API_URL_HERE

## How to Run the project's frontend in phase 3

### Install Node.js

Download from https://nodejs.org/en/. Version is 18.xx.x LTS (left button)

### `npm install`

Open terminal such as Powershell. Use `cd` command to arrive this folder (ierg4210). After reaching, please run `npm install` command to install all the dependencies.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Remainder of phase 2's frontend

If using `npm start` to view the page, then in order to get data from DB, turning on backend server is necessary. Please visit ierg4210_server folder and read its README.MD to turn on the server.

If you want to not visit/visit admin panel, then please login in:
| email | password | role|
| ------ | ------ | ------ |
| admin@admin.com | admin | admin |
| user@user.com | user1234 | user |

## How to deploying frontend in AWS EC2

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### transfer all files in `build` folder to /var/www/html/
