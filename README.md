# Friends List App

## Project Details

This is my first Node App. It is a basic friend list generator using Node, Express, and MongoDB.

### Things to know

Npm packages needed are :

- body-parser
- ejs
- express
- mongoose

This is a basic Express app structure, using Mongoose. There is a friendSchema established, providing a framework for friend info.

The root route finds all friends in the database and renders them to the friends.ejs page. Clicking on the friend's name will take you to their about page, where you can see all of their info. From there, you can click the 'update info' button which will take you to the /update route. Friend.find is used to load the friend's information into the update form. Once the form is submitted, body-parser is used to collect the data sent in the request to save it to the database, using Friend.update(). This same process is used when adding a new friend, but using Friend.create().

Friends can also be deleted from the list by using the delete button. You are prompted to confirm this decision, preventing a user from accidentally deleting a friend.

The app will run on either the process.env.PORT of the server, or localhost://3000 on your local machine.
