/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Image from "next/image";
import CloseButtonComic from "../public/assets/CloseBtnComic.svg";
import etiquetaAzul from "../public/assets/etiquetaAzul.svg";
import Link from "next/link";
import axios from "axios";

const myLoader = ({ src }) => {
  return `${src}`;
};

export default function Modal({ show, onClose, comic }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [tabSelected, setTabSelected] = useState("comics");

  useEffect(() => {
    setIsBrowser(true);
  }, [comic]);

  useEffect(() => {
    if (!comic.id) return;
    axios
      .get(`http://gateway.marvel.com/v1/public/comics/${comic.id}`, {
        params: {
          ts: 1663771025,
          apikey: "bcfa5f43859aa2f23851ac8cc226aed6",
          hash: "68bcb07559b6cc1799e18c9a1644f418",
          limit: 100,
          offset: 0,
        },
      })
      .then((response) => {
        console.log(response.data.data.results);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (event) => {
    event.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <section className="z-10 modal fixed top-0 left-0 w-full h-full flex content-center items-center bg-center bg-black bg-opacity-70">
      <div className="WppModalComic WppModalSem w-5/6 max-w-3xl rounded-2xl m-auto h-[500px] bg-[#171717] z-50">
        <div className="flex justify-end text-2xl text-white">
          <a href="#" onClick={handleClose} className=" mt-2 mr-3">
            <Image src={CloseButtonComic} alt="Close" />
          </a>
        </div>
        <div className="center pl-10 pb-10 flex">
          <Image
            width="220"
            height="400"
            loader={myLoader}
            className="rounded-lg object-cover"
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt={comic.title}
          />
          <div className="flex-col ml-6 ">
            <Image src={etiquetaAzul} alt="Card" />
            <h1 className=" max-w-md pt-4 py-1 font-semibold inter text-2xl">
              {comic.title}
            </h1>
            <div className="pb-20 max-h-28">
              <div className="flex flex-wrap overflow-auto max-h-52 max-w-md">
                {comic.description == "" || comic.description == null ? (
                  <p className="py-1 font-light text-stone-400 text-sm max-w-md">
                    *Essa história em quadrinhos não possui descrição*
                  </p>
                ) : (
                  <p className=" font-light text-stone-400 text-sm max-w-md">
                    {comic.description}
                  </p>
                )}
              </div>
              <div className="font-light text-white text-sm max-w-md mt-2">
                {comic.creators.items[0] ? (
                  <div className="border-[1px] border-[#5E9595] max-w-fit p-2 rounded-sm">
                    <span className="font-semibold">Criadores:</span>{" "}
                    <span className="text-stone-400">
                      {comic.creators.items.map((item) => item.name).join(", ")}
                    </span>
                  </div>
                ) : (
                  <p className="border-[1px] border-[#5E9595] max-w-fit p-2 rounded-sm text-stone-400"> Criador não disponível</p>
                )}
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
