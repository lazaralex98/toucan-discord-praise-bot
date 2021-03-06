import React, { FunctionComponent } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import {
  DiscordAuthBtn,
  SignOutBtn,
  SlackAuthBtn,
} from "../components/Buttons";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Profile", href: "/profile" },
];

/**
 *
 * @param authenticatedState is the app governed state that tells us wether the user has authenticated with Discord or not
 * @returns a conditionally rendered JSX.Element that is the navbar
 */
const Navbar = ({ authenticatedState }: { authenticatedState: boolean }) => {
  return (
    <Popover>
      <nav
        className="relative max-w-7xl mx-auto flex items-center justify-between py-2 px-4 sm:px-6"
        aria-label="Global"
      >
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="https://toucan.earth/">
              <a className="font-medium text-black hover:opacity-70">
                <span className="sr-only">Toucan</span>
                <img className="h-8 w-auto" src="/toucan-logo.svg" alt="" />
              </a>
            </Link>
            <div className="-mr-2 flex items-center md:hidden">
              <Popover.Button className="bg-gray-200 rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:opacity-70 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="hidden space-x-10 md:flex md:ml-10">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                <a className="font-medium text-black hover:opacity-70">
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="hidden md:flex">
          {authenticatedState ? (
            <SignOutBtn />
          ) : (
            <>
              <DiscordAuthBtn />
              <SlackAuthBtn extraClasses="ml-2" />
            </>
          )}
        </div>
      </nav>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <span className="sr-only">Toucan</span>
                <img className="h-8 w-auto" src="/toucan-logo.svg" alt="" />
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="p-2">
              {authenticatedState ? (
                <SignOutBtn />
              ) : (
                <>
                  <DiscordAuthBtn extraClasses="w-full" />
                  <SlackAuthBtn extraClasses="w-full mt-2" />
                </>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
