# Marvel API 

Welcome to the Marvel API React Integration! This README will guide you through setting up the project and using the API to fetch Marvel superhero data in your React application.

## Setup

1. **Get API Keys**: To use the Marvel API, you need to obtain API keys from the [Marvel Developer Portal](https://developer.marvel.com/). Once you have your keys, create a `.env` file in the root directory of your project and add the following lines:

    ```
    MONGO_CONNECTION=mongodb://localhost:27017/marvel
    MARVEL_API_URL=http://gateway.marvel.com/v1/public/
    MARVEL_AUTORIZATION=ts=timestamp&apikey=your_public_key&hash=your_hash
    ```

    Replace `timestamp`, `your_public_key` and `your_hash` with your actual Marvel API keys.

2. **Install Dependencies**: Run the following command in your terminal to install project dependencies:

    ```
    npm install
    ```

## Running the Project

To start the project, run:

```
npm run start
```

This will launch your React application in development mode. You should now be able to access the application at `http://localhost:3000` in your web browser.

## Testing

The reports of tests are on the folder `tests-reports` but you can run then following the next steps.

### Unit Tests

To run unit tests, use the following command:

```
npm run test
```

This will execute all unit tests in your project.

### Stress Tests

To perform stress testing, use the following command:

```
npm run test-stress
```

This command will simulate stress on the application and help identify potential performance issues.

## Additional Resources

- [Swagger Documentation](https://app.swaggerhub.com/apis-docs/PedroHenriqueLomba/Marvel/1.0.0#/): Detailed documentation on available endpoints.
- Postman examples of making requests to the Marvel API is on the file API Marvel.postman_collection.

I finally rest and watch the sunrise on a grateful universe! 🚀🦸‍♂️
