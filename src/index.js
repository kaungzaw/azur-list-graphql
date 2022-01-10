const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const path = require("path");
const express = require("express");
const http = require("http");

const {
  typeDefs: ShipTypeDefs,
  resolvers: ShipResolvers,
} = require("./modules/Ship");
const {
  typeDefs: EquipmentTypeDefs,
  resolvers: EquipmentResolvers,
} = require("./modules/Equipment");

(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs: [ShipTypeDefs, EquipmentTypeDefs],
    resolvers: [ShipResolvers, EquipmentResolvers],
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  app.get("/", (req, res) => {
    res.send("please go to /react");
  });

  app.use(
    "/react",
    express.static(path.resolve(__dirname, "../client/react/build"))
  );
  app.get("/react", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/react/build", "index.html"));
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log("Server ready at http://localhost:4000");
})();
