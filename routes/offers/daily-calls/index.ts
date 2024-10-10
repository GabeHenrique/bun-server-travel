import { Router } from "bunrest/src/router/router";
import { delay } from "../../../utils/delay";
import { DAILY_CALLS_FAIL } from "../../../utils/flags";
import dailyCalls from "../../../mocks/daily-calls.json";

export default (router: Router) => {
  router.get("offers/daily-calls", async (_, res) => {
    await delay();
    if (DAILY_CALLS_FAIL) return res.status(500).send("Controlled error");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).json(dailyCalls);
  });
}