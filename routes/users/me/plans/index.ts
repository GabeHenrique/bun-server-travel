import { Router } from "bunrest/src/router/router";
import { delay } from "../../../../utils/delay";
import { PLAN_FAIL } from "../../../../utils/flags";
import { PlanFile } from "../../../../utils/types";

export default (router: Router, plan: PlanFile) => {
  router.get("/users/me/plans", async (_, res) => {
    await delay();
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (!plan || PLAN_FAIL) return res.status(500).send("Controlled error");
    return res.status(200).json(await plan.json());
  });
}