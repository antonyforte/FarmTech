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

    app.put('/edit/:id', async(request, reply) => {
        const paramsSchema = z.object({
            cpf: z.string(),
            id: z.number(),
        });
        const bodySchema = z.object({
            proprietar: z.string(),
            endereco: z.string(),
            tamanho: z.number(),
            clima: z.string(),
        })

        const { cpf } = paramsSchema.parse(request.user?.usercpf);
        const { id } = paramsSchema.parse(request.id);

        if(!cpf){
            return reply.status(401).send({ message: 'Usuário não autenticado'});
        }

        const { proprietar, endereco, tamanho } = bodySchema.parse(request.body);

        try {
            const updatedFarm = await prisma.farm.update({
                where: { id },
                data: { proprietar, endereco, tamanho},
            });
            return reply.status(200).send(updatedFarm);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao atualizar Fazenda."});
        }
    });

    app.delete('/delete/:id', async(request,reply) => {

        const paramsSchema = z.object({
            cpf: z.string(),
            id: z.number(),
        });

        const { cpf } = paramsSchema.parse(request.user?.usercpf);
        const { id } = paramsSchema.parse(request.id);

        if(!cpf){
            return reply.status(401).send({ message: 'Usuário não autenticado'});
        }

        try {
            await prisma.farm.delete({
                where: {id},
            });
            return reply.status(200).send({message: "Fazenda deletada com sucesso"})
        } catch (error) {
            reply.status(400).send({message: "Erro ao deletar Fazenda"})
        }

    })
}