# Course Service

This project is built on top of NodeJS with ExpressJS and TypeScript. Please ensure that you have Node installed with version >= 20.

## Instruction to set up

Please ensure that you have obtained the necessary **environmental variables** from the code owner. These include:

```
POSTGRESQL_DB_URL = <REPLACE_WITH_THE_ACTUAL_VALUE>
```

Then, to set up the assignment service locally, do the following:

1. Run `yarn` or `yarn install` to install all the necessary dependencies
2. To start the server in dev mode, simply run `yarn dev`.
3. To start the server in prod mode, run `yarn build` follow by `yarn start`.

After that, you may proceed to making API requests using Postman or any other agent tools as your choice. The server will start running on **port 8080** locally.
