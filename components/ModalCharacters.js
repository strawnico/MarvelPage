import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import styles from "../styles/Modal.module.css";
import Image from "next/image";
import CloseButton from "../public/assets/CloseBtn.svg";
import Parede from "../public/assets/Parede.png";

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
      <div className={`WppModal w-5/6 max-w-3xl ${styles.modal}`}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <Image
              loader={myLoader}
              className=""
              src={CloseButton}
              alt="Close"
            />
          </a>
        </div>
        <div className="py-1">{character.name}</div>
        <Image
          width="220"
          height="300"
          loader={myLoader}
          className="rounded-lg object-cover"
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <div className="py-1 pl-20">{character.description}</div>
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
