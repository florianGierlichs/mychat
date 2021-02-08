# mychat

This is a simple chat application. It provides multiple chatrooms with separate chat histories.
To enter the chatrooms, you have to signup with a username and password.

This project was initialized with

```
npx create-next-app --example with-typescript with-typescript-app
```

Checkout other Next.js examples [here](https://github.com/vercel/next.js/tree/canary/examples)

## Tech stack

-   [Next.js](https://nextjs.org/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [socket.io](https://socket.io/)
-   [MongoDB](https://www.mongodb.com/)
-   [JWT](https://jwt.io/)
-   [bcrypt](https://www.npmjs.com/package/bcrypt)

## Development

Feel free to clone the repo.
You will need a connection to a database and a secret-key to validate the authorization via JWT. Dont forget to add this credentials in an .env file.
You also need a node version 14+.

```
npm install
```

```
// .env file

DB_CONNECTION=XXX
DB_NAME=XXX
SECRET_KEY=XXX
```

```
// run development server on http://localhost:3000/
npm run dev
```

## License

MIT
