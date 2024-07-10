import IndividualService from '../services/IndividualService';
import LeadTriglobalService from '../services/LeadTriglobalService';
import OpportunityService from '../services/OpportunityService';
import CustomFieldsOpportunityService from '../services/CustomFieldsOpportunityService';
import { usePostCounterStore } from '../stores/postCounter';
import { createPinia, setActivePinia } from 'pinia';


export default defineEventHandler(async (event) => {

  // const postCounterStore = usePostCounterStore();

  const leadTriglobalService = new LeadTriglobalService(); 
  const individualService = new IndividualService();
  const opportunityService = new OpportunityService();
  const customFieldsOpportunityService = new CustomFieldsOpportunityService(); 


  const body = await readBody(event)
  // if(body) {
  //   // Incrémenter le compteur de leads reçus
  //   postCounterStore.incrementPostCount();
  // }
  // const data = await response.json();

  // reception des leads entrants 
  const leadData = await leadTriglobalService.processLeadData(body)
  console.log("Lead recu de Triglobal : \n", leadData)

  // creation particulier 
  const individual = await individualService.extractIndividualData(body)
  const createdIndividual = await individualService.createIndividual(individual) as { id: number , main_contact_id : number};
  const createAddressIndividual = await individualService.createAddressIndividual(createdIndividual.id, individual)

  // creation opportunité
  const opportunity = await opportunityService.extractOpportunityData(body);
  opportunity.individual_id = createdIndividual.id;
  opportunity.contact_ids.push(createdIndividual.main_contact_id); 
  opportunity.related.push({ id: createdIndividual.id , type: 'individual' });
  const createdOpportunity = await opportunityService.createOpportunity(opportunity) as { id: number };
  // if(createdOpportunity) postCounterStore.incrementOpportunityCount();
  // const pipelineSteps = await opportunityService.getSellsyPipelineStep(31762)


  // création champs personnalisé
  const customFieldsOpportunity = await customFieldsOpportunityService.extractCustomFieldsData(body)
  const customFieldsOpportunityUpdated = await customFieldsOpportunityService.updateCustomFieldsData(customFieldsOpportunity, createdOpportunity.id);
  console.log("Les champs personnalisés ont bien ete mis à jour : ", customFieldsOpportunityUpdated)


  return {
    // LeadTriglobal : leadData,
    Particulier : createdIndividual,
    Opportunité : createdOpportunity,
    // pipelineSteps : pipelineSteps
    CustomFieldOpportunity : customFieldsOpportunityUpdated
  }
    
});