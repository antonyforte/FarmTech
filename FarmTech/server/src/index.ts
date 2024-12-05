import { Elysia } from "elysia";
import { drizzle } from "drizzle-orm/libsql"
import { registerUser, loginUser } from './controller/authController'
import { createFarm, getFarmsByUser } from './controller/farmController'



const app = new Elysia();
app.post('/register', registerUser);
app.post('/login', loginUser);
app.get("/farms/:userId", async(req: any, res: any) => {
  const userId = Number(req.params.userId)
  if (isNaN(userId)) {
    res.status(400).send("ID de usuário inválido");
    return;
  }

  const userFarms = await getFarmsByUser(userId);
  res.send(userFarms);
})
app.post("/farms", async (req: any, res: any) => {
  const { ownerName, address, size, climate, userId } = await req.json();

  if (!ownerName || !address || !size || !climate || !userId) {
    res.status(400).send("Todos os campos são obrigatórios");
    return;
  }

  await createFarm({ ownerName, address, size, climate, userId });
  res.status(201).send("Fazenda cadastrada com sucesso");
});

app.listen(3000, () =>
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
));
