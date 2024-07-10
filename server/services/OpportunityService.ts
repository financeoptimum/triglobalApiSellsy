import CredentialsSellsyService from "../services/CredentialsSellsyService"

import fetch from 'node-fetch';
import dotenv from 'dotenv';
import individual from "../routes/individual";
import opportunity from "../routes/opportunity";

dotenv.config();
const credentialsSellsyService = new CredentialsSellsyService(); 


export default class OpportunityService {

    async getCurrentDateTime () {
        const now = new Date();
        const year = now.getUTCFullYear();
        const month = String(now.getUTCMonth() + 1).padStart(2, '0');
        const day = String(now.getUTCDate()).padStart(2, '0');
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    };
    
    async extractOpportunityData (lead: any) {
        // extraire des leads entrants les données permettant de creer une opportunité
        const opportunity = {
            name: lead.lead_id + " " + lead.full_name + " " + lead.pickup_zipcode + " " + lead.pickup_city + " " + lead.delivery_city,
            pipeline: 31762, // "Demande de devis"
            step: 220733,  // "1- Lead received - Email automatique activé"
            amount : "0", // montant potentiel 
            probability : 0,
            source: 71453, // Triglobal par defaut 
            due_date : lead.moving_date,
            note : "Type de demande : " + lead.request_type + '\n'  
            + "Move size : " + lead.moving_size + '\n'
            + "GM Storage : " + lead.storage + '\n'
            + "Service d'emballage : " + lead.packing + '\n'
            + "Service remontage meuble : " + lead.assembly + '\n'
            + "Professionnel : " + lead.business + '\n'
            + lead.remarks ,
            individual_id : 0,
            contact_ids : [] as any, // la liste des contacts liées ? 
            main_doc_id : null, // id d'un document lié à l'opportunité (par exemple un devis)
            assigned_staff_ids: [80176], // liste des id des collaborateurs affectés à cet opportunité (ici JPBiard)
            related : [] as any, // liste des particuliers et societés liés à cet opportunité
            // number: "", // identifiant de l'opportunité autogeneré par Sellsy à la creation de l'opportunité
            created: await this.getCurrentDateTime(),
        }
        return opportunity;
    };

    async getSellsyOpportunities (){
        const token = await credentialsSellsyService.getSellsyToken();
        const apiUrl = 'https://api.sellsy.com/v2/opportunities?limit=100';
    
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });
    
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        const opportunities = await response.json();
        console.log("Les opportunites presents dans Sellsy : ", opportunities)
        return opportunities;
    };

    async getSellsyPipelineStep (pipelineId : number){
        const token = await credentialsSellsyService.getSellsyToken();
        const apiUrl = `https://api.sellsy.com/v2/opportunities/pipelines/${pipelineId}/steps`;
    
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });
    
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        const pipelineSteps = await response.json();
        console.log("Les opportunites presents dans Sellsy : ", pipelineSteps)
        return pipelineSteps;
    }; 

    
    async createOpportunity(opportunityData: any) {
        const token = await credentialsSellsyService.getSellsyToken();

        const apiUrl =  `https://api.sellsy.com/v2/opportunities`
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(opportunityData),
        });


        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const opportunityCreated = await response.json(); 
        console.log("L'opportunité créé :", opportunityCreated )
        return opportunityCreated;
    }


}