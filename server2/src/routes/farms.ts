import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function farmRoutes(app : FastifyInstance) {
    app.get('/farms', async () => {
        const farms = await prisma.farm.findMany()

        return farms.map((farm) => {
            return{
                id: farm.id,
                proprietar: farm.proprietar,
                endereco: farm.endereco,
                tamanho: farm.tamanho,
                clima: farm.clima,
            }
        })
    })

    app.post('/farms', async (request) => {
        const bodySchema = z.object({
            proprietar: z.string(),
            endereco: z.string(),
            tamanho: z.number(),
            clima: z.string(),
        })

        const { proprietar, endereco, tamanho, clima } = bodySchema.parse(request.body)

        const farm = await prisma.farm.create({
            data: {
                proprietar,
                endereco,
                tamanho,
                clima,
                usercpf: '12345678901'
            }
        })

        return farm
    })
}