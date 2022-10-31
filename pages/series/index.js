/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const myLoader = ({src}) => {
  return `${src}`;
};

export default function Series() {

    const [series, setSeries] = useState([]);
    const [input, setInput] = useState("");
    const filtered = series.filter((serie) => {
      return serie.title.toLowerCase().startsWith(input.toLowerCase());
    });
  
    useEffect(() => {
      axios
        .get("http://gateway.marvel.com/v1/public/series", {
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
          setSeries(response.data.data.results);
        });
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
  

    return (
        <div>
              
        <input onKeyDown={(e) => setInput(e.target.value)} />
  
        <div>
          <ul className="listaCharacters flex justify-center flex-wrap">
            {filtered.map((serie) => {
              return (
                <div key={serie.id}>
                  <li>
                    <h1>{serie.title}</h1>
                    <Image
                      width="200"
                      height="200"
                      loader={myLoader}
                      className="imgCard"
                      src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                      alt={serie.title}
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