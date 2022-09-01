import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase.js";
import Post from "./Post.js";
import { useSession } from "next-auth/react";

export default function Posts({ USERS }) {
  const [userPosts, setUserPosts] = useState();
  const { data: session } = useSession();
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setUserPosts(snapshot.docs);
      }
    );
    return unsubscribe;
  }, [db]);
  // console.log(userPosts);
  return (
    <div className=" ">
      {session && (
        <div>
          <div className="text-center font-bold text-[1.3em] xl:text-[2rem] mt-2 py-0.5 xl:py-1 bg-red-300">
            User's data
          </div>
          {userPosts && (
            <div>
              {userPosts?.map((user) => (
                <Post key={uuidv4()} user={user} realPost={true} />
              ))}
            </div>
            // ) : (
            //   <div className="text-center p-10 bg-red-100 text-[1.5rem] my-4">
            //     {" "}
            //     Post something dude , why waiting
            //   </div>
          )}
          {!userPosts && (
            <div className="text-center p-10 bg-red-100 text-[1.5rem] my-4">
              Post something dude , why waiting
            </div>
          )}
        </div>
      )}

      <div>
        <p className="text-center font-bold text-[1.3rem] xl:text-[2rem] mt-2 py-1 bg-red-300">
          Faker's Data
        </p>
        {USERS?.map((user) => (
          <Post key={uuidv4()} user={user} realPost={false} />
        ))}
      </div>
    </div>
  );
}
