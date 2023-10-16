# be_and_fe_task

To run application you need:

1. node version: v18.18.0
2. npm version: 10.2.0

Then you need to:

- <projectRoot> cd backend && npm install - to install node modules

For client you need:

- <projectRoot> cd client && npm install - to install node modules

Then you need to set environment variable named as "mongoDBlink" and setup local database with name "be_and_fe_task" or you can ask for link of my Mongo cloud database.

After env variable is set you can start the project with command:

- <projectRoot> cd client
- npm run dev

This will automatically run client and backend (backend is on port 5000, client is on port 3000).
Whole application is on port 3001.

Data from two given arrays (userPhoneNumberData and userEmailsData) can be found in "prepareDataService.ts". Logic of merging them in one array can be found in file "combineArraysService.ts". For merge them you need to run "http://localhost:5000/add-users-from-given-arrays".

Note: Search by id works in the way that you can go to: "http://localhost:3001/UserDetails/:id". So that mean you don't need to enter this page via user details button, you can directly visit it if you know user id.

Note: If you make some changes on code you can run "npx prettier --write ." in root of project to make pretty code.
