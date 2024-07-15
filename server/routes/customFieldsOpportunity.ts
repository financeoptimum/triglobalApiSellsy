import IndividualService from '../services/IndividualService';
import LeadTriglobalService from '../services/LeadTriglobalService';
import OpportunityService from '../services/OpportunityService';
import CustomFieldsOpportunityService from '../services/CustomFieldsOpportunityService';

const leadTriglobalService = new LeadTriglobalService(); 
const individualService = new IndividualService();
const opportunityService = new OpportunityService();
const customFieldsOpportunityService = new CustomFieldsOpportunityService(); 

export default defineEventHandler (async (event) => {

    const customFieldsOpportunityService = new CustomFieldsOpportunityService();

    
    // Test 1 - Recuperer la liste des champs personnalisés 
        const customFieldOpportunity = await customFieldsOpportunityService.getSellsyCustomFields(10852545); // prenons l'opportunite de nom : 1539 TEST API OPPORTUNITE PERCENT 14 75001 Paris New York et dont id = 10852545 pour des questions de test
        setResponseStatus(event, 200);  
        return customFieldOpportunity
        try {
            const customFieldOpportunity = await customFieldsOpportunityService.getSellsyCustomFields(55545291); // prenons l'opportunite de nom : 1539 TEST API 9 RECUPERATION ID LEAD SOURCE  75001 Paris New York et dont id = 10687351 pour des questions de test
            setResponseStatus(event, 200);
            return customFieldOpportunity
        } catch (error) {
            setResponseStatus(event, 404);
            return  { error: 'Failed to fetch the individual datas in Sellsy'}
        }

    // Test 2 - création champs personnalisés pour une opportunité (ici l'opportunité d'id = 55545291)
        // reception des leads entrants 
        // const body = await readBody(event); 
        // const leadData = await leadTriglobalService.processLeadData(body);
        // console.log("Lead recu de Triglobal : \n", leadData);
        
        // const customFieldsOpportunity = await customFieldsOpportunityService.extractCustomFieldsData(body);
        // const customFieldsOpportunityUpdated = await customFieldsOpportunityService.updateCustomFieldsData(customFieldsOpportunity,10687351);
        // console.log("Les champs personnalisés ont bien ete mis à jour : ", customFieldsOpportunityUpdated);


})
