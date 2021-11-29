# 2022 Zendesk Coding Challenge

This project uses React and ExpressJs to display zendesk tickets.

- Uses components structure for displaying tickets using React.
- Displays 25 tickets on each page, pagination is used to navigate to more tickets.
- Each ticket data is displayed.
- Uses .env file to store sensitive information like, username and password to access zendesk domain.
- Runs the server concurrently to serve the endpoints to fetch tickets and ticket by ID information.
- Handles errors and displays actual status text with additional text to make it soft for the end-user.
- Tests are implemented for both React and ExpressJs using JEST.

### Running this project locally

1. Clone the project, change into the directory and install the dependencies.

   ```bash
   git clone https://github.com/AbhinavReddy-Dev/zendeskcc.git
   cd zendeskcc
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

   - You can start the server on its own with the command:

   ```bash
   npm run server
   ```

   - Run the React application on its own with the command:

   ```bash
   npm start
   ```

   - Run both applications concurrently with the command:

   ```bash
   npm run dev
   ```

4. Start tests

- Run react unit tests

```bash
npm run test-react a // For test
npm run test-react a -- --coverage --no-cache // For test coverage
```

- Run server unit tests

```bash
npm run test-node  // For test
npm run test-node -- --coverage --no-cache // For test coverage
```
