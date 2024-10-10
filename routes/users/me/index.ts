import { Router } from "bunrest/src/router/router";
import { delay } from "../../../utils/delay";
import { CURRENT_USER_PHONE_NUMBER, CURRENT_USER_PLAN_HOLDER, USER_FAIL } from "../../../utils/flags";

export default (router: Router) => {
  router.get("/users/me", async (_, res) => {
    if (USER_FAIL) return res.status(500).send("Controlled error");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3004");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).json({
      phoneNumber: CURRENT_USER_PHONE_NUMBER,
      isPlanHolder: CURRENT_USER_PLAN_HOLDER,
    });
  });
};
