import React from "react";
import CategoriesList from "./components/CategoriesList";
import PostPage from "./components/PostPage";
import { postsData } from "@/data";

const page = () => {
  return (
    <div>
      <CategoriesList />

      {postsData && postsData.length > 0 ? (
        postsData.map((post) => {
          return (
            <PostPage
              key={post.id}
              id={post.id}
              author={post.author}
              authorEmail={"thenujan@gmail.com"}
              date={post.datepublished}
              thumbnail={post.thumbnail}
              category={post.category}
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
