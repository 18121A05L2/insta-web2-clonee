import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HiOutlinePaperAirplane, HiPaperAirplane } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsChatDots, BsBookmark, BsEmojiSmile } from "react-icons/bs";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase.js";
import Moment from "react-moment";

export default function Post({ user, realPost }) {
  const [comment, setComment] = useState();
  const { data: session } = useSession();
  const [fetchedComments, setFetchedComments] = useState();
  const [commentStoring, setCommentStoring] = useState(false);
  // console.log(fetchedComments);
  const [likes, setLikes] = useState();
  const [hasLiked, setHasLiked] = useState(false);
  // realPost && console.log("hasliked : ", hasLiked, "user id :", user.id);
  async function handleComment(e) {
    setCommentStoring(true);
    e.preventDefault();
    await addDoc(collection(db, "posts", user.id, "comments"), {
      comment: comment,
      username: session?.user?.username,
      timestamp: serverTimestamp(),
      userimage: session?.user?.image,
    });
    setComment("");
    setCommentStoring(false);
  }

  useEffect(() => {
    setHasLiked(
      likes?.findIndex((like) => like?.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  {
    realPost &&
      useEffect(() => {
        const unsubscribe = onSnapshot(
          query(
            collection(db, "posts", user?.id, "comments"),
            orderBy("timestamp", "desc")
          ),
          (snapshot) => {
            setFetchedComments(snapshot?.docs);
            // console.log(snapshot.docs, "comments ❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥");
          }
        );
        return unsubscribe;
      }, [db, user?.id]);
  }

  {
    realPost &&
      useEffect(() => {
        const unsubscribe = onSnapshot(
          collection(db, "posts", user?.id, "likes"),
          (snapshot) => {
            setLikes(snapshot?.docs);
            // console.log(snapshot.docs, "❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥❤️‍🔥");
          }
        );
        return unsubscribe;
      }, [db, user?.id]);
  }

  async function handleLikes() {
    if (!realPost) return;
    console.log("updating likes...");

    if (hasLiked) {
      likes && console.log("deleting likes");
      likes &&
        (await deleteDoc(
          doc(db, "posts", user?.id, "likes", session?.user?.uid)
        ));
      console.log("likes deleted");
      console.log("total like ", likes);
    } else {
      await setDoc(doc(db, "posts", user?.id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
      console.log("likes added");
      console.log("total like ", likes);
    }
  }

  return (
    <div className="border rounded-sm my-6 p-4 bg-white ">
      {/*top*/}
      <div className="flex justify-between px-4 items-center py-2 m-1">
        <div className="flex items-center gap-4">
          <Image
            className="rounded-full hover:opacity-80   "
            src={user?.avatar || user?.data()?.userimage}
            width="50"
            height="50"
            objectFit="contain"
          />
          <p className="font-bold text-[1.3rem]">{user?.username}</p>
        </div>

        <p className="text-[2rem]">...</p>
      </div>

      <Image
        className="object-cover w-full "
        src={user?.avatar || user?.data()?.postimage}
        width="800"
        height="500"
        objectFit="contain"
      ></Image>
      {/*likes*/}
      <div className="flex justify-between my-2">
        <div className="flex gap-8 ">
          {" "}
          {hasLiked ? (
            <AiFillHeart
              onClick={handleLikes}
              className={"posticons text-red-500"}
            />
          ) : (
            <AiOutlineHeart onClick={handleLikes} className={"posticons"} />
          )}
          <BsChatDots className="posticons" />
          <HiPaperAirplane className="posticons" />
        </div>

        <div>
          <BsBookmark className="posticons" />
        </div>
      </div>
      {/* like count */}
      {likes?.length > 0 && (
        <p className="font-semibold text-[1.2rem]">
          {likes?.length} Like{likes?.length == 1 ? "" : "s"}
        </p>
      )}
      {/* caption */}
      <div className="flex gap-4 py-4 items-center">
        <span className="font-bold text-[1.4rem]">
          {user?.username || user?.data()?.username}
        </span>
        <p className="truncate">{user?.text || user?.data()?.caption}</p>
      </div>
      {/* displaying comments */}

      {realPost && fetchedComments && (
        <div className=" h-20 m-2 p-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-black border">
          {fetchedComments?.map((comment) => (
            <div
              key={comment?.id}
              className="flex justify-between items-center "
            >
              <div className="flex items-center gap-4 m-2">
                <Image
                  className="rounded-full"
                  src={comment?.data()?.userimage}
                  width="40"
                  height="40"
                  objectFit="contain"
                />
                <p className="font-bold text-[1.3rem]">
                  {comment?.data()?.username}
                </p>
                <p>{comment?.data()?.comment}</p>
              </div>
              <Moment fromNow className="mr-5">
                {comment?.data()?.timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* writing comments */}

      {realPost && (
        <form className="flex  items-center justify-between">
          <div className="flex gap-4">
            {" "}
            <BsEmojiSmile className="posticons" />
            <input
              className="text-[1.4rem] outline-none"
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target?.value)}
              placeholder="..comment"
            />
          </div>

          <button
            onClick={handleComment}
            disabled={!comment || commentStoring}
            className="mr-[3rem] text-[1.4rem] font-semibold text-blue-400"
            type="submit"
          >
            {commentStoring ? "posting" : "post"}
          </button>
        </form>
      )}
    </div>
  );
}
