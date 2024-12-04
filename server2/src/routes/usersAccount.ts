import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function usersAccountsRoutes(app: FastifyInstance) {
    
    app.put('/users/:cpf', async (request, reply) => {
        
        const paramsSchema = z.object({
            cpf: z.string(),
        });
        const bodySchema = z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
            password: z.string().optional(),
        });
        const { cpf } = paramsSchema.parse(request.user?.usercpf);

        if(!cpf){
            return reply.status(401).send({ message: 'Usuário não autenticado'});
        }

        const { name, email, password } = bodySchema.parse(request.body);

        try {
            const updatedUser = await prisma.user.update({
                where: { cpf },
                data: { name, email, password},
            });
            return reply.status(200).send(updatedUser);
        } catch (error) {
            return reply.status(400).send({ message: "Erro ao atualizar Usuário."});
        }
    })

    app.delete('/users/:cpf', async (request, reply) => {
        
        const paramsSchema = z.object({
            cpf: z.string(),
        });
        const { cpf } = paramsSchema.parse(request.user?.usercpf);

        if(!cpf){
            return reply.status(401).send({ message: 'Usuário não autenticado'});
        }

        try {
            await prisma.user.delete({
                where: {cpf},
            });
            return reply.status(200).send({message: "Usuário deletado com sucesso"})
        } catch (error) {
            reply.status(400).send({message: "Erro ao deletar usuário"})
        }
    })

}