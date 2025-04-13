import React from "react";
import { categoriesData } from "../../data";
import Link from "next/link";
import axios from "axios";
import { TCategory } from "@/types";
const getCategories = async (): Promise<{ categories: TCategory[] } | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`);
    if (res.ok) {
      const categoies = await res.json();
      return categoies;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};
const CategoriesList = async () => {
  const categoies = await getCategories();
  console.log(categoies);

  return (
    <div className="mt-3 flex gap-2.5">
      {categoies &&
        categoies.categories.length > 1 &&
        categoies.categories.map((catagory) => (
          <Link
            className="px-3 py-1 bg-black rounded text-white"
            key={catagory.id}
            href={`/catagories/${catagory.catName}`}
          >
            {catagory.catName}
          </Link>
        ))}
    </div>
  );
};

export default CategoriesList;
