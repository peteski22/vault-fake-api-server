import chalk from "chalk";
import express from "express";

const app = express();
const port = 8400;

const apiSealStatus = "/v1/sys/seal-status";
const apiLookupSelf = "/v1/auth/token/lookup-self";
const redirectLocation = `http://localhost:${port}/bad`;

app.get(`${apiSealStatus}`, (req, res) => {
  // prettier-ignore
  console.log(chalk.yellow(`Request: ${apiSealStatus}, redirecting to ${redirectLocation}`));
  res.redirect(302, `${redirectLocation}`);
});

app.get(`${apiLookupSelf}`, (req, res) => {
  // prettier-ignore
  console.log(chalk.yellow(`Request: ${apiLookupSelf}, redirecting to ${redirectLocation}`));
  res.redirect(302, `${redirectLocation}`);
});

app.get("/bad", (req, res) => {
  console.log(chalk.red("Vault was redirected here!"));
  console.log(req.rawHeaders);

  // Send either 200 or 404
  //res.send("!Partial 200 response");
  res.status(404);
  res.send("This is an example of the full message of a 404 response");
});

app.listen(port, () =>
  console.log(chalk.green(`Server started on http://localhost:${port}`))
);
