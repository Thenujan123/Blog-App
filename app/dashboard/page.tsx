import { postsData } from "@/data";
import React from "react";
import PostPage from "../components/PostPage";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/sign-in");
  }
  return (
    <div>
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
        <p className="mt-10 font-medium">
          No Posts Created yet.{" "}
          <Link
            href={"/create-post"}
            className="underline capitalize text-blue-800"
          >
            create new
          </Link>
        </p>
      )}
    </div>
  );
};

export default page;
