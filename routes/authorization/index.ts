import { Router } from "bunrest/src/router/router";
import { delay } from "../../utils/delay";
import { AUTHORIZE_FAIL, AUTHORIZE_UPDATE_FAIL, CURRENT_USER_PHONE_NUMBER } from "../../utils/flags";
import { Authorized, Dependent, PlanFile, PlanTravel } from "../../utils/types";

export default (router: Router, plan: PlanFile) => {
  router.get("/authorization", async (_, res) => {
    await delay();
    if (AUTHORIZE_FAIL) return res.status(500).send("Controlled error");
    else {
      const plansTravel = await plan?.json();
      const currentPlanTravel = plansTravel?.find((planTravel: PlanTravel) => planTravel.phoneNumber === CURRENT_USER_PHONE_NUMBER);
      const dependents = currentPlanTravel?.dependents;
      return res
        .status(200)
        .json(
          dependents.map((dependent: Dependent) => ({
            phoneNumber: dependent.phoneNumber,
            authorized: false,
          }))
        );
    }
  });

  router.options("/authorization", async (_, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004"); // Especifique o domínio
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Permite o envio de credenciais (cookies, headers de autenticação, etc.)
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); // Métodos permitidos
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Cabeçalhos permitidos
    return res.status(204);
  });

  router.put("/authorization", async (req, res) => {
    await delay(3000);
    if (AUTHORIZE_UPDATE_FAIL) return res.status(500).send("Controlled error");
    else {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004"); // Especifique o domínio
      res.setHeader("Access-Control-Allow-Credentials", "true"); // Permite o envio de credenciais (cookies, headers de autenticação, etc.)
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); // Métodos permitidos
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Cabeçalhos permitidos
      const { authorized } = req.body as Authorized;
      return res.status(200).json({ authorized });
    }
  });
};
