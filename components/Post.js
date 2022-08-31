import React from "react";
import Image from "next/image";
import { HiOutlinePaperAirplane, HiPaperAirplane } from "react-icons/hi";
import { AiOutlineHeart } from "react-icons/ai";

import { BsChatDots, BsBookmark, BsEmojiSmile } from "react-icons/bs";

export default function Post({ user }) {
  return (
    <div className="border rounded-sm my-6 p-4 bg-white ">
      {/*top*/}
      <div className="flex justify-between px-4 items-center py-2 m-1">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full hover:opacity-80   "
            src={user.avatar || user.data().userimage}
            width="50"
            height="50"
            objectFit="contain"
          />
          <p className="font-bold text-[1.3rem]">{user.username}</p>
        </div>

        <p className="text-[2rem]">...</p>
      </div>

      <Image
        className="object-cover w-full "
        src={user.avatar || user.data().postimage }
        width="800"
        height="500"
        objectFit="contain"
      ></Image>
      {/*likes*/}
      <div className="flex justify-between my-2">
        <div className="flex gap-8 ">
          {" "}
          <HiPaperAirplane className="posticons" />
          <BsChatDots className="posticons" />
          <AiOutlineHeart className="posticons" />
        </div>

        <div>
          <BsBookmark className="posticons" />
        </div>
      </div>
      {/* caption */}
      <div className="flex gap-4 py-4 items-center">
        <span className="font-bold text-[1.4rem]">{user.username || user.data().username}</span>
        <p className="truncate">{user.text || user.data().caption}</p>
      </div>
      {/* comments */}

      <form className="flex  items-center justify-between">
        <div className="flex gap-4">
          {" "}
          <BsEmojiSmile className="posticons" />
          <input
            className="text-[1.4rem] outline-none"
            type="text"
            placeholder="..comment"
          />
        </div>

        <button className="mr-[3rem] text-[1.4rem] font-semibold" type="submit">
          post
        </button>
      </form>
    </div>
  );
}
