import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";

export function AnuncioForm({ anuncioId = null, descripcion_init = '' }) {

  const isEditing = !!anuncioId;

  async function handleAnuncio(formData) {
    'use server';

    const descripcion = formData.get('descripcion');

    if (isEditing) {
      await prisma.anuncio.update({
        where: { id: anuncioId },
        data: { descripcion }
      });
    } else {
      await prisma.anuncio.create({
        data: {
          descripcion,
          author_id: 1
        }
      });
    }

    revalidatePath('/');
    redirect('/');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={"bg-[#6366f1] hover:bg-[#4f46e5] text-white"}>{isEditing ? "Editar Anuncio" : "Crear Anuncio"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleAnuncio}>
          <DialogHeader >
            <DialogTitle> {isEditing ? "Editar Anuncio" : "Nuevo Anuncio"} </DialogTitle>
          </DialogHeader>
          <div className="grid max-w-sm items-center gap-1.5 sm:py-6">
            <Textarea id="descripcion" name="descripcion" defaultValue={descripcion_init} />
          </div>
          <DialogFooter>
            <Button type="submit">{isEditing ? "Actualizar" : "Publicar!"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}