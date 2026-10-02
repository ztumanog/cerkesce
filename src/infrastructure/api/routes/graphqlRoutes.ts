/**
 * GraphQL Route
 * ADR-GOV-005: API Gateway olgunlastirma
 *
 * POST /api/v1/graphql
 */

import { Router } from 'express';
import { resolvers } from '../graphql/resolvers';

const graphqlRouter = Router();

graphqlRouter.post('/graphql', async (req, res) => {
  const { query, variables } = req.body;

  if (!query) {
    res.status(400).json({ error: 'GraphQL query is required.' });
    return;
  }

  try {
    if (query.includes('conceptNetwork')) {
      const q = variables?.q || req.body.q;
      const result = await resolvers.Query.conceptNetwork(null, { q, maxNodes: variables?.maxNodes });
      res.status(200).json({ data: { conceptNetwork: result } });
    } else if (query.includes('explore')) {
      const q = variables?.q || req.body.q;
      const result = await resolvers.Query.explore(null, { q, dialect: variables?.dialect });
      res.status(200).json({ data: { explore: result } });
    } else if (query.includes('concept')) {
      const id = variables?.id || req.body.id;
      const result = await resolvers.Query.concept(null, { id });
      res.status(200).json({ data: { concept: result } });
    } else {
      res.status(400).json({ error: 'Unsupported GraphQL query.' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export { graphqlRouter };
