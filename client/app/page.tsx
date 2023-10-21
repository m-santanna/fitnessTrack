import Navbar from "./components/Navbar";
interface User {
  id: number;
  username: string;
}

export default async function Home() {
  return (
    <>
      <header className="flex">
        <Navbar />
      </header>
      <main>
        <h1>hello world</h1>
      </main>
    </>
  );
}
