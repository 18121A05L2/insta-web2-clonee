import React, { useEffect, useState } from "react";
import Image from "next/image";
import Story from "./Story"
import { v4 as uuidv4 } from "uuid";



export default function Stories({USERS}) {
  

  return (
    <div className="h-[9rem] flex gap-4 overflow-x-scroll p-2 bg-white   scrollbar-thumb-gray-800 scrollbar-track-gray-100 scrollbar-thin ">
      {USERS.map((user) => (
        <Story key={uuidv4()} user={user } />
      ))}
    </div>
  );
}
