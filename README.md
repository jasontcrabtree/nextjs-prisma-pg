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

## Reference articles
- https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
- https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components
- https://fettblog.eu/typescript-react/components/
- https://nextjs.org/docs/api-reference/next/router