import express from "express";
import { Request } from "express";
import { db } from "./prisma/db";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { notEqual } from "assert";
import { create } from "domain";

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(
  cors({
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  })
);

app.listen(port, () => {
  console.log(`PokeTracker server listening on port ${port}`);
});

app.get("/list", (req, res) => {
  res.send("Hello World");
});

type ReqDictionary = {};
type ReqBody = {
  name: string;
  dex_number: number;
  type_1: string;
  type_2: string;
  image_url: string;
  caught:string
};
type ReqQuery = {
  filter_name?: string;
  dex_number: string;
  type_1: string;
  type_2: string;
  emailid: string;
  pass: string;
  user_id: string;
  caught:string;
};
type ReqCreateQuery = {
  name: string;
  dex_number: number;
  type_1: string;
  type_2: string;
  image_url: string;
  user_id: string;
  caught: string
};
type ResBody = any;

type SomeHandlerRequest = Request<ReqDictionary, ResBody, ReqBody, ReqQuery>;
type CreateHandlerRequest = Request<
  ReqDictionary,
  ResBody,
  ReqBody,
  ReqCreateQuery
>;

app.post("/pokelist", async (req: SomeHandlerRequest, res) => {
  // console.log(req.query.filter_name)
  let obj = {};
  if (req.query.filter_name != "") {
    obj["name"] = { startsWith: req.query.filter_name };
  }
  if (req.query.dex_number != "") {
    obj["dex_number"] = +req.query.dex_number;
  }
  if (req.query.type_1 != "") {
    obj["type_1"] = req.query.type_1;
  }
  if (req.query.type_2 != "") {
    obj["type_2"] = req.query.type_2;
  }

  const posts = await prisma.pokemon.findMany({
    where: obj,
  });

  res.json(posts);
});

app.get("/login", async (req: SomeHandlerRequest, res) => {
  const user = await prisma.user.findMany({
    where: {
      email: req.query.emailid,
      password: req.query.pass,
    },
  });
  res.json(user);
});

app.post("/create", async (req: CreateHandlerRequest, res) => {
  const result: any =
    await prisma.$queryRaw`SELECT * FROM User WHERE id = ${+req.query.user_id}`;

  console.log(result[0]);
  if (!result[0].is_admin) {
    return res.status(500).json({
      message: "You are not an admin",
    });
  }

  const { name, dex_number, type_1, type_2 } = req.query;
  const pokemon = await prisma.pokemon.create({
    data: { name, dex_number: +dex_number, type_1, type_2,caught:false },
  });
  res.json(pokemon);
});

app.delete("/delete", async (req: CreateHandlerRequest, res) => {
  // try {
  // const { dex_number} = req.params
  const result: any =
    await prisma.$queryRaw`SELECT * FROM User WHERE id = ${+req.query.user_id}`;
  if (!result[0].is_admin) {
    return res.status(500).json({
      message: "You are not an admin",
    });
  }

  const deletedUser = await prisma.pokemon.delete({
    where: {
      dex_number: +req.query.dex_number,
    },
  });

  res.json(deletedUser);
  // }
  // catch (error) {
  //   res.status(500).json({
  //     message: "Something went wrong",
  //   })
  // }
});




app.put("/update", async (req: CreateHandlerRequest, res) => {
  // try {
  const result: any =
    await prisma.$queryRaw`SELECT * FROM User WHERE id = ${+req.query.user_id}`;
  if (!result[0].is_admin) {
    return res.status(500).json({
      message: "You are not an admin",
    });
  }

  const updateUser = await prisma.pokemon.upsert({
    where: {
      dex_number: +req.query.dex_number,
    },
    update: {
      name: req.query.name,
    },
    create: {
      dex_number: +req.query.dex_number,
      name: req.query.name,
      type_1: req.query.type_1,
      type_2: req.query.type_2,
      caught:false
    },
  });

  res.json(updateUser);
});



app.put("/catch", async (req: CreateHandlerRequest, res) => {
  // try {
  const updateUser = await prisma.pokemon.update({
    where: {
      dex_number: +req.query.dex_number,
    },
    data: {
      caught: JSON.parse(req.query.caught),
    }
    
  });

  res.json(updateUser);
});