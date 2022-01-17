import { ApiError, User } from "@supabase/supabase-js";
import { NextApiRequest, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  LinkBtn,
  WalletConnectBtn,
  WalletDeleteBtn,
} from "../components/Buttons";
import Loader from "../components/Loader";
import fetchWallet from "../utils/fetchWallet";
import getUserByCookie from "../utils/getUserByCookie";
import discordToWalletConnection from "../utils/ifcDiscordtoWalletConnection";
import { supabase } from "../utils/supabaseClient";

interface IfcProfilePageProps {
  user: User;
  error: ApiError;
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  // TODO: for some reason this function returns null (only in production) regardless of the fact that the user is authenticated
  // I tried rebuilding it myself, to no avail. The issue, I've no idea what it is at this point...
  const { user, error } = await supabase.auth.api.getUserByCookie(req);
  console.log("user:", user);
  // if the user is not logged in I want to redirect him to the home page from the server side
  if (!user) {
    console.log("server side - user doesn't exist");
    return { props: { user } };
  }
  console.log("server side - props were fetched");
  return { props: { user, error } };
}

const Profile: NextPage<IfcProfilePageProps> = ({
  user,
  error,
}: IfcProfilePageProps) => {
  console.log("USER:", user);
  console.log("ERROR:", error);
  const [wallet, setWallet] = useState<discordToWalletConnection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setWallet(await fetchWallet());
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    console.log("USER:", user);
    return <>!user</>;
  }

  return (
    <div>
      <Head>
        <title>Your Profile</title>
        <meta
          name="description"
          content="A page to connect your discord account to your wallet."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <form>
          <div className="space-y-6">
            <div>
              <h1 className="text-lg leading-6 font-medium text-gray-900">
                Your profile
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                You can see your profile and connect your wallet in here.
              </p>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Photo (from Discord)
              </label>
              <div className="mt-1 text-sm text-gray-500">
                <Image
                  className="inline-block h-12 w-12 rounded-full"
                  height={48}
                  width={48}
                  src={user.user_metadata.avatar_url}
                  alt="Your profile image sourced from Discord"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <div className="mt-1 text-sm text-gray-500">
                {user.user_metadata.full_name}
              </div>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 text-sm text-gray-500">{user.email}</div>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <div className="mt-1 text-sm text-gray-500">{user.id}</div>
            </div>

            <div>
              <label
                htmlFor="project-name"
                className="block text-sm font-medium text-gray-700"
              >
                Discord ID
              </label>
              <div className="mt-1 text-sm text-gray-500">
                {user.user_metadata.provider_id}
              </div>
            </div>

            {wallet ? (
              <div>
                <label
                  htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Wallet Address
                </label>
                <div className="mt-1 text-sm text-gray-500">
                  {wallet.wallet_address}
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="flex justify-end">
              {wallet ? (
                <>
                  <LinkBtn
                    to={process.env.NEXT_PUBLIC_DISCORD_SERVER_URL || "/"}
                    extraClasses="mr-2"
                  >
                    Go to our discord
                  </LinkBtn>
                  <WalletDeleteBtn />
                </>
              ) : (
                <WalletConnectBtn />
              )}
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
