export default class LeadTriglobalService {

    async processLeadData (data : any) {
        // Extraire et traiter les données nécessaires des leads entrants 
        const necessaryData = {
            lead_id: data.lead_id, 
            lead_source: data.lead_source, 
            request_type: data.request_type, 
            moving_date: data.moving_date, 
            moving_size: data.moving_size, 
            volume_m3: data.volume_m3, 
            storage: data.storage, 
            packing: data.packing, 
            assembly: data.assembly, 
            business: data.business, 
            pickup_street: data.pickup_street || "", 
            pickup_zipcode: data.pickup_zipcode || "", 
            pickup_city: data.pickup_city, 
            pickup_country: data.pickup_country, 
            pickup_region: data.pickup_region, 
            delivery_street: data.delivery_street || "", 
            delivery_zipcode: data.delivery_zipcode || "", 
            delivery_city: data.delivery_city, 
            delivery_country: data.delivery_country, 
            delivery_region: data.delivery_region, 
            full_name: data.full_name, 
            telephone1: data.telephone1, 
            email: data.email, 
            remarks: data.remarks || "" 
        };
        return necessaryData;
    }

    
}