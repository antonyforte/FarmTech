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

    app.get('/unique/:id',async (request, reply) => {

        const usercpf = request.user?.usercpf;
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const { id } = paramsSchema.parse(request.params); 

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        try {
            const farm = await prisma.farm.findUnique({
                where: { id },
            });
            return reply.status(200).send(farm);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao buscar Fazenda." });
        }
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

    app.put("/edit/:id", async (request, reply) => {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const bodySchema = z.object({
            proprietar: z.string().optional(),
            endereco: z.string().optional(),
            tamanho: z.number().positive("Tamanho deve ser maior que 0.").optional(),
            clima: z.string().optional(),
        });

        const { id } = paramsSchema.parse(request.params); // Valida o ID nos parâmetros
        const { proprietar, endereco, tamanho, clima } = bodySchema.parse(request.body); // Valida o corpo da requisição
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        try {
            const updatedFarm = await prisma.farm.update({
                where: { id },
                data: { proprietar, endereco, tamanho, clima },
            });
            return reply.status(200).send(updatedFarm);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao atualizar Fazenda." });
        }
    });

    // Rota DELETE: Deleta uma fazenda pelo ID
    app.delete("/delete/:id", async (request, reply) => {
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const { id } = paramsSchema.parse(request.params); // Valida o ID nos parâmetros
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        try {
            await prisma.farm.delete({
                where: { id },
            });
            return reply.status(200).send({ message: "Fazenda deletada com sucesso" });
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao deletar Fazenda" + error });
        }
    });
}