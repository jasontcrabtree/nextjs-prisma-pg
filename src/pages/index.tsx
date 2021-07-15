import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import Post, { PostProps } from '../components/Post';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

// TODO: Remove FC
const Blog: React.FC<Props> = ({ feed }) => (
  <Layout>
    <section>
      <h1>Public Feed</h1>
    </section>
    <section>
      {feed
        .slice(0)
        .reverse()
        .map((post) => (
          <div key={post.postId}>
            <Post post={post} />
          </div>
        ))}
    </section>
  </Layout>
);

export default Blog;
