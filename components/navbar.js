/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Navbar() {
  const [navbarActive, setNavbarActive] = useState(false);
  const [navbar, setNavbar] = useState (false);

  const router = useRouter();

  const changeBg = () => {
    if(window.scrollY >= 80){
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  }

  if ( typeof window !== "undefined") {
    window.addEventListener('scroll', changeBg)
  }

  return (
    <nav className={navbar ? "navbar active w-full fixed background-image" : "w-full fixed" }>
      <div className="justify-between px-3 mx-auto md:flex">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:px-3 md:block">
            <Link href="/">
              <a className="text-3xl font-bebas">MarvelNic</a>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbarActive(!navbarActive)}
              >
                {navbarActive ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 md:block md:pb-0 md:mt-0 ${
              navbarActive ? "block" : "hidden"
            }`}
          >
            <ul className="mt-5 items-center justify-center md:flex md:space-x-10 md:px-7">
              <li>
                <Link href="/">
                <a className={router.pathname == "/" ? "transition duration-80 text-white" : "text-zinc-500 transition duration-80 hover:text-white"}>Home</a>
                  </Link>
              </li>
              <li>
                <Link href="/characters">
                <a className={router.pathname == "/characters" ? "transition duration-80 text-white" : "text-zinc-500 transition duration-80 hover:text-white"}>Personagens</a>
                  </Link>
              </li>
              <li>
                <Link href="/comics">
                <a className={router.pathname == "/comics" ? "transition duration-80 text-white" : "text-zinc-500 transition duration-80 hover:text-white"}>Quadrinhos</a>
                </Link>
              </li>
              <li >
                <Link href="/series">
                <a className={router.pathname == "/series" ? "transition duration-80 text-white" : "text-zinc-500 transition duration-80 hover:text-white"}>Séries</a>
                  </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
