import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function cultureRoutes(app: FastifyInstance) {

    // Rota GET das Culturas
    app.get('/farms/:farmid', async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });
        }

        const paramsSchema = z.object({
            farmid: z.coerce.number(),
        });

        const { farmid } = paramsSchema.parse(request.params);

        const cultures = await prisma.culture.findMany({
            where: { farmid },
            include: {
                agriculture: {
                    include: {
                        need: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        });

        return cultures.map((culture) => ({
            id: culture.id,
            local: culture.local,
            qtd: culture.qtd,
            agriculture: culture.agriculture
                ? {
                    tipo: culture.agriculture.tipo,
                    nome: culture.agriculture.nome,
                    valor_unid: culture.agriculture.valor_unid,
                    neces_clima: culture.agriculture.neces_clima,
                    qtd_needs: culture.agriculture.need.length,
                    needs: culture.agriculture.need.map((need) => ({
                        id: need.id,
                        qtd: need.qtd,
                        product: need.product ? {
                            nome: need.product.nome,
                            preco: need.product.preco,
                        } : null,
                    })),
                }
                : null,
        }));
    });

    // Rota POST para criar uma nova cultura
    app.post('/farms/:farmid', async (request, reply) => {
        const usercpf = request.user?.usercpf;
        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });
        }

        const paramsSchema = z.object({
            farmid: z.coerce.number(),
        });

        const bodySchema = z.object({
            local: z.string(),
            qtd: z.number(),
        });

        const { farmid } = paramsSchema.parse(request.params);
        const { local, qtd } = bodySchema.parse(request.body);

        const culture = await prisma.culture.create({
            data: {
                local,
                qtd,
                farmid,
            },
        });

        return reply.status(201).send(culture);
    });

    // Rota PUT para editar uma cultura
    app.put('/farms/:farmid/edit/:id', async (request, reply) => {
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
            qtd: z.number().optional(),
        });

        const { id } = paramsSchema.parse(request.params);
        const data = bodySchema.parse(request.body);

        const updatedCulture = await prisma.culture.update({
            where: { id },
            data,
        });

        return reply.status(200).send(updatedCulture);
    });

    // Rota DELETE para deletar uma cultura
    app.delete('/farms/:farmid/delete/:id', async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });
        }

        const paramsSchema = z.object({
            farmid: z.coerce.number(),
            id: z.coerce.number(),
        });

        const { id } = paramsSchema.parse(request.params);
        try{
            await prisma.culture.delete({
                where: { id },
            });
            return reply.status(200).send("Cultura deletada com Sucesso")
        }catch (err) {
            return reply.status(400).send("Erro ao deletar Cultura");
        }

    });
}
