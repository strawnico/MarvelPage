import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import styles from "../styles/Modal.module.css";
import Image from "next/image";
import axios from "axios";

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
      <div className={`w-5/6 max-w-3xl ${styles.modal}`}>
        <div className={styles.header}>
          <a href="#" onClick={handleClose}>
            <button className="btn">X</button>
          </a>
        </div>
        <div className="py-1">{character.name}</div>
        <Image
          width="150"
          height="230"
          loader={myLoader}
          className="rounded-lg object-cover"
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <div className="py-1">{character.description}</div>
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
