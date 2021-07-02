import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      postId: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
      category: {
        select: {
          category: true,
        },
      },
      profile: {
        select: {
          bio: true,
        },
      },
    },
  });
  return {
    props: post,
  };
};

// const Post: React.FC<PostProps> = (props) => {

// TODO: Remove FC
const Post = (props: PostProps) => {
  console.log(props);
  const [session, loading] = useSession();
  const router = useRouter();

  async function publishPost(id: number): Promise<void> {
    await fetch(`/api/publish/${id}`, {
      method: 'put',
    }).then(() => {
      router.push('/', undefined, { shallow: true });
    });
  }

  async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: 'delete',
    }).then(() => {
      router.push('/', undefined, { shallow: true });
    });
  }

  const userHasValidSession = Boolean(session);

  // TODO
  const postBelongsToUser = session?.user?.email === props.author?.email;

  let { title } = props;

  console.log(props);

  if (!props.published) {
    title = `${title} (Draft)`;
  }

  if (loading) {
    return <div>Authenticating ...</div>;
  }

  return (
    <Layout>
      <div>
        <span>{props.category.category}</span>
        <h2>{title}</h2>
        <p>By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown>{props.content}</ReactMarkdown>
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button type="button" onClick={() => publishPost(props.postId)}>
            Publish
          </button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button type="button" onClick={() => deletePost(props.postId)}>
            Delete
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Post;
