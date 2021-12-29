const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
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
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  app.get("/", (req, res) => {
    res.send("please go to /react");
  });

  app.use(express.static(path.resolve(__dirname, "../client/react/build")));
  app.get("/react", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../client/react/build", "index.html")
    );
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
  });

  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log("Server ready");
})();
