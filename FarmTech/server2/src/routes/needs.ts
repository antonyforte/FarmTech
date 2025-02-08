import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function needRoutes(app: FastifyInstance) {
    // 🔎 GET: Lista todas as needs de uma agricultura específica
    app.get("/agricultures/:tipo/needs", async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        const paramsSchema = z.object({
            tipo: z.coerce.number(),
        });

        const { tipo } = paramsSchema.parse(request.params);

        try {
            const needs = await prisma.need.findMany({
                where: {
                    agriculturetipo: tipo
                },
                include: {
                    product: true
                }
            });

            if (!needs) {
                return reply.status(404).send({ message: "Needs não encontradas" });
            }

            return needs.map((need) => ({
                id: need.id,
                productId: need.productId,
                qtd: need.qtd,
                product: {
                    id: need.product.id,
                    nome: need.product.nome,
                    preco: need.product.preco
                }
            }));

        } catch (error) {
            return reply.status(400).send({ message: "Erro ao buscar needs." });
        }
    });
}