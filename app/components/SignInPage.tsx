import React from "react";
import { IoLogoGithub } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
const SignInPage = () => {
  return (
    <div className="flex justify-center pt-20">
      <div className="w-[50%] h-[100%] shadow-2xl p-5 rounded flex flex-col gap-10">
        <h1 className="text-center text-4xl capitalize font-bold mt-14">
          sign In
        </h1>
        <div className="mx-auto flex items-center p-4 w-50%] border-1 border-slate-300 rounded-[50px] gap-10 cursor-pointer">
          <IoLogoGithub className="text-4xl" /> <h4>SignIn With GitHub</h4>
        </div>
        <div className="mx-auto flex items-center p-4 w-50%] border-1 border-slate-300 rounded-[50px] gap-10 cursor-pointer">
          <FcGoogle className="text-4xl" /> <h4>SignIn With Google</h4>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
