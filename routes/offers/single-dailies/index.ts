import { Router } from "bunrest/src/router/router";
import { delay } from "../../../utils/delay";
import { SINGLE_DAILIES_FAIL } from "../../../utils/flags";
import singleDailies from "../../../mocks/single-dailies.json";

export default (router: Router) => {
  router.get("offers/single-dailies", async (_, res) => {
    await delay();
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (SINGLE_DAILIES_FAIL) return res.status(500).send("Controlled error");
    return res.status(200).json(singleDailies);
  });
}