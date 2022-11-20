import {useState, useEffect} from "react";
import ReactDom from "react-dom";
import styles from "../styles/Modal.module.css"
import Image from "next/image";

const myLoader = ({ src }) => {
    return `${src}`;
  };

export default function Modal({show, onClose, character}) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = (event) => {
        event.preventDefault();
        onClose();
    }

    const modalContent = show ? (
        <section className="fixed top-0 left-0 w-full h-full flex content-center items-center bg-center md:px-80 px-5 bg-black bg-opacity-70">
            <div className={styles.modal}>
                <div className={styles.header}> 
                    <a href="#" onClick={handleClose}>
                        <button className="btn">X</button>
                    </a>
                </div>
                <div className="py-1">
                    {character.name}
                </div>
                <Image
                        width="150"
                        height="230"
                        loader={myLoader}
                        className="rounded-lg object-cover"
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                      />
            </div>
        </section>
    ) : null;

    if(isBrowser) {
        return ReactDom.createPortal(
            modalContent,
            document.getElementById("modal-root")
        )
    } else {
        return null;
    }
}