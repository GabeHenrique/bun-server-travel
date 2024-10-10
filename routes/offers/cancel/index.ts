import { Router } from "bunrest/src/router/router";
import { delay } from "../../../utils/delay";
import { CANCEL_FAIL, CANCEL_TOTAL_SUCCESS, CURRENT_USER_PHONE_NUMBER, CURRENT_USER_PLAN_HOLDER } from "../../../utils/flags";
import { PhoneNumbers } from "../../../utils/types";

export default (router: Router) => {
  router.options("/offers/:offerId/cancel", async (_, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004"); // Especifique o domínio
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Permite o envio de credenciais (cookies, headers de autenticação, etc.)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); // Métodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Cabeçalhos permitidos
    return res.status(204);
  });

  router.put("/offers/:offerId/cancel", async (req, res) => {
    await delay();
    const { phoneNumbers } = req.body as PhoneNumbers;
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004"); // Especifique o domínio
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Permite o envio de credenciais (cookies, headers de autenticação, etc.)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); // Métodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Cabeçalhos permitidos
    if (CANCEL_FAIL) return res.status(500).send("Controlled error");
    if (CANCEL_TOTAL_SUCCESS) {
      return res.status(200).json({
        success: true,
        logs: phoneNumbers.map((phoneNumber) => ({
          error: false,
          isPlanHolder: phoneNumber === CURRENT_USER_PHONE_NUMBER ? CURRENT_USER_PLAN_HOLDER : false,
          phoneNumber,
          service: "",
          errorMessage: "",
        })),
      });
    } else {
      return res.status(200).json({
        success: false,
        logs: phoneNumbers.map((phoneNumber, index) => ({
          error: index === 0,
          isPlanHolder: phoneNumber === CURRENT_USER_PHONE_NUMBER ? CURRENT_USER_PLAN_HOLDER : false,
          phoneNumber,
          service: "",
          errorMessage: "",
        })),
      });
    }
  });
};
