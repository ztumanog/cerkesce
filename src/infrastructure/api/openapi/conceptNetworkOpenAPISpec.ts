export const conceptNetworkOpenAPISpec = {
  openapi: "3.0.3",
  info: {
    title: "Çerkesçe Knowledge Engine - Discovery API Gateway",
    version: "1.0.0",
    description: "API Gateway contract for interactive concept network projection layer."
  },
  paths: {
    "/api/v1/discovery/concept-network": {
      get: {
        summary: "Fetch Interactive Concept Network Graph",
        operationId: "getConceptNetwork",
        tags: ["Discovery Engine"],
        parameters: [
          {
            name: "q",
            in: "query",
            required: true,
            description: "Target concept root or query text (e.g. 'water')",
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
          "200": {
            description: "Canonical Concept Network DTO Payload",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    nodes: { type: "array" },
                    edges: { type: "array" },
                    metadata: {
                      type: "object",
                      properties: {
                        schemaVersion: { type: "string", example: "1.0.0" },
                        isDirected: { type: "boolean", example: true },
                        isTruncated: { type: "boolean", example: false },
                        nodeCount: { type: "integer" },
                        edgeCount: { type: "integer" }
                      }
                    }
                  }
                }
              }
            }
          },
          "400": { description: "Missing or invalid query parameter" },
          "500": { description: "Internal server processing error" }
        }
      }
    }
  }
};
