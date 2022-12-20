/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Image from "next/image";
import CloseButton from "../public/assets/CloseBtn.svg";
import etiquetaRosa from "../public/assets/etiquetaRosa.svg";
import Link from "next/link";
import axios from "axios";

const myLoader = ({ src }) => {
  const srcReplace = src.replace('http', 'https')
  return `${srcReplace}`;
};


export default function Modal({ show, onClose, character }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [tabSelected, setTabSelected] = useState("comics");
  const [comics, setComics] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    setIsBrowser(true);
  }, [character]);

  useEffect(() => {
    if (!character.id) return;
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${character.id}/${tabSelected}`,
        {
          params: {
            ts: 1663771025,
            apikey: "bcfa5f43859aa2f23851ac8cc226aed6",
            hash: "68bcb07559b6cc1799e18c9a1644f418",
            limit: 100,
            offset: 0,
          },
        }
      )
      .then((response) => {
        console.log(response.data.data.results);
        if (tabSelected == "comics") setComics(response.data.data.results);
        if (tabSelected == "series") setSeries(response.data.data.results);
      });
  }, [tabSelected, character]);

  const handleClose = (event) => {
    event.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <section  className="z-10 modal fixed top-0 left-0 w-full h-full flex content-center items-center bg-center bg-black bg-opacity-70">
      <div className="WppModal WppModalSem w-5/6 max-w-3xl rounded-2xl m-auto h-[500px] bg-[#171717] z-50">
        <div className="flex justify-end text-2xl text-white">
          <a href="#" onClick={handleClose} className="mt-2 mr-3">
            <Image src={CloseButton} alt="Close" />
          </a>
        </div>
        <div className="center pl-10 pb-10 flex">
          <Image
            width="220"
            height="400"
            loader={myLoader}
            className="rounded-lg object-cover"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className="flex-col ml-6">
            <Image src={etiquetaRosa} alt="Card" />
            <h1 className="pt-4 py-1 font-semibold inter text-2xl">
              {character.name}
            </h1>
            <div className="pb-20 max-h-28 min-h-[128px]">
              {character.description == "" ? (
                <p className="py-1 font-light text-stone-400 text-sm max-w-md">
                  *Esse personagem não possui descrição*
                </p>
              ) : (
                <p className="font-light text-stone-400 text-sm max-w-md">
                  {character.description}
                </p>
              )}
            </div>

            <div className="quadrinhos/series transition">
              <div className="flex pb-3 relative max-w-[385px]">
                <button
                  onClick={() => setTabSelected("comics")}
                  className={`rounded-xs px-[52px] py-1 ${
                    tabSelected == "comics"
                      ? "text-white font-medium border-b-2 border-neutral-600 "
                      : "text-neutral-500 font-normal border-b-2 border-neutral-600 focus:bg-[#6565653d]"
                  }`}
                >
                  Quadrinhos
                </button>
                <button
                  onClick={() => setTabSelected("series")}
                  className={`rounded-xs px-[73px] py-1 ${
                    tabSelected == "series"
                      ? "text-white font-medium border-b-2 border-neutral-600 "
                      : "text-neutral-500 font-normal border-b-2 border-neutral-600 focus:bg-[#6565653d]"
                  }`}
                >
                  Séries
                </button>
                <div
                  className={` transition bg-[#955E73] h-1 w-1/2 z-10 absolute bottom-3 ${
                    tabSelected == "series" ? "tabLeft" : "tabRight"
                  }`}
                ></div>
              </div>

              <div className="flex gap-6 flex-wrap overflow-auto max-h-36 max-w-sm">
                {tabSelected == "comics"
                  ? comics.map((comic) => {
                      return (
                        <ul>
                          <li
                            className="card flex relative cursor-pointer items-end overflow-hidden"
                            key={character.id}
                          >
                            <div className="bg-neutral-600 absolute z-10 text-white text-xs truncate max-card text-center w-full p-2 ">
                              {comic.title}
                            </div>
                            <Link href="/comics">
                              <Image
                                width="100"
                                height="150"
                                loader={myLoader}
                                className="object-cover"
                                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                                alt={comic.title}
                              />
                            </Link>
                          </li>
                        </ul>
                      );
                    })
                  : series.map((serie) => {
                      return (
                        <ul>
                          <li
                            className="card flex relative items-end cursor-pointer overflow-hidden"
                            key={character.id}
                          >
                            <div className="bg-neutral-600 absolute z-10 text-white text-xs truncate max-card text-center w-full p-2 ">
                              {serie.title}
                            </div>
                            <Link href="/series">
                              <Image
                                width="100"
                                height="150"
                                loader={myLoader}
                                className="object-cover"
                                src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                                alt={serie.title}
                              />
                            </Link>
                          </li>
                        </ul>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
