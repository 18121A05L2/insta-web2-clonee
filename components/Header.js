import Image from "next/image";
import React from "react";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlinePlusCircle,
  AiOutlineHeart,
  AiOutlineMenu,
} from "react-icons/ai";
import { HiOutlinePaperAirplane, HiOutlineUserGroup } from "react-icons/hi";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { modalState } from "../atoms/modalState";
import { useRecoilState } from "recoil";

const styles = {
  icon: "hidden lg:inline-flex text-[3.4rem] hover:scale-[1.15] p-3 active:text-[#bc2a8d] cursor-pointer transition-all ",
};

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session, "✅✅✅");

  const [open, setOpen] = useRecoilState(modalState);
  // console.log(open,"🚩🚩")

  return (
    <div className="shadow-md sticky top-0 z-50 bg-white w-full max-w-screen">
      <div className="flex justify-between items-center  px-5  lg:px-[5rem] xl:w-[83rem] xl:mx-auto  ">
        {/*left*/}
        <div
          onClick={() => router.push("/")}
          className=" hidden lg:inline-flex flex-shrink-0 cursor-pointer"
        >
          <Image
            src="http://links.papareact.com/ocw"
            width="200"
            height="60"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="lg:hidden flex-shrink-0 cursor-pointer px-2"
        >
          <Image
            src="http://links.papareact.com/jjm"
            width="40"
            height="60"
            objectFit="contain"
          />
        </div>
        {/*middle*/}
        {session && (
          <div className="flex items-center border h-10 p-2 hover:ring-2 hover:border-none gap-2 text-gray-400 hover:text-blue-500 ">
            <AiOutlineSearch className="text-[2rem] " />
            <input
              className="outline-none text-lg  "
              type="text"
              placeholder="search"
            />
          </div>
        )}

        {/*right*/}
        <div className="flex items-center gap-4 ">
          <AiOutlineHome
            onClick={() => router.push("/")}
            className={styles?.icon}
          />

          {session ? (
            <div className="flex items-center gap-4 ">
              <HiOutlinePaperAirplane className="hidden lg:inline-flex text-[3.4rem] hover:scale-[1.15] p-3 active:text-[#bc2a8d] cursor-pointer transition-all hover:rotate-45" />
              <AiOutlinePlusCircle
                onClick={() => setOpen(true)}
                className="lg:inline-flex text-[3.4rem] hover:scale-[1.15] p-3 active:text-[#bc2a8d] cursor-pointer transition-all "
              />
              <HiOutlineUserGroup className={styles?.icon} />
              <AiOutlineHeart className={styles?.icon} />
              <AiOutlineMenu className="lg:hidden text-[3.4rem] hover:scale-[1.15] p-3 active:text-[#bc2a8d] cursor-pointer transition-all " />
              <Image
                className="rounded-full hover:opacity-80 cursor-pointer flex-shrink-0 "
                src={session?.user?.image}
                width="50"
                height="50"
                objectFit="contain"
                onClick={() => {
                  signOut();
                  {
                    /* { callbackUrl: "/auth/signin" } */
                  }
                }}
              />
            </div>
          ) : (
            <button className="text-[1.2rem] " onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
}
