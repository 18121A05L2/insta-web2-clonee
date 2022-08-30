import React from 'react'
import Image from 'next/image';

export default function MiniProfile() {
  return (
    <div className="fixed flex gap-6 bg-white p-4">
      <Image
        className="rounded-full hover:opacity-80 flex-shrink-0 "
        src="http://links.papareact.com/3ke"
        width="50"
        height="50"
        objectFit="contain"
          /> 
          <div>
              <span className="font-bold text-[1.3rem]">lucky</span>
              <h1>Welcome to Instagram</h1>
          </div>
          <button className="font-bold text-blue-500">signout</button>
    </div>
  );
}
