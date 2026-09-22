# app/api/v1/endpoints/discovery.py

from fastapi import APIRouter, Query, HTTPException, status
from typing import Optional
from app.application.facades.discovery_facade import DiscoveryFacade
from app.application.adapters.concept_graph_adapter import ConceptGraphAdapter
from app.application.dtos.concept_network_dto import ConceptNetworkDTO

router = APIRouter(prefix="/api/v1/discovery", tags=["Discovery"])

# Facade ve Adapter bağımlılıkları (Dependency Injection)
discovery_facade = DiscoveryFacade()
concept_graph_adapter = ConceptGraphAdapter(max_nodes=500)

@router.get(
    "/concept-network",
    response_model=ConceptNetworkDTO,
    status_code=status.HTTP_200_OK,
    summary="Interactive Concept Network Graph Endpoint",
    description="Query semantic concept network, projection adapter and guardrail limits applied."
)
async def get_concept_network(
    q: str = Query(..., min_length=1, description="Search query or concept root (e.g. 'water')"),
    max_nodes: Optional[int] = Query(500, ge=1, le=500, description="Maximum nodes limit (Guardrail ceiling: 500)")
):
    try:
        # 1. Discovery Facade üzerinden ham semantic sonucu al
        discovery_result = await discovery_facade.discover_concepts(query_text=q)
        
        # 2. Concept Graph Adapter ile Canonical ConceptNetworkDTO'ya dönüştür
        network_dto = concept_graph_adapter.to_concept_network(
            discovery_result=discovery_result,
            max_nodes_limit=max_nodes
        )
        
        return network_dto

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error executing concept network discovery: {str(e)}"
        )