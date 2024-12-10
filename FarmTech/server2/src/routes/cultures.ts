import type { FastifyInstance } from "fastify";
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function cultureRoutes(app : FastifyInstance) {

    // Rota Get das Culturas
    app.get('/:id', async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if(!usercpf){
            return reply.status(401).send({ message: 'Usuário não autenticado'});
        }

        const paramsSchema = z.object({
            farmid: z.coerce.number(),
        });

        const { farmid } = paramsSchema.parse(request.params);

        const cultures = await prisma.culture.findMany({
            where: { farmid },
        })


        return cultures.map((cultures) => {
            return{
                id: cultures.id,
                local: cultures.local,
                qtd: cultures.qtd,

            }
        })
    })

    //Rota Post das culturas
    app.post('/:id', async (request, reply) => {
        const usercpf = request.user?.usercpf;

        if(!usercpf){
            return reply.status(401).send({ message: 'Usuário não autenticado'});
        }
    })

    //Rota de Editar das culturas
    app.put("/edit/:id", async (request, reply) => {
        
    });

    //Rota de Deletar das culturas
    app.delete("/delete/:id", async (request, reply) => {
       
    });
}