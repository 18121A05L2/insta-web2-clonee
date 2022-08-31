import React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function MiniProfile() {
  const { data: session } = useSession();
  if (!session) return;
  return (
    <div className="fixed flex gap-6 bg-white p-4">
      <Image
        className="rounded-full hover:opacity-80 flex-shrink-0 "
        src={session.user.image}
        width="55"
        height="55"
        objectFit="contain"
      />
      <div>
        <span className="font-bold text-[1.3rem]">{session.user.username}</span>
        <h1>Welcome to Instagram</h1>
      </div>
      <button
        className="font-bold text-blue-500"
        onClick={() => {
          signOut();
          {
            /* { callbackUrl: "/auth/signin" } */
          }
        }}
      >
        signout
      </button>
    </div>
  );
}
