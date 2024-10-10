import { Router } from "bunrest/src/router/router";
import { delay } from "../../../utils/delay";
import {
  CURRENT_USER_PHONE_NUMBER,
  CURRENT_USER_PLAN_HOLDER,
  DOWNGRADE_FAIL,
  DOWNGRADE_TOTAL_SUCCESS,
} from "../../../utils/flags";
import { PhoneNumbers } from "../../../utils/types";

export default (router: Router) => {
  router.options("/offers/:offerId/downgrade", async (_, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(204);
  });

  router.put("/offers/:offerId/downgrade", async (req, res) => {
    await delay();
    const { phoneNumbers } = req.body as PhoneNumbers;
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (DOWNGRADE_FAIL) return res.status(500).send("Controlled error");
    if (DOWNGRADE_TOTAL_SUCCESS) {
      return res.status(200).json({
        success: true,
        logs: phoneNumbers.map((phoneNumber) => ({
          error: false,
          isPlanHolder:
            phoneNumber === CURRENT_USER_PHONE_NUMBER
              ? CURRENT_USER_PLAN_HOLDER
              : false,
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
          isPlanHolder:
            phoneNumber === CURRENT_USER_PHONE_NUMBER
              ? CURRENT_USER_PLAN_HOLDER
              : false,
          phoneNumber,
          service: "",
          errorMessage: "",
        })),
      });
    }
  });
};
