import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function addLog (
  name: string, token: string, ip: string
) {
  const log = await prisma.log.create({
    data: {
      nameUser: name,
      tokenUser: token,
      ip: ip || 'Not Found Ip'
    }
  })
  console.log(log, 'log')
}
