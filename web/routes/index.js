import axios from "axios";
import { TiktokAccessTokenDB } from '../models/tiktok-access-token.js';
import { APP_URL, SHOP_QUERY_PARAMS } from "../constants/app.constants.js";

export default function applyTiktokEndpoint(app) {
    /**
     * Send request to authorize on Tiktok API
     */
    app.post('/api/authorization', async (req, res) => {
        console.log(process.env.TIKTOK_API_APP_ID);
        const auth_code = "eee97737f754787547472df4b2c732babd88f3c1";
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/', {
            app_id: process.env.TIKTOK_API_APP_ID,
            auth_code: auth_code,
            secret: process.env.TIKTOK_API_SECRET
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response.data);
        /**
         * response.data: {
         *      code:
         *      message:
         *      request_id:
         *      data: {
         *          access_token:
         *          advertiser_ids: []
         *          scope: []
         *      }
         * }
         */
        return res.status(200).send(response.data);
    })

    app.get('/api/campaigns', async (req, res) => {
        const response = await axios.get(`https://business-api.tiktok.com/open_api/v1.3/campaign/get?advertiser_id=7230756208041721857`, {
            headers: {
                "Content-Type": "application/json",
                "Access-Token": "4ddb974c32039ae1f79234135a842c4c55f14cc5",
            }
        });
        console.log(response.data);
        /**
         * response.data: {
         *      
         * }
         */
        return res.status(200).send(response.data);
    })

    app.get('/api/callback', async (req, res) => {
        console.log('query: ', req.query);
        console.log(res.locals.shopify)
        const auth_code = req.query.auth_code;
        const response = await axios.post('https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/', {
            app_id: process.env.TIKTOK_API_APP_ID,
            auth_code: auth_code,
            secret: process.env.TIKTOK_API_SECRET
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log('tiktok auth response: ', response.data);
        // res.cookie('accessToken', response.data.data.access_token);
        // localStorage.setItem("x-tiktok-access-token", response.data.data.access_token);
        if(response.data.code === 0) {
            // req.session.tiktokAccessToken = JSON.stringify(response.data.data);
            // await req.session.save();
            // console.log(req.session);

            await TiktokAccessTokenDB.create({
                shop: 'quickstart-4a029195.myshopify.com',
                shopify_session_id: 'offline_quickstart-4a029195.myshopify.com',
                access_token: response.data.data.access_token,
                advertiser_ids: response.data.data.advertiser_ids.join(",")
            })
            // console.log(res.locals.shopify);
            // res.locals.shopify.session['tiktok'] = req.session.tiktokAccessToken
            // res.redirect('/api/success');
            res.redirect(`${APP_URL}?${SHOP_QUERY_PARAMS}`);
        } else {
            res.send('Login fail');
        }
    })

    app.get('/api/success', async (req, res) => {
        console.log('success session: ', req.session);
        // res.send('Login success');
        res.redirect(`${APP_URL}?${SHOP_QUERY_PARAMS}`);
    })

    // app.get('/api/check-tiktok-auth', async (req, res) => {
    //     res.send(req.session.tiktokAccessToken);
    // })
}
