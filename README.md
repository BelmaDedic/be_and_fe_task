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

Note: If you make some changes on client side you can run "npx prettier --write ." to make pretty code.
