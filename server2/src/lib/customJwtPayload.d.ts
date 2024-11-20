import { JwtPayload } from 'jsonwebtoken'

// Extende o tipo JwtPayload para adicionar o campo usercpf
export interface CustomJwtPayload extends JwtPayload {
  usercpf: string;
}

// Modifica o tipo FastifyRequest para incluir o campo user
declare module 'fastify' {
  interface FastifyRequest {
    user?: CustomJwtPayload; // Adiciona a propriedade `user` que contém o payload do JWT
  }
}
