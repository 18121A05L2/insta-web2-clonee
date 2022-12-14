import React from "react";
import Story from "./Story";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

export default function Stories({ USERS }) {
  const { data: session } = useSession();

  return (
    <div className=" h-[7rem] xl:h-[9rem] flex gap-4 overflow-x-scroll p-2 px-3 bg-white   scrollbar-thumb-gray-800 scrollbar-track-gray-100 scrollbar-thin ">
      {session && <Story key={uuidv4()} user={session?.user}></Story>}
      {USERS?.map((user) => (
        <Story key={uuidv4()} user={user} />
      ))}
    </div>
  );
}
