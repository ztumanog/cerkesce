export const conceptNetworkOpenAPISpec = {
  openapi: "3.0.3",
  info: {
    title: "Cerkesce Knowledge Engine - Discovery API Gateway",
    version: "1.0.0",
    description: "API Gateway contract for interactive concept network projection layer."
  },
  servers: [
    { url: "/api/v1", description: "API v1" }
  ],
  paths: {
    "/discovery/concept-network": {
      get: {
        summary: "Fetch Interactive Concept Network Graph",
        operationId: "getConceptNetwork",
        tags: ["Discovery Engine"],
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Target concept root or query text",
            schema: { type: "string", minLength: 1 }
          },
          {
            name: "max_nodes",
            in: "query",
            required: false,
            description: "Maximum node count limit (Guardrail ceiling: 500)",
            schema: { type: "integer", default: 500, minimum: 1, maximum: 500 }
          }
        ],
        responses: {
          "200": { description: "Canonical Concept Network DTO" },
          "400": { description: "Missing or invalid query parameter" },
          "429": { description: "Too many requests" },
          "500": { description: "Internal server error" }
        }
      }
    },
    "/discovery/explore": {
      get: {
        summary: "Explore Concept",
        operationId: "explore",
        tags: ["Discovery Engine"],
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            schema: { type: "string", minLength: 1 }
          },
          {
            name: "dialect",
            in: "query",
            required: false,
            schema: { type: "string", enum: ["KBD", "ADY"] }
          }
        ],
        responses: {
          "200": { description: "Exploration result" },
          "400": { description: "Invalid request" },
          "500": { description: "Internal server error" }
        }
      }
    },
    "/discovery/concept/{id}": {
      get: {
        summary: "Get Concept Details",
        operationId: "getConceptDetails",
        tags: ["Discovery Engine"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" }
          }
        ],
        responses: {
          "200": { description: "Concept details" },
          "404": { description: "Concept not found" },
          "500": { description: "Internal server error" }
        }
      }
    }
  }
};
