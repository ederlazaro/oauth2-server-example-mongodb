const oauthMiddlewares = require("./oauthServerMiddlewares");
const usersController = require("./controllers/users");
const clientsController = require("./controllers/clients");

function initialize(app) {
  app.all("/oauth/token", oauthMiddlewares.token);

  app.get("/oauth/authorize", oauthMiddlewares.authorize);
  app.get("/oauth/callback", function (req, res) {
    const code = req.query.code;
    res.render("callback", { authorizationCode: code });
  });
  app.post("/oauth/authorize", oauthMiddlewares.authorize);

  app.get("/secure", oauthMiddlewares.authenticate, (req, res) => {
    res.json({ message: "Secure data" });
  });

  app.post("/users", usersController.createUser);

  app.post("/clients", clientsController.createClient);
  app.get("/clients", clientsController.getClient);
}

module.exports = initialize;
