import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import Post, { PostProps } from '../components/Post';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  // const test = await prisma.user.findMany({
  //   where: {
  //     author: {
  //       author
  //     }
  //   }
  // });

  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

// TODO: Remove FC
const Profile: React.FC<Props> = ({ feed }) => (
  <Layout>
    <section>
      <h1>Public Feed</h1>
    </section>
    <section>
      {feed.map((post) => (
        <div key={post.id}>
          <Post post={post} />
        </div>
      ))}
    </section>
  </Layout>
);

export default Profile;
