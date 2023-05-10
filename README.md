# Group 33 Final Project
## New Leaf - A mental health domain app
### Team Members
1. Pooja Mule
2. Chetan Jain
3. Sachin Devangan
4. Chandra Vamsi Reddy

### Github repository
https://github.com/chetan-plrch/CS546-Final-Project

 ### Introduction to Project
 
 - In today’s world, mental health issues faced are more than ever. Our website aims towards addressing these issues and giving its users the best help possible with their issues like depression, anxiety, etc.,
 - The website allows users to be completely anonymous if they wish and chat with professionals about their feelings and the issues that they are facing in order to get the help that they need.
 - Users are also shown a feed that consists of posts, pictures and quotes which are motivational and happy in nature to help them uplift their mental state. It is completely up to the users if they want to continue talking to the experts.

## Prerequisite
Prefer using private browsing modes such as `incognito` for `chrome` since the browser plugins cause some unusual intermittent behaviour due to their features
## Steps to execute the application
1. Download the repo from the git repo link https://github.com/chetan-plrch/CS546-Final-Project/tree/develop
2. Please use branch `develop` to clone the repo
3. To download all the dependencies, go to project path and run
`npm install`
4. To add data for testing purposes to the database, run `npm run seed`
5. To run the application <br>
&nbsp;&nbsp;1. On client side, at current path, run `npm start`<br>
&nbsp;&nbsp;2. To start the server, run `npm run server` at</br> 
&emsp;the same location in a new terminal<br>
&ensp; NOTE - If you are facing errors in running client side script on macOS with `npm start` then use `npm start-mac` instead

## Important points to note
1. Adding records to DB through seed file and dropping of database sometimes causes unexpected cookie issues. It is recommented that you clear cookies in such cases. Follow these steps to clear cookies in browser<br>
&emsp;1. Right click in the browser and open inspect menu<br>
&emsp;2. Go to tab `Application`<br>
&emsp;3. Clear cookies from the option provided in this tab
2. `Postman Testing Note` This application uses a key called `token` which stores a JWT token value. To make any authorized requests first, make sure you make the login request first so this cookie gets set. It is not required to send this token in any of the apis
3. User is directed to `login` page when the application is opened in the browser. This page provides a link to `register` if you are a new user 

## Core Features
1. Homepage<br>
&emsp;1. Once user logs in, they are directed to the home page on `Feeds` tab<br>
&emsp;2. This tab consists of a feed which comprises of motivational posts, quotes, pictures<br>
&emsp;3. There is also a tab to navigate to reviews given to different professionals by different users<br>
&emsp;4. Only the reviews which are public are displayed in the `Reviews` tab
2. Roles and categories<br>
&emsp;1.Users can sign up as either listeners (professional helpers) or advice seekers. The sign up flows will be designed accordingly.
3. Search, list, and filter users<br>
&emsp;1.From the home page, users can navigate to the users page.
<br>A list of active users will be displayed.
<br>Users can search and filter this list.

4. Show user's connections and chats<br>
From the home page, users can navigate to connections list. <br>This will show a list of all active connections of users.
<br>Also, a chat list with all connections will be shown.
<br>Chats can be searched through.

5. Real time chat feature<br>
Users can chat with professionals. <br>Messages will be sent in real time.
<br>Users can view all the active chats in pop up windows on all screens.
<br>The chat will have basic profanity checks.

6. User Feedback<br>
After every session ends which in our case its ``5 messages`` which triggers the an optional feedback form which can be either public or private.
<br>Users can fill anonymous surveys within the website to gather feedback about their mental health experiences. <br>This would just be maintained in the database for reference purposes. <br>This could help the site identify areas where it could be improved and provide valuable insights into user needs.

7. Block/Unblock users<br>
 Users can block someone from texting them if they want.
<br>The blocked users will not be shown to the current user anymore.
<br>Users can view a list of blocked users.
<br>They can unblock a user if they wish

8. User Profile
<br>Personal details such as username, email, profile picture and others will be displayed.
<br>Users can edit appropriate details.

9. Deactivate account
<br>Users can choose to delete their account.
<br>Users can specify whether they want to keep their information with the site or delete it. This makes the site more reliable.


## Extra Features
1. Journal
<br>Users can maintain a journal.
<br>They can make notes of how they feel every time they interact with a professional.
<br>This journal will be maintained as a notebook which can be navigated to from the home screen.

2. Like, comment, and save
<br>Users can like/comment on the posts on feed.
<br>They can also save the post.

3. Archive and unarchive chat
<br>Users can choose to archive or unarchive a chat at any point.


