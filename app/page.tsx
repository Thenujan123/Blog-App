import React from "react";
import CategoriesList from "./components/CategoriesList";
import PostPage from "./components/PostPage";
import { TPost } from "@/types";
const getAllPosts = async (): Promise<{ allPosts: TPost[] } | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`);
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {}
  return null;
};
const page = async () => {
  const posts = await getAllPosts();
  return (
    <div>
      <CategoriesList />

      {posts?.allPosts && posts.allPosts.length > 0 ? (
        posts.allPosts.map((post) => {
          return (
            <PostPage
              key={post.id}
              id={post.id}
              author={post.author.name}
              authorEmail={post.authorEmail}
              date={post.createdAt}
              thumbnail={post.imageUrl}
              category={post.catName}
              title={post.title}
              content={post.content}
              links={post.links || []}
            />
          );
        })
      ) : (
        <p className="mt-10 font-bold text-xl">No Post To Display</p>
      )}
    </div>
  );
};

export default page;
