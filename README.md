# mychat :speech_balloon:

This is a simple chat application. It provides multiple chatrooms with separate chat histories.
To enter the chatrooms, you have to signup with a username and password.
Your password get`s hashed and salted multiple times and wont get saved in plaintext. :no_good:

Feel free to join:

The site may need some time to rebuild, if it`s in sleep mode :sleepy:

## https://mychat-awesome.herokuapp.com/

This project was initialized with :computer:

```
npx create-next-app --example with-typescript with-typescript-app
```

Checkout other Next.js examples [here](https://github.com/vercel/next.js/tree/canary/examples)

## Tech stack

-   [Next.js](https://nextjs.org/) :fire:
-   [TypeScript](https://www.typescriptlang.org/) :zap:
-   [Emotion](https://emotion.sh/docs/styled) :nail_care:
-   [socket.io](https://socket.io/) :satellite:
-   [MongoDB](https://www.mongodb.com/) :open_file_folder:
-   [JWT](https://jwt.io/) :exclamation:
-   [bcrypt](https://www.npmjs.com/package/bcrypt) :cop:

## Development :floppy_disk:

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

## Happy Coding :kissing_heart:
