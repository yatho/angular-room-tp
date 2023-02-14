// import express, { Express, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { readFileSync } from "fs";
import { urlencoded, json } from "body-parser";
import { create, router } from 'json-server';

const DEFAULT_PORT = 3000;
const port = process.env.PORT ?? DEFAULT_PORT;
const server = create();

server.use(urlencoded({ extended: true }));
server.use(json());

// Gestion de l'authent
const SECRET_KEY = "123456789";
const expiresIn = "1h";
const userdb = JSON.parse(
  readFileSync("./users.json", {
    encoding: "utf-8",
  })
);

type User = {
  email: string;
  password: string;
};

// Create a token from a payload
function createToken(payload: {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}) {
  return sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token: string) {
  return verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated(email: string, password: string) {
  return userdb.users.find(
    (user: User) => user.email === email && user.password === password
  );
}

// Route de login
server.post("/auth/login", (req, res) => {
  console.log("got a query auth");
  const { email, password } = req.body;
  const user = isAuthenticated(email, password);
  if (!user) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const userToReturn = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: email,
  };
  const access_token = createToken(userToReturn);
  res.status(200).json({ token: access_token, user: userToReturn });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  console.log("got a query not auth");
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";
    res.status(status).json({ status, message });
    return;
  }
  try {
    verifyToken(req.headers.authorization.split(" ")[1]);
    if (req.method === "POST") {
      req.body.createdAt = Date.now();
    }
    if (req.method === "PUT") {
      req.body.updatedAt = Date.now();
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error: access_token is not valid";
    res.status(status).json({ status, message });
  }
});

server.use(router('./db.json'));

server.listen(port, () => {
  console.log("Run Auth API Server");
});
