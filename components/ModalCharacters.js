/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Image from "next/image";
import CloseButton from "../public/assets/CloseBtn.svg";
import Card from "../public/assets/Card.svg";
import Link from "next/link";
import axios from "axios";

const myLoader = ({ src }) => {
  return `${src}`;
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
        `http://gateway.marvel.com/v1/public/characters/${character.id}/${tabSelected}`,
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
    <section className="fixed top-0 left-0 w-full h-full flex content-center items-center bg-center bg-black bg-opacity-70">
      <div className="WppModal w-5/6 max-w-3xl rounded-2xl m-auto h-[500px] bg-[#171717] z-50">
        <div className="flex justify-end text-2xl text-white">
          <a href="#" onClick={handleClose} className=" mt-2 mr-3">
            <Image src={CloseButton} alt="Close" />
          </a>
        </div>
        <div className="center px-10 pb-10 flex">
          <Image
            width="220"
            height="400"
            loader={myLoader}
            className="rounded-lg object-cover "
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className="flex-col ml-6">
            <Image src={Card} alt="Card" />
            <h1 className="pt-4 py-1 font-semibold inter text-2xl">
              {character.name}
            </h1>
            <div>
              {character.description == "" ? (
                <p className="py-1 font-light text-stone-400 text-sm max-w-md">
                  *Esse personagem não possui descrição*
                </p>
              ) : (
                <p className="py-1 font-light text-stone-400 text-sm max-w-md">
                  {character.description}
                </p>
              )}
            </div>

            <div className="pl-16 pt-16">
              <div className="flex gap-36">
                <button onClick={() => setTabSelected("comics")}>
                  Quadrinhos
                </button>
                <button onClick={() => setTabSelected("series")}>Séries</button>
              </div>
              {tabSelected == "comics"
                ? comics.map((comic) => {
                    return (
                      <div className="flex">
                        <div key={comic.id} className="flex-col flex cursor-pointer">
                          <Image
                            width="100"
                            height="150"
                            loader={myLoader}
                            className="object-cover"
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt={comic.title}
                          />
                        </div>
                      </div>
                    );
                  })
                : series.map((serie) => {
                    return (
                      <div key={serie.id}>
                        <Image
                          width="150"
                          height="230"
                          loader={myLoader}
                          className="rounded-lg object-cover"
                          src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                          alt={serie.title}
                        />
                      </div>
                    );
                  })}
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
