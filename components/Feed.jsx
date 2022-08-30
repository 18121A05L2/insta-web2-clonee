import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import Suggestions from "./Suggestions";
import { faker } from "@faker-js/faker";
import MiniProfile from "./MiniProfile"

export const USERS = [];

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    text: faker.lorem.text(),
  };
}

Array.from({ length: 10 }).forEach(() => {
  USERS.push(createRandomUser());
});

export default function Feed() {
  return (
    <div className="flex justify-center  mx-auto mt-4">
      <section className="flex flex-col w-screen xl:max-w-[50rem] ">
        <Stories USERS={USERS} />
        <Posts USERS={USERS} />
      </section>
      <section className="hidden xl:inline-flex mx-4">
        <MiniProfile />
        <Suggestions USERS={USERS} />
      </section>
    </div>
  );
}
