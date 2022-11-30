import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import Image from "next/image";
import CloseButton from "../public/assets/CloseBtn.svg";
import Card from "../public/assets/Card.svg";
import Link from "next/link";

const myLoader = ({ src }) => {
  return `${src}`;
};

export default function Modal({ show, onClose, character }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, [character]);

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

            <div className="pl-20 pt-16 flex space-x-36">
            <Link href="/">
              <a className="">Quadrinho</a>
            </Link>
            <Link href="/">
              <a className="">Série</a>
            </Link>
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
