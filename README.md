# Application Management System

## Quick Start

- clone the `dev` branch
- run `npm install`

- copy `.env.sample` as `.env` (so it will be ignored by git) and update with your environment variables into `.env`
- if Sequelize can't access your database url, enter the following in your terminal:

  ```
  export DATABASE_URL=postgres://username:password@address:5432/database
  ```

- use [Elephantsql](https://elephantsql.com/) for an easy Postgres database
- migrate database: `npx sequelize db:migrate`
- seed database: `npx sequelize db:seed:all` (Note: Submission seed may not work, ignore for now)

- to start in dev mode, `npm run devstart`
