"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";
const NavBar = () => {
  const { status } = useSession();
  return (
    <nav className="flex justify-between items-center pb-6 border-b-1 border-slate-400">
      <div>
        <Link
          href={"/"}
          className="capitalize text-4xl font-bold text-indigo-800"
        >
          Tech News
        </Link>
        <p>exploring tomorrow's innovations,</p>
        <h4>One Byte at a Time</h4>
      </div>
      <div>
        {status == "authenticated" ? (
          <div>
            <button
              className="px-3 py-1 rounded bg-slate-400 cursor-pointer font-semibold"
              onClick={() => signOut()}
            >
              sign Out
            </button>
          </div>
        ) : (
          <Link
            className="px-4 py-2 rounded bg-slate-300 font-semibold cursor-pointer"
            href={"/sign-in"}
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
