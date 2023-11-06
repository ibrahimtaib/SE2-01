<h1> How to start the database </h1>
Make sure to copy the .env-example file in the file services/.env, and change the user and password.
Run the following commands if it's the first time, or if you've made significant changes to the env or schema.prisma files:

- npm run docker:init
- npm run db:push
- npm run db:generate

<h1> Explication </h1>
Here's an explication of the npm scripts (you run them by using npm run < script name >)

- docker:init : Launches the postgres database
- db:generate : Updates the prisma client with the contents of schema.prisma (run it every time you make changes)
- db:push : pushes schema.prisma changes to the database
- db:migrate : adds the current version of the database to version control (git but for prisma)
- db:studio : launches graphical user interface of the database (very useful)
