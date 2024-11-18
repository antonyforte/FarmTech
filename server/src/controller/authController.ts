import { z } from "zod";
import { createUser, findUserByEmail } from "../services/userService";
import { verifyPassword } from "../models/user";

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerUser(req: Request, res: Response) {
  const body = await req.json();
  const parsedData = userSchema.safeParse(body);

  if (!parsedData.success) {
    return res
  }

  const { name, email, password } = parsedData.data;
  await createUser({ name, email, password });

  return res
}

export async function loginUser(req: Request, res: Response) {
  // Transformando o corpo da requisição em objeto JavaScript
  const body = await req.json();

  // Validando os dados
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const parsedData = loginSchema.safeParse(body);

  if (!parsedData.success) {
    return res
  }

  const { email, password } = parsedData.data;

  const user = await findUserByEmail(email);
  if (user && (await verifyPassword(password, user.password))) {
    return res
  } else {
    return res
  }
}
