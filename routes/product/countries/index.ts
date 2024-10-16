import {Router} from "bunrest/src/router/router";
import countries from "../../../mocks/countries.json";

export default (router: Router) => {
  router.options("/product/countries/:productId", async (_, res) => {
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

  router.get("/product/countries/:productId", async (req, res) => {
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
    const {productId} = req.params;
    const result = countries.filter(
      (productCountry) => productCountry.productId === productId
    )[0].countryValues;

    return res.status(200).json(result);
  });
};
