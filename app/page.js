import { AnuncioForm } from "@/components/AnuncioForm";
import { AnunciosCards } from "@/components/AnunciosCards";
import prisma from "@/lib/prisma";


export default async function Home() {
  const anuncios = await prisma.anuncio.findMany({ orderBy: { id: "desc" } });
  console.log('anuncios: ', anuncios);
  return (
    <div className="container sm:mx-24">
      <div className="flex justify-between sm:p-2">
        <h1>
          Anuncios
        </h1>
        <AnuncioForm />
      </div>
      <div className="grid sm:grid-cols-4 gap-4 ">

      {anuncios.map((anuncio) => (
        <AnunciosCards key={anuncio.id} anuncio={anuncio} />
      ))}
      </div>

    </div>
  );
}
