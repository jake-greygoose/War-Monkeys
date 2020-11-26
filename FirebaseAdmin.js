"use strict";
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "war-monkeys",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: "109552806464767246871",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CRT_URL,
  }),
  databaseURL: "https://war-monkeys.firebaseio.com",
});
module.exports = admin;
