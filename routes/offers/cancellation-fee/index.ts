import { Router } from "bunrest/src/router/router";
import { delay } from "../../../utils/delay";
import { FEE_FAIL, FEE_ZERO } from "../../../utils/flags";
import { PhoneNumbers } from "../../../utils/types";

export default (router: Router) => {
  router.options("/offers/:offerId/cancellation-fee", async (_, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(204);
  });

  router.post("/offers/:offerId/cancellation-fee", async (req, res) => {
    await delay();
    if (FEE_FAIL) return res.status(500).send("Controlled error");
    else {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
      res.setHeader("Access-Control-Allow-Credentials", "true")
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
      const data = req.body as PhoneNumbers;
      return res.status(200).json(
        data.phoneNumbers.map((phoneNumber) => ({
          phoneNumber,
          price: FEE_ZERO ? 0 : 97.26,
        }))
      );
    }
  });
};
