import Image from "next/image";
import React, { useRef, useState } from "react";
import { FiCamera } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ModalContent() {
  const filePickerRef = useRef(null);
  const [caption, setCaption] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  console.log(
    "loading",
    loading,
    "selectedfile",
    Boolean(selectedFile),
    "caption",
    caption
  );

  function addImageToPost(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (readerEvent) => {
        setSelectedFile(readerEvent?.target?.result);
        console.log(selectedFile);
      };
    }
  }

  async function uploadPostToFirebase() {
    if (loading) return;

    setLoading(true);
    // adding post to the firestore
    const docRef = await addDoc(collection(db, "posts"), {
      username: session?.user?.username,
      userimage: session?.user?.image,
      caption: caption || "No caption",
      timestamp: serverTimestamp(),
    });
    // getting post document id
    console.log("post added with id " + docRef.id);
    // getting url and updaing the postimage
    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    // uploading file to storage
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        console.log("post image ur :", downloadURL);
        updateDoc(doc(db, "posts", docRef?.id), {
          postimage: downloadURL,
        });
      }
    );
    console.log("post updated with id " + docRef?.id);
    setLoading(false);
      setSelectedFile(null);
      setCaption(null);
    //   router.push("/")    need to add addPost linkage to the plus icon
  }

  return (
    <div className="flex flex-col gap-7 justify-between items-center">
      {selectedFile ? (
        <div className="flex justify-between ">
          <BiArrowBack
            onClick={() => setSelectedFile(null)}
            className=" text-[2.5rem] cursor-pointer p-2"
          />
          <Image src={selectedFile} width={200} height={200} />
        </div>
      ) : (
        <div className="flex flex-col justify-between items-center ">
          <FiCamera
            onClick={() => filePickerRef.current.click()}
            className="text-[5rem] bg-red-200 p-4 rounded-lg cursor-pointer hover:scale-110 transition-all duration-300"
          />
          <input
            className="file:border-none file:bg-blue-500 file:py-2 file:px-5 file:mr-3  file:hover:rounded-lg file:rounded-lg pb-4 cursor-pointer file:hover:scale-110"
            type="file"
            ref={filePickerRef}
            hidden
            onChange={addImageToPost}
          ></input>
          <span className="font-semibold text-[1.3rem] pt-4">
            Upload a Photo
          </span>
        </div>
      )}

      <input
        onChange={(e) => setCaption(e.target.value)}
        className="outline-none text-[1.3rem] text-center hover:ring-2 p-1 ring-blue-200"
        type="text"
        placeholder="Please enter a caption"
      ></input>
      <button
        disabled={!selectedFile || !caption || loading}
        onClick={uploadPostToFirebase}
        className="text-[1.3rem] font-bold bg-red-400 p-2 px-4 rounded-lg cursor-pointer hover:scale-110 transition-all duration-300 disabled:bg-red-100 "
      >
        {loading ? "uploading..." : "Upload Post"}
      </button>
    </div>
  );
}
