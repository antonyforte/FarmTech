import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const JWT_SECRET = 'crop-king'
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

    app.post('/register', async (request) => {
        const bodySchema = z.object({
            name: z.string(),
            cpf: z.string(),
            email: z.string(),
            password: z.string(),
        })

        const { name, cpf, email, password } = bodySchema.parse(request.body)

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                cpf,
                email,
                password: hashedPassword
            }
        })

        return user
    })

    app.post('/login', async (request) => {
        const bodySchema = z.object({
            email: z.string(),
            password: z.string(),
        })

        const { email, password } = bodySchema.parse(request.body)

        // Verificar se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        // Verificar se a senha está correta
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new Error('Credenciais inválidas')
        }

        // Gerar o token JWT
        const token = jwt.sign({ usercpf: user.cpf }, JWT_SECRET, { expiresIn: '1h' })

        return { token }
    })
}