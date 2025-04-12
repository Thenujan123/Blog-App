"use client";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { categoriesData } from "@/data";
import { FaLink } from "react-icons/fa6";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
const CreatePostForm = () => {
  const [link, setLink] = useState<string[]>([]);
  const [inputLink, setInputLink] = useState("");
  const addLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setLink((prev) => [...prev, inputLink]);
    setInputLink("");
  };
  const DeleteLink = (index: any) => {
    const newLinks = link.filter((l, i) => i !== index);
    setLink(newLinks);
  };
  return (
    <div className="w-full  p-5 shadow-2xl pt-10">
      <h2 className="text-2xl font-bold capitalize mt-5 pb-7">Create Post</h2>
      <form className="w-full flex flex-col gap-3">
        <TextField label="Title" variant="outlined" fullWidth size="small" />
        <TextField
          label="Content"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
        />
        <div className="flex flex-col gap-2">
          {link &&
            link.map((lk, i) => (
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
            name=""
            id=""
            className="w-full border border-slate-300 p-3 rounded appearance-none outline-none bg-slate-400 text-white mb-8"
          >
            <option value="select The catagory">select The catagory</option>
            {categoriesData &&
              categoriesData.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <Button
          variant="contained"
          fullWidth
          color="success"
          className="w-full px-3 py-2 text-white cursor-pointer rounded outline-none border-none mt-8"
        >
          {" "}
          Create Post
        </Button>
        <p className="p-2 text-red-500 font-bold text-lg"> Error</p>
      </form>
    </div>
  );
};

export default CreatePostForm;
