import Link from "next/link";
import Head from "next/head";

export default function App() {
  return (
    <div>
      <Head>
        <title>MarvelNic</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/assets/logo.png" />
      </Head>
      <main className="wppHome md:py-60 py-36 md:px-12 md:block">
        <h1 className="font-nimbus font-bold md:text-4xl md:text-start text-center text-2xl">
          Bem vindo
        </h1>
        <p className="md:text-sm md:text-start text-center text-xs md:w-[29%] md:px-0 px-20 ">
          {" "}
          Aqui você pode encontrar as informações de todos personagens da
          marvel! Além disso, encontrará histórias em quadrinhos, séries, e
          outros.
        </p>
        <div className="md:text-start text-center mt-8">
          <Link href="https://github.com/strawnico/MarvelPage">
            <a
              className=" border-solid border-2 cursor-pointer text-white rounded-lg md:py-2 py-1 md:px-10 px-4 md:text-base text-sm"
              target="blank"
              type="button"
            >
              Repositório
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
