# NextJS Prisma PostGreSQL Tutorial

`npm run dev` to run dev mode

After cloning repo, run `git remote -v` to check remote origin then `git remote remove origin` to disconnect and reinit with new repo

Following: https://vercel.com/guides/nextjs-prisma-postgres

## Tutorial Technologies

- Next.js as the React framework
- Next.js API routes for server-side API routes as the backend
- Prisma as the ORM for migrations and database access
- PostgreSQL as the database
- NextAuth.js for authentication via GitHub (OAuth)
- TypeScript as the programming language
- Vercel for deployment

##

Because Prisma Client is tailored to your own schema, you need to update it every time your Prisma schema file is changing by running the following command:

`npx prisma generate`

Re: Migrations - https://github.com/prisma/prisma/issues/4571#issuecomment-754650296
Run - `npx prisma db push`
RUN THIS: https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push

## Reference articles

- https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
- https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components
- https://fettblog.eu/typescript-react/components/
- https://nextjs.org/docs/api-reference/next/router
- https://github.com/prisma/prisma/issues/5726

## Prisma.schema research

- Entity Relationship Diagram (ERD) is a graphical representation of entities and their relationships to each other. An entity represents a real world object, a piece of data that we want to model within our database.
- Relationship model example
- **Relationship** | **Notes**
  One-to-One | A User has ONE address
  One-to-Many | A Book has MANY reviews
  Many-to-Many | A user has MANY books and a book has MANY users

## Prisma Key Docs

- Prisma related queries https://www.prisma.io/docs/concepts/components/prisma-client/crud#include-related-records
