import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import LoginSubmission from "../sharedComponent/LoginSubmission";

// Definición de los handlers para interceptar el request de login.
const handlers = [
  rest.post("https://auth-provider.example.com/api/login", async (req, res, ctx) => {
    const data = await req.json();
    // Validar campos requeridos
    if (!data.password) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Password is required!" })
      );
    }
    if (!data.username) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Username is required!" })
      );
    }
    // Respuesta exitosa: se devuelve el username
    return res(ctx.status(200), ctx.json({ username: data.username }));
  })
];

// Configuración del servidor de MSW
const server = setupServer(...handlers);

// Ciclo de vida de los tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("LoginSubmission Component", () => {
  
  test("Muestra mensaje de bienvenida al iniciar sesión correctamente", async () => {
    render(<LoginSubmission />);
    
    // Rellenar formulario con datos correctos
    userEvent.type(screen.getByLabelText(/username/i), "Bob");
    userEvent.type(screen.getByLabelText(/password/i), "secret");
    
    // Enviar el formulario
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    // Se espera a que desaparezca el Spinner (suponiendo que Spinner muestra "Loading...")
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    
    // Verificamos que se muestre el mensaje de bienvenida (se utiliza el <strong> para el username)
    expect(screen.getByText(/welcome/i)).toHaveTextContent("Welcome Bob");
  });

  test("Muestra error si falta la contraseña", async () => {
    render(<LoginSubmission />);
    
    // Completar solo el username (contraseña vacía)
    userEvent.type(screen.getByLabelText(/username/i), "Alice");
    // No se ingresa password
    
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    // Esperar a que desaparezca el indicativo de carga
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    
    // Se espera que se muestre el mensaje de error y se usa inline snapshot
    expect(screen.getByRole("alert")).toMatchInlineSnapshot(`
      <div
        role="alert"
        style="color: red;"
      >
        Password is required!
      </div>
    `);
  });
  
  test("Muestra error si falta el username", async () => {
    render(<LoginSubmission />);
    
    // Completar solo el password (username vacío)
    userEvent.type(screen.getByLabelText(/password/i), "secret");
    // No se ingresa username
    
    userEvent.click(screen.getByRole("button", { name: /submit/i }));
    
    // Esperar a que desaparezca el indicativo de carga
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    
    // Se espera que se muestre el mensaje de error y se usa inline snapshot
    expect(screen.getByRole("alert")).toMatchInlineSnapshot(`
      <div
        role="alert"
        style="color: red;"
      >
        Username is required!
      </div>
    `);
  });
});