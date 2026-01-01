import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8081",
  realm: "bjj",
  clientId: "bjj-front",
});

export default keycloak;
