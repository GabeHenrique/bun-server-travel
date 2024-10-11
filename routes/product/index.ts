import {Router} from "bunrest/src/router/router";
import products from "../../mocks/products.json";

export default (router: Router) => {
  router.options("/plan", async (_, res) => {
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

  router.get("product", async (_, res) => {
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

  router.get("product/:id", async (req, res) => {
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
    const { id } = req.params;
    const product = products.find((product: any) => product.id === id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  });
};
