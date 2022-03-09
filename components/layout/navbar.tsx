import { PlusCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import React, { useContext } from "react";
import AuthContext from "utils/context";
import Search from "./search";

export const Navbar = () => {
  const { logout, authenticated, user } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="text-2xl font-bold text-white">
        <Link href="/">ANNONCE 242</Link>
      </div>
      <Search />
      <Link href="/offres/create">
        <button className="add-button">
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          Déposer Une Annonce
        </button>
      </Link>
      {user ? (
        <>
          <Link href="/profile">
            <a className="flex items-center focus:ring-indigo-400 py-2 px-4 rounded-xl bg-white text-indigo-500 shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              {user.username}
            </a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/auth">
            <button className="flex items-center h-10 px-3 bg-white  hover:bg-gray-50 text-indigo-500  rounded-lg shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Se Connecter
            </button>
          </Link>
        </>
      )}
    </nav>
  );
};
