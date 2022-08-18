# vault-fake-api-server

A 'naughty' web server that hosts some endpoints that Vault might expect for the Vault API

Running `node index.js` starts a web server using Express that has routes configured for the following endpoints:

- `GET: /v1/sys/seal-status`
- `GET: /v1/auth/token/lookup-self`

Each has a handler that will redirect to a specified URL (e.g. `http://host:port/bad`), that URL also has a handler configured to log out the contents of the headers if it gets an incoming request, it also can serve a 200 or 404 to the caller (see issue below for further details on this).

The reasoning behind the tiny piece of code is that the Vault CLI (Client) can be called specifying the `--address` flag which causes the client to make the call elsewhere, however if the client recieves a `302` redirect, it should not be followed according to our source code.

For more information on this issue please see: [Vault security issue 235](https://github.com/hashicorp/security-vulnerabilities/issues/235).

In order to reproduce the issue you will need Vault (OSS) which needs to be started in `dev` mode:

`vault server --dev`

Once the server is running you can use another terminal/tab issue commands to the Vault CLI (passing the `--address` flag):

`vault token lookup --address="http://localhost:8400"`

Or...

`vault status`

In the terminal/tab you are running `Node.js` you should see the incoming requests, redirection and the headers that are receieved output.
