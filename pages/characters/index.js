/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Pagination from '../../components/paginationCharacters'
import SearchInput from "../../components/SearchInputCharacters";
import Modal from "../../components/ModalCharacters";

const myLoader = ({ src }) => {
  return `${src}`;
};

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [input, setInput] = useState("");
  const filtered = characters.filter((character) => {
    return character.name.toLowerCase().startsWith(input.toLowerCase());
  });
  const [showModal, setShowModal] = useState(false);
  const [offset, setOffset] = useState (0);
  const [text, setText] = useState("");

  useEffect(() => {
    axios
      .get("http://gateway.marvel.com/v1/public/characters", {
        params: {
          ts: 1663771025,
          apikey: "bcfa5f43859aa2f23851ac8cc226aed6",
          hash: "68bcb07559b6cc1799e18c9a1644f418",
          limit: 15,
          offset:0,
        },
      })
      .then((response) => {
        console.log(response.data.data.results);
        setCharacters(response.data.data.results);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className=" min-h-screen wppCharacters md:px-32 px-4 flex flex-col ">
      <h1 className="font-nimbus font-semibold text-center mt-36 md:text-3xl text-xl">Pesquise Pelo Personagem</h1>
      <p className="flex md:w-96 w-80 pt-4 pb-6 mx-auto font-poppins font-medium md:text-sm text-xs text-center text-neutral-500 md:">Aqui você pode encontrar todos os heróis, vilões e todos os personagens da marvel que você pode imaginar :D</p>
      <div className="input-group font-poppins font-normal text-base box h-10 rounded-lg flex md:w-96 w-64 mx-auto bg-transparent border-solid border border-neutral-500">
        <input className="bg-transparent outline-none pl-3 md:w-[326px] w-[198px] md:pr-3  mr-0.5 md:text-[13.5px] text-[12px] " type="text" placeholder="Escreva o nome aqui" onKeyDown={(e) => setInput(e.target.value)} />
        <button className="border-none px-4 flex my-[4.5px] items-center h-7 rounded bg-[#955E73] text-sm" type="button">Ok</button>
      </div>

      <section className="caixa my-12 border-[#955E73]" >
        <div className="py-14 md:mx-12 mx-2 block">
          <ul className="lista gap-x-20 gap-y-12 list-none flex justify-center flex-wrap" >
            {filtered.map((character) => {
              return (
                <li
                  className="card flex relative items-end overflow-hidden"
                  key={character.id}
                  onClick={() => setShowModal(true)}
                >
                  <div className="bg-[#955E73] absolute z-10 text-sm truncate max-card text-center w-full p-2 rounded-bl-lg rounded-br-lg">
                    {character.name}
                  </div>
                  <Image
                    width="150"
                    height="230"
                    loader={myLoader}
                    className="imgCard rounded-lg object-cover"
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                </li>
              );
            })}
          </ul>
        </div>
         <Pagination 
         className=""
        limit={15} 
        total={1500} 
        offset={offset} 
        setOffset={setOffset}/> 
          </section>  
      <Modal show={showModal} onClose={() => setShowModal(false)}>oii</Modal>
    </main>
  );
}
