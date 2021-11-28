# zendeskcc

This project uses react on the frontend and expressjs on the backend to display zendesk tickets.

### Using this project

1. Clone the project, change into the directory and install the dependencies.

   ```bash
   git clone https://github.com/AbhinavReddy-Dev/zendeskcc.git
   cd zendeskcc // or the name of the directory you name while cloning
   npm install
   ```

2. Create a `.env` file for environment variables in your server.

   ```bash
   touch .env
   // EXPRESS_PORT
   // USER_NAME
   // PASSWORD
   ```

3. Start the server and react app

   You can start the server on its own with the command:

   ```bash
   npm run server
   ```

   Run the React application on its own with the command:

   ```bash
   npm start
   ```

   Run both applications together with the command:

   ```bash
   npm run dev
   ```

4. Start tests

   Run react unit tests

   ```bash
   npm run test-react
   ```

   Run server unit tests

   ```bash
   npm run test-node
   ```
