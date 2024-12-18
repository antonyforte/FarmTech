import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function cultureRoutes(app: FastifyInstance) {
    app.get('/farms/:farmid/cultures', async (request, reply) => {
        const usercpf = request.user?.usercpf;
        console.log(usercpf)

        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });
        }

        const paramsSchema = z.object({
            farmid: z.coerce.number(),
        });

        const { farmid } = paramsSchema.parse(request.params);

        const farm = await prisma.farm.findFirst({
            where: { id: farmid, usercpf },
        });

        if (!farm) {
            return reply.status(404).send({ message: 'Fazenda não encontrada ou não pertence ao usuário.' });
        }

        const cultures = await prisma.culture.findMany({
            where: { farmid },
        });

        return reply.status(200).send(cultures);
    });

    app.post('/farms/:farmid/cultures', async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });
        }

        const paramsSchema = z.object({
            farmid: z.coerce.number(),
        });

        const bodySchema = z.object({
            local: z.string(),
            qtd: z.number().min(1),
        });

        const { farmid } = paramsSchema.parse(request.params);
        const { local, qtd } = bodySchema.parse(request.body);

        const farm = await prisma.farm.findFirst({
            where: { id: farmid, usercpf },
        });

        if (!farm) {
            return reply.status(404).send({ message: 'Fazenda não encontrada ou não pertence ao usuário.' });
        }

        const culture = await prisma.culture.create({
            data: {
                local,
                qtd,
                farmid,
            },
        });

        return reply.status(201).send(culture);
    });

    app.put('/farms/:farmid/cultures/:id', async (request, reply) => {
        const usercpf = request.user?.usercpf;
    
        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });
        }
    
        const paramsSchema = z.object({
            farmid: z.coerce.number(),
            id: z.coerce.number(),
        });
    
        const bodySchema = z.object({
            local: z.string().optional(),
            qtd: z.number().min(1).optional(),
            agricultureid: z.number().optional(),
        });
    
        const { farmid, id } = paramsSchema.parse(request.params);
        const data = bodySchema.parse(request.body);
    
        // Verifica se a fazenda pertence ao usuário
        const farm = await prisma.farm.findFirst({
            where: { id: farmid, usercpf },
        });
    
        if (!farm) {
            return reply.status(404).send({ message: 'Fazenda não encontrada ou não pertence ao usuário.' });
        }
    
        // Verifica se a cultura existe e pertence à fazenda
        const existingCulture = await prisma.culture.findFirst({
            where: { id, farmid },
        });
    
        if (!existingCulture) {
            return reply.status(404).send({ message: 'Cultura não encontrada ou não pertence à fazenda.' });
        }
    
        // Atualiza a cultura
        const culture = await prisma.culture.update({
            where: { id },
            data,
        });
    
        return reply.status(200).send(culture);
    });
    

    app.delete('/farms/:farmid/cultures/:id', async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });
        }

        const paramsSchema = z.object({
            farmid: z.coerce.number(),
            id: z.coerce.number(),
        });

        const { farmid, id } = paramsSchema.parse(request.params);

        const farm = await prisma.farm.findFirst({
            where: { id: farmid, usercpf },
        });

        if (!farm) {
            return reply.status(404).send({ message: 'Fazenda não encontrada ou não pertence ao usuário.' });
        }

        await prisma.culture.delete({
            where: { id },
        });

        return reply.status(200).send({ message: 'Cultura deletada com sucesso.' });
    });
}
