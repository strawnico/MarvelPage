// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable jsx-a11y/anchor-has-content */
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Pagination from '../../components/paginationCharacters'
// import SearchInput from "../../components/SearchInputCharacters";

// const myLoader = ({ src }) => {
//   return `${src}`;
// };

// export default function Characters() {
//   const [characters, setCharacters] = useState([]);
//   const [offset, setOffset] = useState (0);
//   const [text, setText] = useState("");
//   console.log(text);

//   useEffect(() => {
//     axios
//       .get("http://gateway.marvel.com/v1/public/characters", {
//         params: {
//           ts: 1663771025,
//           apikey: "bcfa5f43859aa2f23851ac8cc226aed6",
//           hash: "68bcb07559b6cc1799e18c9a1644f418",
//           limit: 15,
//           offset:0,
//         },
//       })
//       .then((response) => {
//         console.log(response.data.data.results);
//         setCharacters(response.data.data.results);
//       });

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <main className="wppCharacters md:px-32 px-4 flex flex-col ">
//       <p className="text-center mt-36 text-xs">Página de personagens </p>
//       <h1 className="text-center text-3xl">Pesquise Pelo Personagem</h1>
//       <SearchInput value={text} onChange={(search) => setText(search)}
//       />

//       <section className="my-12">
//         <div className=" py-14 md:mx-12 mx-2 block">
//           <ul className="lista gap-x-20 gap-y-12 list-none flex justify-center flex-wrap">
//             {filtered.map((character) => {
//               return (
//                 <li
//                   className="card flex relative items-end overflow-hidden"
//                   key={character.id}
//                 >
//                   <div className="absolute z-10 text-sm truncate max-card text-center w-full p-2 rounded-bl-lg rounded-br-lg">
//                     {character.name}
//                   </div>
//                   <Image
//                     width="150"
//                     height="230"
//                     loader={myLoader}
//                     className="imgCard rounded-lg object-cover"
//                     src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
//                     alt={character.name}
//                   />
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//         {/* <Pagination 
//         limit={15} 
//         total={1500} 
//         offset={offset} 
//         setOffset={setOffset}/>  */}
//       </section>  
//     </main>
//   );
// }