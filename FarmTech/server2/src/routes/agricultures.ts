import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function agricultureRoutes(app: FastifyInstance) {

    // 🔎 GET: Lista todas as agriculturas com produtos relacionados e suas quantidades
    app.get("/", async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        const agricultures = await prisma.agriculture.findMany({
            include: {
                need: {
                    include: {
                        product: true,
                    }
                }
            }
        });

        return agricultures.map((agriculture) => {
            return {
                tipo: agriculture.tipo,
                nome: agriculture.nome,
                valor_unid: agriculture.valor_unid,
                neces_clima: agriculture.neces_clima,
                colhxanim: agriculture.colhxanim,
                produtos: agriculture.need.map((need) => ({
                    produto_nome: need.product.nome,
                    produto_preco: need.product.preco,
                    quantidade: need.qtd,
                })),
            };
        });
    });

    // 🔎 GET: Retorna uma agricultura específica pelo tipo
    app.get("/:tipo", async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        const paramsSchema = z.object({
            tipo: z.coerce.number(),
        });

        const { tipo } = paramsSchema.parse(request.params);

        try {
            const agriculture = await prisma.agriculture.findUnique({
                where: { tipo },
                include: {
                    need: {
                        include: {
                            product: true,
                        }
                    }
                }
            });

            if (!agriculture) {
                return reply.status(404).send({ message: "Agricultura não encontrada" });
            }

            return {
                tipo: agriculture.tipo,
                nome: agriculture.nome,
                valor_unid: agriculture.valor_unid,
                neces_clima: agriculture.neces_clima,
                colhxanim: agriculture.colhxanim,
                produtos: agriculture.need.map((need) => ({
                    produto_nome: need.product.nome,
                    produto_preco: need.product.preco,
                    quantidade: need.qtd,
                })),
            };
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao buscar Agricultura." });
        }
    });

    // ➕ POST: Cria uma nova agricultura
    app.post("/", async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }
        console.log('here');

        const bodySchema = z.object({
            nome: z.string(),
            valor_unid: z.number(),
            neces_clima: z.string(),
            colhxanim: z.boolean(),
            needsId: z.array(z.object({
                productId: z.number(),
                qtd: z.number(),
            }))
        });

        const { nome, valor_unid, neces_clima, colhxanim, needsId } = bodySchema.parse(request.body);
        console.log(colhxanim);

        try {
            const agriculture = await prisma.agriculture.create({
                data: {
                    nome,
                    valor_unid,
                    neces_clima,
                    colhxanim,
                    need: {
                        create: needsId.map(({ productId, qtd}) => ({
                            productId,
                            qtd,
                        })),
                    },
                },
            });

            return reply.status(201).send(agriculture);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao criar Agricultura." });
        }
    });

    // ✏️ PUT: Atualiza uma agricultura existente
    app.put("/edit/:tipo", async (request, reply) => {
        const usercpf = request.user?.usercpf;
        console.log("here")
        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        const paramsSchema = z.object({
            tipo: z.coerce.number(),
        });

        const bodySchema = z.object({
            nome: z.string().optional(),
            valor_unid: z.number().optional(),
            neces_clima: z.string().optional(),
            colhxanim: z.boolean().optional(),
            needsId: z.array(z.object({
                productId: z.number(),
                qtd: z.number(),
            })).optional(),
        });

        const { tipo } = paramsSchema.parse(request.params);
        const { nome, valor_unid, neces_clima, colhxanim, needsId } = bodySchema.parse(request.body);
        
        try {
            // Atualiza a agricultura com os dados fornecidos
            const agriculture = await prisma.agriculture.update({
                where: { tipo },
                data: {
                    nome,
                    valor_unid,
                    neces_clima,
                    colhxanim,
                    // Se needsId for fornecido, atualiza o relacionamento
                    need: needsId ? {
                        // Primeiro, apaga os relacionamentos existentes
                        deleteMany: {},
                        // Agora, cria os novos relacionamentos
                        create: needsId.map(({ productId, qtd }) => ({
                            productId,
                            qtd,
                        })),
                    } : undefined,
                },
            });

            return reply.status(200).send(agriculture);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao atualizar Agricultura." });
        }
    });

    // ❌ DELETE: Remove uma agricultura existente
    app.delete("/delete/:tipo", async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        const paramsSchema = z.object({
            tipo: z.coerce.number(),
        });

        const { tipo } = paramsSchema.parse(request.params);

        try {
            await prisma.agriculture.delete({
                where: { tipo },
            });

            return reply.status(204).send();
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao deletar Agricultura." });
        }
    });
}
