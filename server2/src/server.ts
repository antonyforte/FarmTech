import fastify from 'fastify';
import cors from '@fastify/cors';
import { farmRoutes } from './routes/farms';
import { userRoutes } from './routes/users';
import jwt from 'jsonwebtoken';
import type { CustomJwtPayload } from './lib/customJwtPayload'; // Importando o tipo, se necessário

const app = fastify();

app.register(cors, {
    origin: true,
});
app.register(userRoutes); // Registrar rotas de usuários sem proteção

app.register(farmRoutes, { 
    prefix: '/farms', 
    // Rotas de fazenda terão autenticação via JWT
    preHandler: async (request: any, reply: any) => {
        const token = request.headers['authorization']?.split(' ')[1];

        if (!token) {
            return reply.status(401).send({ message: 'Token não fornecido' });
        }

        try {
            const decoded = jwt.verify(token, 'crop-king');

            if (typeof decoded === 'object' && decoded !== null) {
                request.user = decoded as CustomJwtPayload;
            } else {
                return reply.status(401).send({ message: 'Token inválido' });
            }
        } catch (err) {
            return reply.status(401).send({ message: 'Token inválido' });
        }
    }
});

// Hook de autenticação global
app.addHook('onRequest', async (request, reply) => {
    // Ignorar autenticação para as rotas de login e registro
    console.log("Chegou1")
    if (request.url === '/login' || request.url === '/register' || request.url === '/') return;

    const token = request.headers['authorization']?.split(' ')[1];


    if (!token) {
        return reply.status(401).send({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, 'crop-king');

        if (typeof decoded === 'object' && decoded !== null) {
            request.user = decoded as CustomJwtPayload;
        } else {
            return reply.status(401).send({ message: 'Token inválido' });
        }
    } catch (err) {
        return reply.status(401).send({ message: 'Token inválido' });
    }
});

app.listen({
    port: 3000,
}).then(() => {
    console.log('Fastify server running on http://localhost:3000');
});
