import {useState, useEffect} from "react";
import ReactDom from "react-dom";
import styles from "../styles/Modal.module.css"

const myLoader = ({ src }) => {
    return `${src}`;
  };

export default function Modal({show, onClose}) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleClose = () => {
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
                    seriessss
                </div>
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