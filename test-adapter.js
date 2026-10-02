const result = {
  conceptId: 'WATER',
  relatedConcepts: [
    { conceptId: 'ICE', label: 'Ice', score: 1.0, relationType: 'STATE_OF' }
  ],
  contextClusters: [
    { clusterId: 'state', label: 'State', concepts: [{ conceptId: 'ICE' }] }
  ]
};
console.log(JSON.stringify(result, null, 2));
