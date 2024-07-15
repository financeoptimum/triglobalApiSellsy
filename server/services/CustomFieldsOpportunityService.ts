import CredentialsSellsyService from "./CredentialsSellsyService"

import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const credentialsSellsyService = new CredentialsSellsyService(); 

type movingValue = "By myself" | "By moving compagny";

function mapEmballageValue(receivedValue: string): number | null {
    const mapping: { [key in movingValue]: number } = {
        "By myself": 3227207, // 3- Vous emballez et vous déballez tout
        "By moving compagny": 3227206 // 2- Le Déménageur emballe les objets fragiles et meubles uniquement
    };

    return mapping[receivedValue as movingValue] || null;
}

function mapAssemblyValue(receivedValue: string): number | null {
    const mapping: { [key in movingValue]: number } = {
        "By myself": 3227209, // Meubles démonté et remonté  par le Client
        "By moving compagny": 3227208 // Meubles démonté et remonté par le Déménageur
    }
    return mapping[receivedValue as movingValue] || null;
}



export default class CustomFieldsService {

    

    async extractCustomFieldsData (lead: any) {
        // extraire des leads entrants les données permettant de remplir les champs personnalisés d'une opportunité
        const customFieldsData = [
            // {
            //     id: 281329, // Id du champ personnalisé "Type de demande"
            //     code: "typedemande",
            //     value: lead.request_type // Nouvelle valeur pour ce champ
            // },
            // {
            //     "id": 266375, // ID du champ personnalisé "Volume prévu (m3)" // A valider par M. JPBIARD
            //     "code": "tailledemenagement",
            //     "value": lead.moving_size // Nouvelle valeur pour ce champ
            // },
            {
                "id": 31731, // ID du champ personnalisé "Volume prévu (m3)" // A valider par M. JPBIARD
                "code": "m3annonce",
                "value": lead.volume_m3 // Nouvelle valeur pour ce champ
            },
            // {
            //     "id": 281968,
            //     "code": "gmstorage",
            //     "value": lead.storage === "Yes" // La reponse est un boolean (Yes or No)
            // },
            // {
            //     "id": 49033,
            //     "code": "catemballage",
            //     "value": mapEmballageValue(lead.packing) 
            // }, 
            // {
            //     "id": 49034, 
            //     "code": "catremontage",
            //     "value": mapAssemblyValue(lead.assembly) // Nouvelle valeur pour ce champ
            // },
            // {
            //     "id": 281969, 
            //     "name": "Professionnel",
            //     "code": "professionnel",
            //     "value": lead.business === "Yes" // Nouvelle valeur pour ce champ
            // },
            {
                id : 42241, // ID du champ personnalisé "Origin Adresse Origine"
                code: "adressechgt",
                value: lead.pickup_street // Nouvelle valeur pour ce champ
            },
            {
                id: 100809, // ID du champ personnalisé "Origin CP Origine départ"
                code: "cporigindepart",
                value: lead.pickup_zipcode // Nouvelle valeur pour ce champ
            }, 
            {
                id: 42237, // ID du champ personnalisé "Origine Ville"
                code: "villeorigin",
                value: lead.pickup_city  // Nouvelle valeur pour ce champ
            },
            {
                id: 42239, // ID du champ personnalisé "Origine Pays"
                code: "originepays",
                value: lead.pickup_country // Nouvelle valeur pour ce champ
            },
            {
                id: 42240, // ID du champ personnalisé "Origine Région / Etat"
                code: "origineetatregion",
                value: lead.pickup_region // Nouvelle valeur pour ce champ
            },
            {
                id: 31721, // ID du champ personnalisé "Destination Adresse Livraison"
                code: "arriveeadresse",
                value: lead.delivery_street // Nouvelle valeur pour ce champ
            },
            {
                id: 42268, // ID du champ personnalisé "Destination CP"
                code: "livraisoncp",
                value: lead.delivery_zipcode // Nouvelle valeur pour ce champ
            },
            {
                id: 31718, // ID du champ personnalisé "Destination Ville"
                code: "villedest",
                value: lead.delivery_city // Nouvelle valeur pour ce champ
            },
            {
                id: 31719, // ID du champ personnalisé "Destination Pays"
                code: "paysdestination",
                value: lead.delivery_country // Nouvelle valeur pour ce champ
            },
            {
                id: 31720, // ID du champ personnalisé "Destination Région / Etat Destination"
                code: "destinationregionetat",
                value: lead.delivery_region // Nouvelle valeur pour ce champ
            },
            {
                id: 45528, // ID du champ personnalisé "Transport Type"
                code: "typetransport",
                value: 3254262 // 3254262 correspond à l'id du choix "Container Groupage"
            },
            {
                id: 45525, // ID du champ personnalisé "Transport Mode"
                code: "transportmode",
                value: 3215384 // 3215384 correspond à l'id du choix "Mer"
            },
            {
                id: 45526, // ID du champ personnalisé "Transport Expedition"
                code: "transportexpedition",
                value: 3215388 // 3215388 correspond à l'id du choix "Groupage"
            },
            {
                id: 45524, // ID du champ personnalisé "Assurance Garantie"
                code: "assurancegarantie",
                value: 3215380 // 3215380 correspond à l'id du choix "Gold"
            },
            {
                id: 50904, // ID du champ personnalisé "Assurance Taux de Prime"
                code: "assurancetauxprime",
                value: 3232726 // 3232726 correspond à l'id du choix "3%"
            },
            {
                id: 94835, // ID du champ personnalisé "Type Dossier"
                code: "type-dossier",
                value: 3391370 // 3391370 correspond à l'id du choix "DEM EXPORT"
            },


        ];
        
        return customFieldsData;
    };

    async getSellsyCustomFields (opportunityId : number){
        const token = await credentialsSellsyService.getSellsyToken();
        const apiUrl = `https://api.sellsy.com/v2/opportunities/${opportunityId}/custom-fields?limit=100`; // la limite par defaut c'est 25 or il y'a 102 champs personnalisés
    
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
    
        const customFieldOpportunity = await response.json();
        console.log("Les champs personnalisés des opportunités presents dans Sellsy : ", customFieldOpportunity)
        return customFieldOpportunity;
    };


    async updateCustomFieldsData(customFieldsData: any, opportunityId: number){
        const token = await credentialsSellsyService.getSellsyToken();
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    
        const apiUrl = `https://api.sellsy.com/v2/opportunities/${opportunityId}/custom-fields`;
        const response = await fetch(apiUrl, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(customFieldsData)
        });

        // if (!response.ok) {
        //     throw new Error(`Error: ${response.statusText}`);
        // }
        const response_error = await response.json();
        return response_error
        console.log("Les champs personnalisés des opportunités presents dans Sellsy !")

    }
}