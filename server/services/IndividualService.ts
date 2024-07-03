import CredentialsSellsyService from "../services/CredentialsSellsyService"

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const credentialsSellsyService = new CredentialsSellsyService(); 

export default class IndividualService {


    async extractIndividualData (lead: any) {
        // extraire des leads entrants de Triglobal les donnees permettant de creer un particulier
        const individual = {
            type : "prospect", // forcé à prospect car à la creation d'une opportunité, le particulier est toujours un prospect. 
            last_name: lead.full_name, 
            // first_name: "", 
            email: lead.email,
            phone_number: lead.telephone1,
            invoicing_address: {
                name: lead.pickup_street + " " + lead.pickup_city + " " + lead.pickup_zipcode + " " + lead.pickup_country,
                address_line_1: lead.pickup_street,
                postal_code: lead.pickup_zipcode,
                city: lead.pickup_city,
                country: lead.pickup_country,
                country_code: lead.pickup_country.slice(0,2)
            }
        }
        return individual;
    }

    async getSellsyIndividuals (){
        const token = await credentialsSellsyService.getSellsyToken();
        const apiUrl = 'https://api.sellsy.com/v2/individuals';
    
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
    
        const individuals = await response.json();
        console.log("Les particuliers presents dans Sellsy : ", individuals)
        return individuals;
    };

    async createIndividual(individualData: any) {
        const token = await credentialsSellsyService.getSellsyToken();

        const apiUrl = `https://api.sellsy.com/v2/individuals`
    
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(individualData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const individualCreated = await response.json(); 
        console.log("Le particulier créé :", individualCreated )
        return individualCreated;
    }

    async createAddressIndividual(individualId : number, individualData: any){

        const token = await credentialsSellsyService.getSellsyToken();

        const apiUrl = `https://api.sellsy.com/v2/individuals/${individualId}/addresses`

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(individualData.invoicing_address),
        });

        // if (!response.ok) {
        //     throw new Error(`Error: ${response.statusText}`);
        // }
        const addressIndividualCreated = await response.json(); 
        console.log("L'adresse du particulier a été ajouté dans Sellsy :", addressIndividualCreated)
        return addressIndividualCreated;

    }

}