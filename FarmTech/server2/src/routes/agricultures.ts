import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import type { nodeModuleNameResolver } from "typescript";

export async function agricultureRoutes(app : FastifyInstance) {

    
    app.get('/', async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if(!usercpf){
            return reply.status(401).send({ message: 'Usuário não autenticado'});
        }

        const agricultures = await prisma.agriculture.findMany()


        return agricultures.map((agriculture) => {
            return{
                tipo: agriculture.tipo,
                nome: agriculture.nome,
                valor_unid: agriculture.valor_unid,
                neces_clima: agriculture.neces_clima,
            }
        })
    })

    app.get('/:tipo',async (request, reply) => {

        const usercpf = request.user?.usercpf;

        
        const paramsSchema = z.object({
            tipo: z.coerce.number(),
        });

        const { tipo } = paramsSchema.parse(request.params); 

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        try {
            const agriculture = await prisma.agriculture.findUnique({
                where: { tipo },
            });
            return reply.status(200).send(agriculture);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao buscar Agricultura." });
        }
    })

    app.post('/', async (request, reply) => {
        

        const bodySchema = z.object({
            nome: z.string(),
            valor_unid: z.number(),
            neces_clima: z.string(),
        })

        const { nome, valor_unid, neces_clima } = bodySchema.parse(request.body)
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: 'Usuário não autenticado' });

        }

        const agriculture = await prisma.agriculture.create({
            data: {
                nome,
                valor_unid,
                neces_clima,

            },
        });

        return agriculture;
    })

    app.put("/edit/:tipo", async (request, reply) => {
        const paramsSchema = z.object({
            tipo: z.coerce.number(),
        });

        const bodySchema = z.object({
            nome: z.string().optional(),
            valor_unid: z.number().optional(),
            neces_clima: z.string().optional(),
        });

        const { tipo } = paramsSchema.parse(request.params); // Valida o ID nos parâmetros
        const { nome, valor_unid, neces_clima } = bodySchema.parse(request.body); // Valida o corpo da requisição
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        try {
            const updatedAgriculture = await prisma.agriculture.update({
                where: { tipo },
                data: { nome, valor_unid, neces_clima },
            });
            return reply.status(200).send(updatedAgriculture);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao atualizar Agricultura." });
        }
    });

    // Rota DELETE: Deleta uma agricultura pelo ID
    app.delete("/delete/:tipo", async (request, reply) => {
        const paramsSchema = z.object({
            tipo: z.coerce.number(),
        });

        const { tipo } = paramsSchema.parse(request.params); // Valida o ID nos parâmetros
        const usercpf = request.user?.usercpf;

        if (!usercpf) {
            return reply.status(401).send({ message: "Usuário não autenticado" });
        }

        try {
            await prisma.agriculture.delete({
                where: { tipo },
            });
            return reply.status(200).send({ message: "Fazenda deletada com sucesso" });
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao deletar Agricultura" });
        }
    });
}