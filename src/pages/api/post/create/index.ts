/*

This code implements the handler function for any requests coming in at the /api/post/ route. The implementation does the following: First it extracts the title and cotent from the body of the incoming HTTP POST request. After that, it checks whether the request is coming from an authenticated user with the getSession helper function from NextAuth.js. And finally, it uses Prisma Client to create a new Post record in the database.

IMPORTANT DETAILS-

- getSession method from next-auth to verify user and associate with user author
- prisma.post is a method on the Post schema type
- prisma.[x].create is a method to create (CRUD) on our database
- pass the result data on the body
- Uses NextJS API route magic

*/

import { getSession } from 'next-auth/client';
import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
  const { title, content, category } = req.body;

  console.log(`The category is ${category}`);

  const session = await getSession({ req });

  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: { connect: { email: session?.user?.email } },
      category: {
        create: {
          category,
        },
      },

      // category: {
      //   create: {
      //     category,
      //   },
      // },

      // category: {
      //   create: [{ categoryName: 'dev' }, { categoryName: 'prisma' }],
      // },
      // creates author of email
      // profile: { connect: { email: session?.user?.email } },
      /* profile: {
        connect: {
          // todo
          profileId: 2,
        },
      }, */
    },
  });
  res.json(result);
}
