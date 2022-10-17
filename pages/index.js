import Link from "next/link";

export default function App() {
  return (
    <div className="main md:py-60 mx-12 md:block">
      <h1 className="font-nimbus font-bold text-4xl" >Bem vindo</h1>
      <p className="text-sm"> Aqui você vai poder encontrar todos os dados que a API da marvel <br/> fornece! Como personagens, histórias em quadrinhos, séries, etc.</p>
      <Link href="https://github.com/strawnico">
       <a className="button" target="blank" type="button" >Repositório</a>
      </Link>
    </div>
  );
}