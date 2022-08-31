import { getProviders, signIn } from "next-auth/react";
import Header from "../../components/Header";
import Image from "next/image";

export default function SignIn({ providers }) {
  return (
    <>
      <Header />
      <div className=" flex justify-center items-center mt-[10rem]">
        <div className="flex flex-col w-[25rem] h-[30rem] border-2 items-center p-5 justify-center gap-7">
          <Image
            className=""
            src="http://links.papareact.com/ocw"
            width="300"
            height="100"
            objectFit="contain"
          />
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="text-[1.5rem] bg-pink-400 p-4 rounded-lg"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
