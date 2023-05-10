# WELCOME TO NEW LEAF 
## Group 33 Final Project


// If possible please use ingonito mode some of the extensions of browsers disrupts the behaviour


// Mention trigger message to enter  feedback



 ### Introduction to Project :- 
 
 - In today’s world, mental health issues faced are more than ever Our website aims towards addressing these issues and giving its users the best help possible with their issues like depression, anxiety, etc.,

 - The website allows users to be completely anonymous and chat with professionals about their feelings and the issues they are facing. Users are also shown a feed that consists of posts , pictures and quotes which are motivational and happy in nature to help them lighten the mood. It is completely up to the users if they want to keep their connections or not.


GITHUB REPOSITORY LINK -  https://github.com/chetan-plrch/CS546-Final-Project

### Contributors
1. Pooja Mule
2. Chetan Jain
3. Sachin Devangan
4. Chandra Vamsi Reddy

Start Script to run on different machines -
```
1. WINDOWS  - scripts": {
    "start": "react-scripts --openssl-legacy-provider start",}

2. MAC-OS  - scripts": {
"start-mac": "export PORT=3000 && react-scripts start"}
```
```
 To install the necessary dependencies for this project, please run the command "npm install."

 To start the express server, please use the command "npm run server."

 To start the react app, use the command "npm start."
```

```
To populate the database run the seed file using command 

"npm run seed"
```


Dependencies used in our project - 
```
{
  "name": "cs546-final-project",
  "version": "1.0.0",
  "type": "module",
  "description": "CS546 Final Project",
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/style": "^0.8.0",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.11.16",
    "@mui/joy": "^5.0.0-alpha.76",
    "@mui/material": "^5.12.3",
    "axios": "^1.3.6",
    "bad-words": "^3.0.4",
    "bcrypt": "^5.1.0",
    "cookie-parser": "^1.4.6",
    "express": "^4.18.2",
    "express-xss-sanitizer": "^1.1.6",
    "js-cookie": "^3.0.4",
    "jsonwebtoken": "^9.0.0",
    "mongodb": "^5.1.0",
    "nodemon": "^2.0.22",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-infinite-scroll-component": "^6.1.0",
    "react-material-ui-carousel": "^3.4.2",
    "react-router-dom": "^6.10.0",
    "react-scripts": "4.0.3",
    "react-toastify": "^9.1.2",
    "socket.io": "^4.6.1",
    "socket.io-client": "^4.6.1",
    "xss": "^1.0.14"
  },
  "scripts": {
    "start": "react-scripts --openssl-legacy-provider start",
    "seed": "node seed.js",
    "start-mac": "export PORT=3000 && react-scripts start",
    "server": "nodemon server/app.js",
    "build": "react-scripts build",
    "test": "export PORT=3000 && react-scripts start &",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/chetan-plrch/CS546-Final-Project.git"
  },
  "author": "Section C- Group 33",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/chetan-plrch/CS546-Final-Project/issues"
  },
  "devDependencies": {
    "@faker-js/faker": "^7.6.0",
    "eslint": "^7.11.0",
    "eslint-config-airbnb": "^19.0.4",
    "eslint-plugin-import": "^2.27.5",
    "eslint-plugin-jsx-a11y": "^6.7.1",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "node-fetch": "^3.3.1"
  }
}
```

 - If you encounter any issues with the login or signup process, we recommend clearing your cookies. To do so, please follow these steps: open the "Inspect" menu select "Application," and then remove the cookies.

 For testing our APIs, it's important to have a Cookie named "TOKEN" with a JWT Token value. Please refer to the attached screenshot as an example.
 
 token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU3ZWIwYzg1NmMzZjgzNTYzY2IwZTEiLCJ1c2VybmFtZSI6ImJ5YWt1Z2FudXNlciIsImZpcnN0TmFtZSI6IkhpbmF0YSIsImlhdCI6MTY4MzY2NzMwNH0.pXs-bzu6qmdA0LOad5qJXslvV2YZJud8l2PNVeOlN5U



- ### Core Features :-
    1. Homepage - 
    2. Roles and categories
    3. Search, list, and filter users
    4. Show user's connections and chats
    5. Real time chat feature
    6. User Feedback
    7. Block/Unblock users
    8. User Profile
    9. Deactivate account

    

- ### Extra Features :-
 1. Journaling - + sign button at the bottom of every page is the feature
 2. Like, comment, save posts
 3. Archive/Unarchive chats


The workflow of the project involves several steps that users will follow when using the platform.

   - Login and Sign-up: When the user starts the React app, they will be taken to the login page. From there, they can either log in or sign up for a new account. If  it's their first time on the platform, they can move to the sign-up page by clicking the "Don't have an account? Register" link.

   - Sign-up page: On the sign-up page, users will be prompted to provide their personal information, such as their username, first name, last name, and email address. They will also be asked to choose a password. If they prefer to remain anonymous, they can select the "Stay Anonymous" checkbox.

   - Role selection: Users will be asked to select their role on the platform. They can either be a "Listener" or a "Seeker." A Seeker is a user who is seeking advice and guidance from a Listener, who is a professional with experience in a particular field.

   - Homepage: Once users have created an account and logged in, they will be taken to the homepage. The homepage features a feed section, which includes motivational posts, quotes, and images. Users can like, comment on, or save these posts. There is also a Reviews section where users can view ratings and optional descriptions of Listeners, which will help them find the most appropriate Listener for their needs.

   - Navigation: The homepage also includes a navigation bar that directs users to additional pages. These pages include "Listeners," "Connections," and "Feedback."

   - Profile: Users can access their profile page by clicking on their profile picture. On the profile page, they can edit all their personal information, including their anonymity preferences. They can also deactivate or permanently delete their account. Users can view blocked users and unblock them if desired.

   - Listeners: If the user is a Seeker, they can access the Listeners page to view a list of available professionals. By selecting a Listener, a chat pop-up window appears, allowing the user to send messages. The chat window includes options to block or archive conversations. Archived chats can be accessed by clicking "Show Archived Chats."

   - Connections: Users can view all the chats they have connected with from every page, making it easy to track their conversations with Listeners.

   - Feedback: Users can access the Feedbacks page to view their submitted feedback for Listeners. They can edit their feedback, including ratings and descriptions. Users can also choose to make their feedback public by selecting the "isPublic" checkbox. Public feedback appears on the homepage's Reviews section, visible to all users.

Overall, this workflow is designed to make it easy for users to find the right Listener for their needs and to facilitate productive conversations between Seekers and Listeners.

