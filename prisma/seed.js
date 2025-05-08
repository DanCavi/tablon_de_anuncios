import { PrismaClient } from '../generated/prisma/index.js'

const prisma = new PrismaClient()

const userData = [
  {
    username: 'test',
    password: 'test',
    anuncios: {
      create: [
        {
          descripcion: 'Anuncio 2'
        },
        {
          descripcion: 'Anuncio 3'
        }
      ]
    }
  }
]

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u })
  }
}

main()