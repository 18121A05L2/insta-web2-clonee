import React from "react";
import Image from "next/image";

export default function Story({ user }) {
  return (
    <div className="flex flex-col items-center relative h-[5.5rem] w-[5.5rem] flex-shrink-0  rounded-full border-2 border-white ring ring-red-500 hover:scale-110 transition ease-out  ">
      <Image
        className="rounded-full "
        src={user?.avatar}
        layout="fill"
        objectFit="contain"
      ></Image>
      <p className="absolute -bottom-6 truncate">
        {user?.username?.substring(0, 8)}...
      </p>
    </div>
  );
}
