/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Layout from '../components/Layout';

const Draft = () => {
  // State defines the types for our state items (string)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  // const [itemName, setItemName] = useState('');

  const router = useRouter();

  /*  const addCat = (event) => {
    event.preventDefault();
    setCategory([
      ...category,
      {
        id: category.length,
        name: itemName,
      },
    ]);
    setItemName('');
  }; */

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log('Save');
    try {
      const body = { title, content, category };

      await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log(body);
    } catch (error) {
      console.error(error);
    }
    router.push('/drafts');
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <label htmlFor="title">
            Title
            <input
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
            />
          </label>
          <label htmlFor="category">
            Category
            <input
              name="category"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              value={category}
            />
          </label>
          <label htmlFor="content">
            Content
            <textarea
              name="content"
              cols={96}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={4}
              value={content}
            />
          </label>
          <input disabled={!content || !title} type="submit" value="Create" />
          <Link href="/">Delete draft</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Draft;
