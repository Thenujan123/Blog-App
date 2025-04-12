import Image from "next/image";
import React from "react";
import ThumbnailPlaceholder from "../../public/thumbnail-placeholder.png";
import Link from "next/link";
import { FaLink } from "react-icons/fa6";
import DeletePost from "./DeletePost";
type PostProps = {
  id: string;
  author: string;
  authorEmail?: string;
  date: string;
  thumbnail?: string;
  category: string;
  title: string;
  content: string;
  links?: string[];
};
const PostPage = ({
  id,
  author,
  authorEmail,
  date,
  thumbnail,
  category,
  title,
  content,
  links,
}: PostProps) => {
  const isEditable = true;
  return (
    <div className="mt-5 h-[90vh] w-[90%] shadow-2xl p-5">
      <div className="w-full h-full">
        <h4>
          Posted by : <span className="font-bold">{author} </span> on {date}
        </h4>
        <div className="w-full h-82">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="thubnail"
              width={1100}
              height={900}
              className="w-full h-full bg-center bg-cover"
            />
          ) : (
            <Image
              src={ThumbnailPlaceholder}
              alt="thubnail_placeholder"
              height={800}
              width={1100}
            />
          )}
        </div>
        <h2 className="mt-4">
          <Link
            className="px-4 py-2 bg-black text-white rounded "
            href={`/categories/${category}`}
          >
            {category}
          </Link>
        </h2>
        <h2 className="mt-5 text-2xl font-bold capitalize">{title}</h2>
        <p className="mt-3">{content}</p>
        <div className="flex flex-col mt-6">
          {links &&
            links.map((link, i) => (
              <Link
                className="flex gap-2 items-center max-w-full overflow-hidden  text-ellipsis"
                key={i}
                href={link}
              >
                <FaLink />
                <h4 className="text-blue-800 font-bold"> {link}</h4>
              </Link>
            ))}
        </div>
        <div>
          {isEditable && (
            <div className="flex gap-6 mt-5">
              <Link
                className="bg-slate-300 text-black px-4 py-2 rounded font-bold cursor-pointer"
                href={`edit-post/${id}`}
              >
                Edit
              </Link>
              <DeletePost />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
