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

const styles = {
  icon: "hidden lg:inline-flex text-[3.4rem] hover:scale-[1.15] p-3 active:text-[#bc2a8d] cursor-pointer transition-all ",
};

export default function Header() {
  return (
    <div className="shadow-md sticky top-0 z-50 bg-white">
      <div className="flex justify-between items-center  px-5 sm:px lg:px-[5rem] xl:w-[83rem] xl:mx-auto  ">
        {/*left*/}
        <div className=" hidden lg:inline-flex flex-shrink-0 cursor-pointer">
          <Image
            src="http://links.papareact.com/ocw"
            width="200"
            height="60"
            objectFit="contain"
          />
        </div>
        <div className="lg:hidden flex-shrink-0 cursor-pointer">
          <Image
            src="http://links.papareact.com/jjm"
            width="40"
            height="60"
            objectFit="contain"
          />
        </div>
        {/*middle*/}
        <div className="flex items-center border h-10 p-2 hover:ring-2 hover:border-none gap-2 text-gray-400 hover:text-blue-500 ">
          <AiOutlineSearch className="text-[2rem] " />
          <input
            className="outline-none text-lg  "
            type="text"
            placeholder="search"
          />
        </div>
        {/*right*/}
        <div className="flex items-center gap-4 ">
          <AiOutlineHome className={styles.icon} />
          <HiOutlinePaperAirplane className="hidden lg:inline-flex text-[3.4rem] hover:scale-[1.15] p-3 active:text-[#bc2a8d] cursor-pointer transition-all hover:rotate-45" />
          <AiOutlinePlusCircle className="lg:inline-flex text-[3.4rem] hover:scale-[1.15] p-3 active:text-[#bc2a8d] cursor-pointer transition-all " />
          <HiOutlineUserGroup className={styles.icon} />
          <AiOutlineHeart className={styles.icon} />
          <AiOutlineMenu className="lg:hidden text-[3.4rem] hover:scale-[1.15] p-3 active:text-[#bc2a8d] cursor-pointer transition-all " />
          <Image
            className="rounded-full hover:opacity-80 "
            src="http://links.papareact.com/3ke"
            width="50"
            height="50"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}
