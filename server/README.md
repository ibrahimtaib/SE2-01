![Coverage](https://img.shields.io/badge/Coverage-85.36%25-green)
![Total tests](https://img.shields.io/badge/Total%20tests-200-green)
![Passed tests](https://img.shields.io/badge/Passed%20tests-13-red)

# Server implementation of Thesis Managment

To start the server make sure you have Docker Desktop installed. You can find the link and instructions to install it [here](https://www.docker.com/products/docker-desktop/). After installing it make sure you have WSL running on Windows, then navigate to <code>/src/services</code> and execute the following commands

```
npm run docker:init
npm run db:push
npm run db:generate
```

After executing a message should appear indicating that the database is in sync with the Prisma schema. Then navigate back to <code>/src</code> and start the server by executing

```
nodemon server.js
```

or if you do not have nodemon installed

```
node server.js
```

## Useful commands

If you want to explore the database by using a web interface (very useful for creating database mock data) you can use the command

```
npm run db:studio
```

Other useful commands are listed here (courtesy of Ibra):
| Command | Explaination |
|--------------|-----------|
| **db:migrate** | adds the current version of the database to version control (git but for prisma) |
| **db:generate** | Updates the prisma client with the contents of schema.prisma (run it every time you make changes) |
