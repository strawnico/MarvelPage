/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Pagination from "../../components/pagination";
import ModalComics from "../../components/ModalComics";
import Head from "next/head";

const myLoader = ({ src }) => {
  const srcReplace = src.replace('http', 'https')
  return `${srcReplace}`;
};

export default function Comics() {
  const [comics, setComics] = useState([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalComic, setModalComic] = useState({});
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = (comic) => {
    setModalComic(comic);
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);
    if (input == "") {
      axios
        .get("https://gateway.marvel.com/v1/public/comics", {
          params: {
            ts: 1663771025,
            apikey: "bcfa5f43859aa2f23851ac8cc226aed6",
            hash: "68bcb07559b6cc1799e18c9a1644f418",
            limit: 100,
            offset: 0,
          },
        })
        .then((response) => {
          setCount(response.data.data.count);
          setComics(response.data.data.results);
          setLoading(false);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
    if (input) {
      axios
        .get("https://gateway.marvel.com/v1/public/comics", {
          params: {
            ts: 1663771025,
            apikey: "bcfa5f43859aa2f23851ac8cc226aed6",
            hash: "68bcb07559b6cc1799e18c9a1644f418",
            limit: 100,
            offset: 0,
            titleStartsWith: input,
          },
        })
        .then((response) => {
          setCount(response.data.data.count);
          setComics(response.data.data.results);
          setLoading(false);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  }, [input]);

  return (
    <div>
      <Head>
        <title>MarvelNic</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/logo.png" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <main className=" min-h-screen wppHqs md:px-32 px-4 flex flex-col ">
        <h1 className="font-nimbus font-semibold text-center mt-36 md:text-3xl text-xl">
          Pesquise Pela hist??ria
        </h1>
        <p className="flex md:w-96 w-80 pt-4 pb-6 mx-auto font-poppins font-medium md:text-sm text-xs text-center text-neutral-500 md:">
          Aqui voc?? pode encontrar todas as hist??rias em quadrinhos de todos os
          personagens da marvel!
        </p>
        <div className="input-group b-input-blue font-poppins font-normal text-base box h-10 rounded-lg flex md:w-96 w-64 mx-auto bg-transparent border-solid border-2 border-neutral-500">
          <input
            className=" bg-transparent placeholder:text-neutral-400 outline-none pl-3 md:w-[326px] w-[198px] md:pr-3  mr-0.5 md:text-[13.5px] text-[12px] "
            type="text"
            placeholder="Escreva o nome aqui"
            onChange={(e) => setInput(e.target.value)}
          />
          <span className=" material-icons text-1xl m-auto text-neutral-500">
            search
          </span>
        </div>
        <section className="w-full  my-12">
          <div className="py-14 md:mx-12 mx-2 block">
            <ul className="lista gap-x-20 gap-y-12 list-none flex justify-center flex-wrap">
              {loading ? (
                <div className=" text-white">Carregando...</div>
              ) : (
                comics.slice(offset, offset + 15).map((comic) => {
                  return (
                    <section key={comic.id} className="behind">
                      <div className="cardComics">
                        <li
                          className=" card cursor-pointer opacity-60 flex relative items-end overflow-hidden"
                          key={comic.id}
                          onClick={() => handleOpenModal(comic)}
                        >
                          <div className="bg-[#5E9595] absolute z-10 text-sm truncate max-card text-center w-full p-2 rounded-bl-lg rounded-br-lg">
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
                        </li>
                      </div>
                    </section>
                  );
                })
              )}
            </ul>
          </div>
          {comics && (
            <Pagination
              className=""
              limit={15}
              total={count}
              offset={offset}
              setOffset={setOffset}
            />
          )}
        </section>
        <ModalComics
          show={showModal}
          comic={modalComic}
          onClose={() => setShowModal(false)}
        ></ModalComics>{" "}
      </main>
    </div>
  );
}
