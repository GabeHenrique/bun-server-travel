import server from "bunrest";
import { BunFile } from "bun";
import yargs from "yargs-parser";
import authorization from "./routes/authorization";
import cancel from "./routes/offers/cancel";
import cancellationFee from "./routes/offers/cancellation-fee";
import dailyCalls from "./routes/offers/daily-calls";
import downgrade from "./routes/offers/downgrade";
import downgradeFee from "./routes/offers/downgrade-fee";
import internetCoverage from "./routes/offers/internet-coverage";
import rules from "./routes/offers/rules";
import singleDailies from "./routes/offers/single-dailies";
import subscribe from "./routes/offers/subscribe";
import roaming from "./routes/roaming";
import charges from "./routes/roaming/charges";
import me from "./routes/users/me";
import plansR from "./routes/users/me/plans";
import { Plan } from "./utils/types";
import offers from "./routes/offers";
import upgrade from "./routes/offers/upgrade";

const rawArgs = Bun.argv.slice(2);
const args = yargs(rawArgs);

const plans: Plan[] = [
  {
    id: 0,
    name: "1 Plano com Incluso Europa + América avulso | 2 Dependentes com Travel",
    file: "mocks/plans/plan1-inc1eu-avu1ame.json",
  },
  {
    id: 1,
    name: "1 Plano sem assinaturas",
    file: "mocks/plans/plan1.none.postpaid.json",
  },
  {
    id: 2,
    name: "1 Plano com com avulso Américas",
    file: "mocks/plans/plan1-avu1ame.json",
  },
  {
    id: 3,
    name: "1 Plano com com avulso Mundo com dependente com mundo",
    file: "mocks/plans/plan1-avu1mun-dep-1.json",
  },
  {
    id: 4,
    name: "1 Plano com com avulso América e Europa",
    file: "mocks/plans/plan1-avu1eu-avu1ame-dep1.json",
  },
  {
    id: 5,
    name: "1 Plano com com avulso Mundo e Europa",
    file: "mocks/plans/plan1-avu1eu-avu1mun-dep1.json",
  },
  {
    id: 6,
    name: "1 Plano executivo",
    file: "mocks/plans/plan1-executivo.json",
  },
  {
    id: 7,
    name: "Plano de teste rápido",
    file: "mocks/plans/plan-test-fast.json",
  },
  {
    id: 8,
    name: "2 Planos, 1: avulso Américas; 2: pré",
    file: "mocks/plans/plan2-avuAme+pre.json",
  },
  {
    id: 9,
    name: "2 Planos, 1: incluso Américas; 2: pós sem Travel",
    file: "mocks/plans/plan2-incAme+postpaid.json",
  },
  {
    id: 10,
    name: "2 Planos, 1: incluso Américas com dependente sem Travel; 2: avulso Américas",
    file: "mocks/plans/plan2-incAmeDep1+avuAme.json",
  },
  {
    id: 11,
    name: "2 Planos, 1: incluso Américas com dependente sem Travel; 2: pós sem Travel",
    file: "mocks/plans/plan2-incAmeDep1+postpaid.json",
  },
  {
    id: 12,
    name: "Muitos planos (original +5511974658136)",
    file: "mocks/plans/plan-defeito.json",
  },
  {
    id: 13,
    name: "1 Plano com com avulso Europa",
    file: "mocks/plans/plan1-avu1eur.json",
  },
  {
    id: 14,
    name: "1 Plano com com avulso Américas e dependente com Mundo (upgrade e downgrade ao mesmo tempo)",
    file: "mocks/plans/plan1-avu1ame+mundo.json",
  },
  {
    id: 15,
    name: "1 Plano sem assinaturas controle",
    file: "mocks/plans/plan1.none.control.json",
  },
  {
    id: 16,
    name: "Muitos planos 2 (original +5541992877136)",
    file: "mocks/plans/plan.blabla.json",
  },
  {
    id: 17,
    name: "2 Plano, avulso mundo & pré",
    file: "mocks/plans/plan1.avu1mun.json",
  },
  {
    id: 18,
    name: "2 Plano, incluso mundo & pré",
    file: "mocks/plans/plan1.inc1mun.json",
  },
  {
    id: 19,
    name: "1 Plano com Incluso Europa",
    file: "mocks/plans/plan1-inc1eu.json",
  },
  {
    id: 20,
    name: "1 Plano com Incluso Mundo e dependente com Europa",
    file: "mocks/plans/plan1.inc1mun+avu1eu+dep.json",
  },

];

const PORT = 3001;

const CURRENT_PLAN_ID = args.planId;

const app = server();

const router = app.router();

const planMetadata = plans.find((plan) => plan.id === CURRENT_PLAN_ID);
let plan: undefined | BunFile;
if (planMetadata) {
  plan = Bun.file(planMetadata.file, { type: "application/json" });
}

// fixed
authorization(router, plan);
dailyCalls(router);
internetCoverage(router);
rules(router);
singleDailies(router);
roaming(router);
charges(router);
me(router);
plansR(router, plan);
offers(router);

// dynamic
cancel(router);
cancellationFee(router);
downgrade(router)
downgradeFee(router)
subscribe(router);
upgrade(router);

app.use((req, res, next) => {
  console.log();
  console.log(req.request.url);
  console.info(`${req.originalUrl} | ${req.method}`);
  console.table(req.body);
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (next) next();
});

app.use("/bff/travel", router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT} ...`);
});
