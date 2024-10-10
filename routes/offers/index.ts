import { Router } from "bunrest/src/router/router";
import { delay } from "../../utils/delay";
import offers from "../../mocks/offers.json";
import { OFFERS_FAIL } from "../../utils/flags";

export default (router: Router) => {
    router.get("/offers", async (_, res) => {
        await delay();
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        if (OFFERS_FAIL) return res.status(500).send("Controlled error");
        return res.status(200).json(offers);
      });
}