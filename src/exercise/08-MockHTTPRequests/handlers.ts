import { rest } from "msw";

export const handlers = [
  rest.post("https://auth-provider.example.com/api/login", async (req, res, ctx) => {
    const { username, password } = await req.json();
    if (!username || !password) {
      return res(
        ctx.status(400),
        ctx.json({ error: "Username and password are required" })
      );
    }
    return res(ctx.status(200), ctx.json({ message: "Login successful" }));
  }),
];
