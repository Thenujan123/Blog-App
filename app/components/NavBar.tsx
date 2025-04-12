"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
const NavBar = () => {
  const { status, data: session } = useSession();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    if (!isVisible) {
      document.removeEventListener("click", handleClickOutSide);
    }
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [isVisible]);
  return (
    <nav className="relative flex justify-between items-center pb-6 border-b-1 border-slate-400">
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
            <div
              ref={popupRef}
              className={`absolute z-30 right-0 top-20 bg-white p-6 shadow-lg rounded-md flex flex-col gap-2 text-right min-w-[160px] ${
                isVisible ? "flex" : "hidden"
              }`}
            >
              <h2>{session.user?.email}</h2>
              <Link
                onClick={() => setIsVisible(false)}
                className="hover:underline"
                href={"/dashboard"}
              >
                Dashboard
              </Link>
              <Link
                onClick={() => setIsVisible(false)}
                className="hover:underline"
                href={"/create-post"}
              >
                Create Post
              </Link>
              <h2 className="font-bold">{session.user?.name}</h2>
              <div>
                <button
                  className="px-3 py-1 rounded bg-slate-400 cursor-pointer font-semibold"
                  onClick={() => signOut()}
                >
                  sign Out
                </button>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="hidden md:flex gap-2 items-center ">
                <IoMdAddCircleOutline className="text-2xl" />
                <Link
                  href={"/create-post"}
                  className="font-semibold capitalize text-blue-950"
                >
                  create new
                </Link>
              </div>
              <Image
                src={session.user?.image || ""}
                alt="profile"
                width={36}
                height={36}
                className="rounded-[50%] cursor-pointer"
                onClick={() => setIsVisible((prev) => !prev)}
              />
            </div>
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
