import IndividualService from '../services/IndividualService';
import LeadTriglobalService from '../services/LeadTriglobalService';
import OpportunityService from '../services/OpportunityService';
import CustomFieldsOpportunityService from '../services/CustomFieldsOpportunityService';

const leadTriglobalService = new LeadTriglobalService(); 
const individualService = new IndividualService();
const opportunityService = new OpportunityService();
const customFieldsOpportunityService = new CustomFieldsOpportunityService(); 


export default defineEventHandler (async (event) => {

    // const data = await response.json();

    // reception des leads entrants 
    const body = await readBody(event); 
    const leadData = await leadTriglobalService.processLeadData(body)
    console.log("Lead recu de Triglobal : \n", leadData)
     
    /* 
    // Test 1 - methode getSellsyIndividuals OK 
    individualService.getSellsyIndividuals()
        .then(data => console.log(data))
        .catch(error => console.error(error));

    */ 

    
    // // Test 2 - La recuperation des particuliers deja presents OK
    // try {
    //     const individuals = await individualService.getSellsyIndividuals();
    //     setResponseStatus(event, 200);
    //     return individuals
    // } catch (error) {
    //     setResponseStatus(event, 404);
    //     return  { error: 'Failed to fetch the individual datas in Sellsy'}
    // }
    

    
    // Test 3 - La creation d'un particulier dans Sellsy 
        // const individual = await individualService.extractIndividualData(body)
        // console.log("L'individu à creer est : ", individual)
        // const createdIndividual = await individualService.createIndividual(individual) as {id :number };
        // setResponseStatus(event, 200);
        // console.log("L'individu créé est : ", createdIndividual)
        // return createdIndividual

    // Test 4 - Ajout d'une adresse dans le particulier créé 
        const individual = await individualService.extractIndividualData(body)
        console.log("L'individu à creer est : ", individual)
        const createdIndividual = await individualService.createIndividual(individual) as {id :number };
        setResponseStatus(event, 200);
        console.log("L'individu créé est : ", createdIndividual)
        const createAddressIndividual = await individualService.createAddressIndividual(createdIndividual.id, individual)
        return createAddressIndividual
     


})
