import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase.js";
import Post from "./Post.js";
import { useSession } from "next-auth/react";

export default function Posts({ USERS }) {
  const [userPosts, setUserPosts] = useState();
  const {data: session } = useSession();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setUserPosts(snapshot.docs);
        
      }
    );

    return unsubscribe;
  }, [db]);
  console.log(userPosts);
  return (
    <div className=" ">
      {session && (
        <>
          <h1 className="text-center font-bold text-[2rem] mt-2 py-1 bg-red-300">
            User's data
          </h1>
          {userPosts ? (
            <div>
              {userPosts.map((user) => (
                <Post key={uuidv4()} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center p-10 bg-red-100 text-[1.5rem] my-4"> Post something dude , why waiting</div>
          )}
        </>
      )}

      <div>
        <h1 className="text-center font-bold text-[2rem] mt-2 py-1 bg-red-300">
          Faker's Data
        </h1>
        {USERS.map((user) => (
          <Post key={uuidv4()} user={user} />
        ))}
      </div>
    </div>
  );
}
