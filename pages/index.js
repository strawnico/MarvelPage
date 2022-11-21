import Link from "next/link";

export default function App() {
  return (
    <div className="main wppHome md:py-60 py-36 md:px-12 md:block">
      <h1 className="font-nimbus font-bold md:text-4xl md:text-start text-center text-2xl" >Bem vindo</h1>
      <p className="md:text-sm md:text-start text-center text-xs md:w-1/4 md:px-0 px-20 "> Aqui você vai poder encontrar todos os dados que a API da marvel fornece! Como personagens, histórias em quadrinhos, séries, etc.</p>
      <div className="md:text-start text-center">
      <Link href="https://github.com/strawnico/MarvelPage">
       <a className=" border-solid border-2 cursor-pointer text-white rounded-lg mt-8 md:py-2 py-1 md:px-10 px-4 md:text-base text-sm" target="blank" type="button" >Repositório</a>
      </Link>
      </div>
    </div>
  );
}