import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { AnuncioForm } from "./AnuncioForm"
import { Button } from "./ui/button"

export function AnunciosCards({ anuncio }) {
  async function deleteAnuncio() {
    'use server';
    await prisma.anuncio.delete({ where: { id: anuncio.id } });

    revalidatePath('/');
    redirect('/');
  }


  return (
    <Card className={"h-full flex flex-col justify-between bg-white shadow-sm border border-[#e5e7eb]"}>
      <CardHeader className={"flex justify-end pt-2 pr-2"}>
        <CardDescription className={"text-sm text-[#6b7280] "}>
          {new Date(anuncio.created_at).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className={"flex items-center justify-center text-center flex-1 text-[#111827]"}>{anuncio.descripcion}</CardContent>
      <CardFooter className={"flex justify-end gap-2"}>

        <AnuncioForm anuncioId={anuncio.id} descripcion_init={anuncio.descripcion} />
        <Button onClick={deleteAnuncio} className={"bg-red-500 hover:bg-red-600 text-white"}>X</Button>
      </CardFooter>
    </Card>
  )
}