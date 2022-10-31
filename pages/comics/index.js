/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const myLoader = ({src}) => {
  return `${src}`;
};

export default function Comics() {
  const [comics, setComics] = useState([]);
  const [input, setInput] = useState("");
  const filtered = comics.filter((comic) => {
    return comic.title.toLowerCase().startsWith(input.toLowerCase());
  });

  useEffect(() => {
    axios
      .get("http://gateway.marvel.com/v1/public/comics", {
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
        setComics(response.data.data.results);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    return (
            <div>
              
              <input onKeyDown={(e) => setInput(e.target.value)} />
        
              <div>
                <ul className="listaCharacters flex justify-center flex-wrap">
                  {filtered.map((comic) => {
                    return (
                      <div key={comic.id}>
                        <li>
                          <h1>{comic.title}</h1>
                          <Image
                            width="200"
                            height="200"
                            loader={myLoader}
                            className="imgCard"
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt={comic.title}
                          />
                        </li>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          );}