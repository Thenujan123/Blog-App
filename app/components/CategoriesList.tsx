import React from "react";
import { categoriesData } from "../../data";
import Link from "next/link";
const CategoriesList = () => {
  return (
    <div className="mt-3 flex gap-2.5">
      {categoriesData &&
        categoriesData.length > 1 &&
        categoriesData.map((catagory) => (
          <Link
            className="px-3 py-1 bg-black rounded text-white"
            key={catagory.id}
            href={`/catagories/${catagory.name}`}
          >
            {catagory.name}
          </Link>
        ))}
    </div>
  );
};

export default CategoriesList;
