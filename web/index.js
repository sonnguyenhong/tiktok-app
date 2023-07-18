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
import { TIKTOK_AUTH_HEADER } from "./constants/header.constants.js";
import axios from "axios";

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

app.get('/api/get-ads-profile', async (req, res) => {
  const shopifySessionId = res.locals.shopify.session.id;
  const accessToken = req.headers[TIKTOK_AUTH_HEADER];
  const appId = process.env.TIKTOK_API_APP_ID;
  const secret = process.env.TIKTOK_API_SECRET;
  console.log('shopify session id: ', shopifySessionId);
  const tiktokAccessToken = await TiktokAccessTokenDB.getByShopifySessionId({ id: shopifySessionId });
  const userInfor = await axios.get('https://business-api.tiktok.com/open_api/v1.3/user/info/', {
    headers: {
      'Access-Token': tiktokAccessToken.access_token,
    }
  })
  const adsListInfor = await axios.get(`https://business-api.tiktok.com/open_api/v1.3/oauth2/advertiser/get?app_id=${appId}&secret=${secret}`, {
    headers: {
      'Access-Token': tiktokAccessToken.access_token,
    }
  });
  console.log('adsListInfor', adsListInfor.data.data);
  console.log('userInfor', userInfor.data.data);
  return res.status(200).send({
    tiktokAccessToken,
    userInfor: userInfor.data.data,
    adsListInfor: adsListInfor.data.data,
  });
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/products/count", async (req, res) => {
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
