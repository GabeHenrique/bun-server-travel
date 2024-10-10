import { Router } from "bunrest/src/router/router";
import { delay } from "../../utils/delay";
import { ROAMING_FAIL, ROAMING_UPDATE_FAIL } from "../../utils/flags";
import { Active } from "../../utils/types";

export default (router: Router) => {
  router.get("/roaming", async (_, res) => {
    await delay();
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (ROAMING_FAIL) return res.status(500).send("Controlled error");
    else {
      return res.status(200).json({ active: true });
    }
  });

  router.options("/roaming", async (_, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(204);
  });

  router.put("/roaming", async (req, res) => {
    await delay();
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (ROAMING_UPDATE_FAIL) return res.status(500).send("Controlled error");
    else {
      const { active } = req.body as Active;
      return res.status(200).json({ active });
    }
  });
};
