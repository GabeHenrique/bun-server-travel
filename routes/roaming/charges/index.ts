import { Router } from "bunrest/src/router/router";
import { delay } from "../../../utils/delay";
import {
  CHARGES_FAIL,
} from "../../../utils/flags";
import roamingCharges from '../../../mocks/roaming-charges.json'

export default (router: Router) => {
  router.get("/roaming/charges", async (_, res) => {
    await delay();
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (CHARGES_FAIL) return res.status(500).send("Controlled error");
    else {
      return res.status(200).json(roamingCharges);
    }
  });
};
