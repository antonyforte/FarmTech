import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function userRoutes(app : FastifyInstance) {
    app.get('/users', async () => {
        const users = await prisma.user.findMany({
            orderBy: {
                name: 'asc',
            },
        })

        return users.map((user) => {
            return{
                name: user.name,
                cpf: user.cpf,
                email: user.email,
            }
        })
    })

    app.post('/user', async (request) => {
        const bodySchema = z.object({
            name: z.string(),
            cpf: z.string(),
            email: z.string(),
            password: z.string(),
        })

        const { name, cpf, email, password } = bodySchema.parse(request.body)

        const user = await prisma.user.create({
            data: {
                name,
                cpf,
                email,
                password
            }
        })

        return user
    })
}