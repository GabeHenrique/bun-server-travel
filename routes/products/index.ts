import { Router } from "bunrest/src/router/router";
import products from "../../mocks/products.json";

export default (router: Router) => {
  router.options("/products", async (_, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004"); // Especifique o domínio
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Permite o envio de credenciais (cookies, headers de autenticação, etc.)
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE",
    ); // Métodos permitidos
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    ); // Cabeçalhos permitidos
    return res.status(204);
  });

  router.get("products", async (_, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    return res.status(200).json(products);
  });
};
