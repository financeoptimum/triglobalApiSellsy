import OpportunityService from '../services/OpportunityService';
import IndividualService from '../services/IndividualService';
import LeadTriglobalService from '../services/LeadTriglobalService';
import CustomFieldsOpportunityService from '../services/CustomFieldsOpportunityService';

  const leadTriglobalService = new LeadTriglobalService(); 
  const individualService = new IndividualService();
  const opportunityService = new OpportunityService();
  const customFieldsOpportunityService = new CustomFieldsOpportunityService(); 

export default defineEventHandler (async (event) => {

    // const body = await readBody(event);
    
    // Test 1 - Recuperation des opportunités presents dans Sellsy 
    // try {
    //     const opportunity = await opportunityService.getSellsyOpportunities();
    //     setResponseStatus(event, 200);
    //     console.log("OK")
    //     return opportunity  
    // } catch (error) {
    //     setResponseStatus(event, 404);
    //     return  { error: 'Failed to fetch the individual datas in Sellsy'}
    // }

    // Test 3 - La creation d'une opportunité dans Sellsy 
        const opportunitiesSellsy = await opportunityService.getSellsyOpportunities()
        return opportunitiesSellsy;
        // const opportunity = await opportunityService.extractOpportunityData(body)
        // opportunity.related.push({ related_id: createdIndividual.id , related_type: 'individual' });
        // const createdOpportunity = await opportunityService.createOpportunity(opportunity)as { id: number };

    // Test 9 - Recuperation des id des pipelines Step presents dans Sellsy 
        // const pipelineSteps = await opportunityService.getSellsyPipelineStep(31762) // id du pipeline "Demande de devis" = 31762
        // return pipelineSteps; 
 

})
