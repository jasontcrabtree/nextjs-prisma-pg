import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';
import { PostProps } from '../components/Post';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      authorId: 2,
    },
  });
  return { props: { feed } };
};

type Props = {
  feed: PostProps[];
};

// TODO: Remove FC
const Profile: React.FC<Props> = ({ feed }) => {
  console.log(feed);
  return (
    <Layout>
      <section>
        <h1>Test</h1>
      </section>
      <section>
        {feed.map((fee) => (
          <div key={fee.id}>{fee.title}</div>
        ))}
      </section>
    </Layout>
  );
};

export default Profile;
