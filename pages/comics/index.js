/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Pagination from '../../components/pagination'
import ModalComics from "../../components/ModalComics";

const myLoader = ({src}) => {
  return `${src}`;
};

export default function Comics() {
  const [comics, setComics] = useState([]);
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [offset, setOffset] = useState (0);
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (input == '') {
      axios
        .get("http://gateway.marvel.com/v1/public/comics", {
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
          setCount(response.data.data.count);
          setComics(response.data.data.results);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
  if (input) {
    axios
        .get("http://gateway.marvel.com/v1/public/comics", {
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
          console.log(response.data.data.results);
          setCount(response.data.data.count);
          setComics(response.data.data.results);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  }, [input]); 


    return (
      <main className=" min-h-screen wppHqs md:px-32 px-4 flex flex-col ">
       <h1 className="font-nimbus font-semibold text-center mt-36 md:text-3xl text-xl">Pesquise Pela história</h1>
       <p className="flex md:w-96 w-80 pt-4 pb-6 mx-auto font-poppins font-medium md:text-sm text-xs text-center text-neutral-500 md:">Aqui você pode encontrar todas as histórias em quadrinhos de todos os personagens da marvel!</p>
       <div className="input-group font-poppins font-normal text-base box h-10 rounded-lg flex md:w-96 w-64 mx-auto bg-transparent border-solid border border-neutral-500">
        <input className="bg-transparent outline-none pl-3 md:w-[326px] w-[198px] md:pr-3  mr-0.5 md:text-[13.5px] text-[12px] " type="text" placeholder="Escreva o nome aqui" onKeyDown={(e) => setInput(e.target.value)} />
        <button className="border-none px-4 flex my-[4.5px] items-center h-7 rounded bg-[#5E9595] text-sm" type="button">Ok</button>
       </div>

       <section className="caixa border-[#5E9595] my-12" >
        <div className="py-14 md:mx-12 mx-2 block">
        <ul className="lista gap-x-20 gap-y-12 list-none flex justify-center flex-wrap" >
                  {comics.slice(offset, offset+15).map((comic) => {
                    return (
                      <li
                      className="card flex relative items-end overflow-hidden"
                      key={comic.id}
                      onClick={() => setShowModal(true)}>
                        <div className="bg-[#5E9595] absolute z-10 text-sm truncate max-card text-center w-full p-2 rounded-bl-lg rounded-br-lg">
                         {comic.title}
                        </div>
                                               
                          <Image
                           width="150"
                           height="230"
                            loader={myLoader}
                            className="imgCard"
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt={comic.title}
                          />        
                        </li>  
                    );
                  })}
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
          <ModalComics show={showModal} onClose={() => setShowModal(false)}></ModalComics>
      </main>
          );}