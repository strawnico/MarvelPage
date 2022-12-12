/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Image from "next/image";
import CloseButtonSerie from "../public/assets/CloseBtnSerie.svg";
import etiquetaVerde from "../public/assets/etiquetaVerde.svg";
import Link from "next/link";
import axios from "axios";
const myLoader = ({ src }) => {
  return `${src}`;
};

export default function Modal({ show, onClose, serie }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, [serie]);

  const handleClose = (event) => {
    event.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <section className="fixed top-0 left-0 w-full h-full flex content-center items-center bg-center bg-black bg-opacity-70">
    <div className="WppModalSerie w-5/6 max-w-3xl rounded-2xl m-auto h-[500px] bg-[#171717] z-50">
      <div className="flex justify-end text-2xl text-white">
        <a href="#" onClick={handleClose} className=" mt-2 mr-3">
          <Image src={CloseButtonSerie} alt="Close" />
        </a>
      </div>
      <div className="center pl-10 pb-10 flex">
        <Image
          width="220"
          height="400"
          loader={myLoader}
          className="rounded-lg object-cover"
          src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
          alt={serie.title}
        />
        <div className="flex-col ml-6">
          <Image src={etiquetaVerde} alt="Card" />
          <h1 className="pt-4 py-1 font-semibold inter text-2xl">
            {serie.title}
          </h1>
          <div className="pb-20 max-h-28 min-h-[128px]">
            {serie.description == "" || serie.description == null ? (
              <p className="py-1 font-light text-stone-400 text-sm max-w-md">
                *Essa história em quadrinhos não possui descrição*
              </p>
            ) : (
              <p className="font-light text-stone-400 text-sm max-w-md">
                {serie.description}
              </p>
            )}
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
