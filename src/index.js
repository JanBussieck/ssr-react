import compression from "compression";
import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import products from "../products";

const app = express();

app.use(compression());

app.use("/static", express.static(path.resolve(__dirname, "public")));

app.get("/products*", (req, res) => {
  const context = {};

  const html = `
    <!doctype html>
      <html>
      <head>
        <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <style>
          body { font-family: Arial, sans-serif; font-size: 15px; }
        </style>
        <script>window.__INITIAL__DATA__ = ${JSON.stringify(products)}</script>
      </head>
      <body>
        <h2>Remains static</h2>
        <div id="root">
          <ul>
            <li>
              Winkelmessgerät B
            </li>
            <li>
              Längenmessgerät B
            </li>
            <li>
              Winkelmessgerät A
            </li>
            <li>
              Längenmessgerät A
            </li>
          </ul>
        </div>

        <div class="footer">
          I am also static
        </div>

        <script src="/static/clientHome.js"></script>
      </body>
      </html>`;

  if (context.url) {
    res.writeHead(301, { Location: context.url });
    res.end();
  } else {
    res.send(html);
  }
});

app.get("/productData.json", (req, res) => {
  const category = req.query.category || 'all';
  const productData = products.index;
  if (category === 'all') {
  res.json({ products: productData });
  } else {
    const filteredProducts = productData.filter((prod) => (prod.category === category));
    res.json({ products: filteredProducts });
  }
});

app.get("*", (req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; font-size: 15px; }
          h1 { color: #c7c7c7; text-align: center; }
        </style>
      </head>

      <body>
        <h1>404 - Not Found</h1>
      </body>
    </html>`);
});

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log("######## app running ########"));
