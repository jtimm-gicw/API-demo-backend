// auth/auth.js
// ======================================
// STEP 17: Auth0 Authorization Middleware
//
// This middleware verifies that every JWT
// sent from the React application is valid.
//
// If the JWT is valid,
// request.user will contain the user's
// Auth0 profile information.
//
// Otherwise, Express returns
// "Not Authorized."
// ======================================

import dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

// ======================================
// Middleware
// ======================================

function verifyUser(request, response, next) {

  function valid(err, user) {

    if (err) {
      return next(err);
    }

    request.user = user;

    next();

  }

  try {

    const token = request.headers.authorization.split(" ")[1];

    jwt.verify(token, getKey, {}, valid);

  } catch (error) {

    next("Not Authorized");

  }

}

// ======================================
// Connect to Auth0
// ======================================

//Debugging:
console.log(
  "AUTH.JS JWKS URI:",
  process.env.JWKS_URI
);

const client = jwksClient({
  // Go to .env file and add JWKS_URI=https://dev-s66j4v7lvc31ijyp.us.auth0.com
  jwksUri: process.env.JWKS_URI, // Go to Auth0 dashboard → Applications → APIs → Settings → JSON Web Key Set URL
/* 
NOTE: How it works -->
backend/.env
      │
      ▼
dotenv.config()
      │
      ▼
process.env.JWKS_URI
      │
      ▼
auth.js
      │
      ▼
jwksClient()
      │
      ▼
Verifies every JWT from Auth0
*/
});

// ======================================
// Get Auth0 Signing Key
// ======================================

function getKey(header, callback) {

  client.getSigningKey(header.kid, function (err, key) {

    if (err) {
      console.log("❌ Auth0 signing key error:", err);
      return callback(err);
    }

    const signingKey = key.publicKey || key.rsaPublicKey;

    callback(null, signingKey);

  });

}

// ======================================
// Export Middleware
// ======================================

export default verifyUser;