import Head from "next/head";
import Board from "../components/Board";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dama-Algorítmica</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>IA. Interface Game</h1>
        <Board />
      </main>

      <footer>Feito com ❤️ por [Alex]</footer>
    </div>
  );
}
