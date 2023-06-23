import axios from "axios"

export default function applyTiktokEndpoint(app) {
    /**
     * Send request to authorize on Tiktok API
     */
    app.post('/api/authorization', async (req, res) => {
        console.log(process.env.TIKTOK_API_APP_ID);
        const auth_code = "469d76c83cafca6f05b908bece0192152cd3be16";
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
}
