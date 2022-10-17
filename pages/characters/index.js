/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const myLoader = ({src}) => {
  return `${src}`;
};

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [input, setInput] = useState("");
  const filtered = characters.filter((character) => {
    return character.name.toLowerCase().startsWith(input.toLowerCase());
  });

  useEffect(() => {
    axios
      .get("http://gateway.marvel.com/v1/public/characters", {
        params: {
          ts: 1663771025,
          apikey: "bcfa5f43859aa2f23851ac8cc226aed6",
          hash: "68bcb07559b6cc1799e18c9a1644f418",
          limit: 100,
          offset: 2,
        },
      })
      .then((response) => {
        console.log(response.data.data.results);
        setCharacters(response.data.data.results);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      
      <input onKeyDown={(e) => setInput(e.target.value)} />

      <div>
        <ul className="listaCharacters flex justify-center flex-wrap">
          {filtered.map((character) => {
            return (
              <div key={character.id}>
                <li>
                  <h1>{character.name}</h1>
                  <Image
                    width="200"
                    height="200"
                    loader={myLoader}
                    className="imgCharacter"
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                  />
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
