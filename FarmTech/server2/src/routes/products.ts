import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export async function productRoutes(app: FastifyInstance) {
    // Rota GET para listar todos os produtos
    app.get("/", async (request, reply) => {

        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }
        const products = await prisma.product.findMany();

        return products.map((product) => ({
            id: product.id,
            nome: product.nome,
            preco: product.preco,
        }));
    });

    // Rota GET para um produto específico
    app.get("/:id", async (request, reply) => {

        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const { id } = paramsSchema.parse(request.params);

        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return reply.status(404).send({ message: "Produto não encontrado" });
        }

        return product;
    });

    // Rota POST para criar um novo produto
    app.post("/", async (request, reply) => {

        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }
        const bodySchema = z.object({
            nome: z.string(),
            preco: z.number(),
        });

        const { nome, preco } = bodySchema.parse(request.body);

        const product = await prisma.product.create({
            data: {
                nome,
                preco,
            },
        });

        return reply.status(201).send(product);
    });

    // Rota PUT para atualizar um produto
    app.put("/edit/:id", async (request, reply) => {

        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const bodySchema = z.object({
            nome: z.string().optional(),
            preco: z.number().optional(),
        });

        const { id } = paramsSchema.parse(request.params);
        const data = bodySchema.parse(request.body);

        try {
            const updatedProduct = await prisma.product.update({
                where: { id },
                data,
            });
            return reply.status(200).send(updatedProduct);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao atualizar Produto." });
        }
    });

    // Rota DELETE para deletar um produto
    app.delete("/delete/:id", async (request, reply) => {
        
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }
        const paramsSchema = z.object({
            id: z.coerce.number(),
        });

        const { id } = paramsSchema.parse(request.params);

        try {
            await prisma.product.delete({
                where: { id },
            });
            return reply.status(200).send({ message: "Produto deletado com sucesso" });
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao deletar Produto." });
        }
    });
}
