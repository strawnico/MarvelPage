import { useState, useEffect } from "react";
import ReactDom from "react-dom";
import styles from "../styles/Modal.module.css";
import Image from "next/image";

const myLoader = ({ src }) => {
  return `${src}`;
};

export default function Modal({ show, onClose, comic }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, [comic]);

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
        <div>
          {comic.title}
        </div>
        <Image
          width="150"
          height="230"
          loader={myLoader}
          className="rounded-lg object-cover"
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
        />
        <div className="py-1">{comic.description}</div>
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
