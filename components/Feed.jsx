import React, { useEffect } from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import Suggestions from "./Suggestions";
import { faker } from "@faker-js/faker";
import MiniProfile from "./MiniProfile";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export const USERS = [];

export function createRandomUser() {
  return {
    userId: faker.datatype?.uuid(),
    username: faker.internet?.userName(),
    email: faker.internet?.email(),
    avatar: faker.image?.avatar(),
    password: faker.internet?.password(),
    birthdate: faker.date?.birthdate(),
    registeredAt: faker.date?.past(),
    text: faker.lorem?.text(),
  };
}

Array.from({ length: 20 }).forEach(() => {
  USERS.push(createRandomUser());
});

export default function Feed() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex xl:ml-[24rem] mt-2 mx-auto">
      <section className="flex flex-col w-screen max-w-[40rem] xl:max-w-[50rem] ">
        <Stories USERS={USERS} />
        <Posts USERS={USERS} />
      </section>
      {session && (
        <section className="hidden xl:inline-flex mx-4">
          <MiniProfile />
          <Suggestions USERS={USERS} />
        </section>
      )}
    </div>
  );
}
