import React from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function Suggestions({ USERS }) {
  // console.log(USERS.slice(0, 5));
  USERS = USERS.slice(0, 5);
  return (
    <div className="col-span-1 fixed bg-white mt-[5rem] w-[21.92rem] p-4 overflow-y-scroll  scrollbar-thumb-gray-800 scrollbar-track-gray-100 scrollbar-thin">
      <div className="flex justify-between mb-2 ">
        <p className="text-[1.1rem] text-gray-500 font-bold">
          Suggestions For u
        </p>
        <p className="text-[1.1rem] "> see all</p>
      </div>
      <div>
        {USERS.map((user) => (
          <div key={uuidv4()} className="flex items-center gap-4 py-2">
            {" "}
            <Image
              className="rounded-full hover:opacity-80 "
              src={user?.avatar}
              width="50"
              height="50"
              objectFit="contain"
            />
            <div>
              <p>{user?.username}</p>
              <p className="text-gray-500">{user?.text?.substring(0, 20)}...</p>
            </div>
            <p className="text-blue-500 font-bold ml-auto">Follow</p>
          </div>
        ))}
      </div>
    </div>
  );
}
