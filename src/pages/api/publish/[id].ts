/*
This is the implementation of an API route handler which retrieves the ID of a Post from the URL and then uses Prisma Client's update method to set the published field of the Post record to true.
*/

import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const postId = req.query.id;

  const post = await prisma.post.update({
    where: { postId: Number(postId) },
    data: {
      published: true,
      /*      profile: {
        connect: {
          // todo
          profileId: 2,
        },
      }, */
    },
  });

  res.json(post);
}
