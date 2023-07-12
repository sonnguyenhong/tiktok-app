// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import session from "express-session";
import serveStatic from "serve-static";
import cookieParser from "cookie-parser";
import cors from 'cors';

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import dotenv from 'dotenv';
import applyTiktokEndpoint from "./routes/index.js";
import { APP_URL, SHOP_QUERY_PARAMS } from "./constants/app.constants.js";
import { TiktokAccessTokenDB } from "./models/tiktok-access-token.js";

dotenv.config();
console.log(process.env.TIKTOK_API_SECRET)
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
app.use(cookieParser());
// app.use(cors({ origin: `${APP_URL}?${SHOP_QUERY_PARAMS}`, credentials: true }))
app.use(cors({ origin: 'https://quickstart-4a029195.myshopify.com', credentials: true }))
app.use(cors({ origin: 'https://ads.tiktok.com', credentials: true }))

app.use(session({
  secret: process.env.SESSION_SECRET || "sondeptrai",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24*60*60*1000
  }
}))

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

applyTiktokEndpoint(app);
app.use("/api/*", shopify.validateAuthenticatedSession());

app.get('/api/check-tiktok-auth', async (req, res) => {
  // res.send(req.session.tiktokAccessToken);
  const shopifySessionId = res.locals.shopify.session.id;
  console.log('shopify session id: ', shopifySessionId);
  const response = await TiktokAccessTokenDB.getByShopifySessionId({ id: shopifySessionId });
  console.log('123');
  console.log('check response: ', response);
  // const jsonResponse = await response.json();
  // console.log('check - tiktok auth: ', jsonResponse);
  return res.status(200).send(response);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/products/count", async (req, res) => {
  // console.log(_req.headers)
  console.log('sub req session: ', req.session)
  console.log('locals shopify: ', res.locals.shopify)
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;
  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
