/*
  This file interacts with the app's database and is used by the app's REST APIs.
*/

import sqlite3 from "sqlite3";
import path from "path";

const DEFAULT_DB_FILE = path.join(process.cwd(), "tiktok-access-token.sqlite");

export const TiktokAccessTokenDB = {
  tiktokAccessTokenTableName: "tiktok_access_token",
  db: null,
  ready: null,

  getByShopifySessionId: async function ({id}) {
    await this.ready;

    const query = `
      SELECT * FROM ${this.tiktokAccessTokenTableName} WHERE shopify_session_id = ?;
    `

    const rawResults = await this.__query(query, [
      id
    ]);


    return rawResults[0];
  },

  create: async function ({
    shop,
    shopify_session_id,
    access_token,
    advertiser_ids
  }) {
    await this.ready;

    const query = `
      INSERT INTO ${this.tiktokAccessTokenTableName}
      (shop, shopify_session_id, access_token, advertiser_ids)
      VALUES (?, ?, ?, ?)
      RETURNING id;
    `;

    const rawResults = await this.__query(query, [
        shop,
        shopify_session_id,
        access_token,
        advertiser_ids
    ]);

    return rawResults[0].id;
  },

  update: async function (
    id,
    {
        shop,
        shopify_session_id,
        access_token,
        advertiser_ids
    }
  ) {
    await this.ready;

    const query = `
      UPDATE ${this.tiktokAccessTokenTableName}
      SET
        shop = ?,
        shopify_session_id = ?
        access_token = ?,
        advertiser_ids = ?
      WHERE
        id = ?;
    `;

    await this.__query(query, [
        shop,
        shopify_session_id,
        access_token,
        advertiser_ids,
        id,
    ]);
    return true;
  },

  delete: async function (id) {
    await this.ready;
    const query = `
      DELETE FROM ${this.tiktokAccessTokenTableName}
      WHERE id = ?;
    `;
    await this.__query(query, [id]);
    return true;
  },

  /* Private */

  /*
    Used to check whether to create the database.
    Also used to make sure the database and table are set up before the server starts.
  */

  __hasTiktokAccessTokenTable: async function () {
    const query = `
      SELECT name FROM sqlite_schema
      WHERE
        type = 'table' AND
        name = ?;
    `;
    const rows = await this.__query(query, [this.tiktokAccessTokenTableName]);
    return rows.length === 1;
  },

  /* Initializes the connection with the app's sqlite3 database */
  init: async function () {

    /* Initializes the connection to the database */
    this.db = this.db ?? new sqlite3.Database(DEFAULT_DB_FILE);

    const hasTiktokAccessTokenTable = await this.__hasTiktokAccessTokenTable();

    if (hasTiktokAccessTokenTable) {
      this.ready = Promise.resolve();

      /* Create the QR code table if it hasn't been created */
    } else {
      const query = `
        CREATE TABLE ${this.tiktokAccessTokenTableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
          shopify_session_id VARCHAR(511) NOT NULL,
          shop VARCHAR(511) NOT NULL,
          access_token VARCHAR(511) NOT NULL,
          advertiser_ids VARCHAR(511) NOT NULL,
          createdAt DATETIME NOT NULL DEFAULT (datetime(CURRENT_TIMESTAMP, 'localtime')),
          FOREIGN KEY(shopify_session_id) REFERENCES shopify_sessions(id)
        )
      `;

      /* Tell the various CRUD methods that they can execute */
      this.ready = this.__query(query);
    }
  },

  /* Perform a query on the database. Used by the various CRUD methods. */
  __query: function (sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },
};
