"use client";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import { TCategory } from "@/types";
import { useRouter } from "next/navigation";
const CreatePostForm = () => {
  const router = useRouter();
  const [links, setLinks] = useState<string[]>([]);
  const [inputLink, setInputLink] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [err, setErr] = useState("");
  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLinks((prev) => [...prev, inputLink]);
    setInputLink("");
  };
  const DeleteLink = (index: any) => {
    const newLinks = links.filter((l, i) => i !== index);
    setLinks(newLinks);
  };

  useEffect(() => {
    const fethCategories = async (): Promise<{
      categories: TCategory[];
    } | null> => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const categories = await res.json();
        setCategories(categories.categories);
      }
      return null;
    };
    fethCategories();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setErr(" title or Content is Required");
    }
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
          publicId,
          links,
          selectedCategory,
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (error) {}
  };
  return (
    <div className="w-full  p-5 shadow-2xl pt-10">
      <h2 className="text-2xl font-bold capitalize mt-5 pb-7">Create Post</h2>
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          size="small"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex flex-col gap-2">
          {links &&
            links.map((lk, i) => (
              <div className="flex gap-4" key={i}>
                <FaLink />
                <Link href={lk}>
                  <p className="text-blue-800">{lk}</p>
                </Link>
                <FaTrashAlt
                  className="cursor-pointer"
                  onClick={() => DeleteLink(i)}
                />
              </div>
            ))}
        </div>
        <div className="flex w-full gap-4">
          <TextField
            label={"past the link and click on Add"}
            className="flex-1"
            value={inputLink}
            onChange={(e) => setInputLink(e.target.value)}
          />
          <Button
            variant="contained"
            color="info"
            className="px-4"
            startIcon={<IoMdAdd />}
            onClick={addLink}
          >
            Add
          </Button>
        </div>
        <div className="mt-5 w-full">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name=""
            id=""
            className="w-full border border-slate-300 p-3 rounded appearance-none outline-none bg-slate-400 text-white mb-8"
          >
            <option value="select The catagory">select The catagory</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category.id} value={category.catName}>
                  {category.catName}
                </option>
              ))}
          </select>
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="success"
          className="w-full px-3 py-2 text-white cursor-pointer rounded outline-none border-none mt-8"
        >
          {" "}
          Create Post
        </Button>
        {err && <p className="p-2 text-red-500 font-bold text-lg"> {err}</p>}
      </form>
    </div>
  );
};

export default CreatePostForm;
