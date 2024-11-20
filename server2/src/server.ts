import fastify from 'fastify'
import cors from '@fastify/cors'
import { farmRoutes } from './routes/farms'
import { userRoutes } from './routes/users'

const app = fastify()

app.register(cors,{
    origin: true,
})
app.register(userRoutes)

app.listen({
    port: 3000,
}).then(() => {
    console.log('Fastify server running on http://localhost:3000')
})