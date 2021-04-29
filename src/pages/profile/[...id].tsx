import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import Post, { PostProps } from '../../components/Post';

type Props = {
  feed: PostProps[];
  // profile: any;
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false, // See the "fallback" section below
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
  });

  // const profile = await prisma.profile.findMany({
  //   where: { authorId: { equals: 2 } },
  // });

  return { props: { feed } };
};

// TODO: Remove FC
const Blog: React.FC<Props> = ({ feed }) => (
  // console.log(profile);

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
export default Blog;
