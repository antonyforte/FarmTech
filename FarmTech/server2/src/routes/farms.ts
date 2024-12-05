import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function farmRoutes(app : FastifyInstance) {
    app.get('/', async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if(!usercpf){
            return reply.status(401).send({ message: 'Usuário não autenticado'});
        }

        const farms = await prisma.farm.findMany({
            where: { usercpf },
        })


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

    app.post('/', async (request, reply) => {
        console.log("Chegou7")

        const bodySchema = z.object({
            proprietar: z.string(),
            endereco: z.string(),
            tamanho: z.number(),
            clima: z.string(),
        })

        const { proprietar, endereco, tamanho, clima } = bodySchema.parse(request.body)
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });

        }

        const farm = await prisma.farm.create({
            data: {
                proprietar,
                endereco,
                tamanho,
                clima,
                usercpf,
            },
        });

        return farm;
    })
}