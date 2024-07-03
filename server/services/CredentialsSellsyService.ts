import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export default class CredentialsSellsyService {

    async getSellsyToken () {
        const apiUrl = 'https://login.sellsy.com/oauth2/access-tokens';
        const clientId = process.env.SELLSY_CLIENT_ID as string;
        const clientSecret = process.env.SELLSY_CLIENT_SECRET as string;
    
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
    
        const bodyData = new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret
        });
    
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: bodyData
        });
    
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    
        const token_data = await response.json() as { access_token: string }
        console.log("Access token : ", token_data)
        return token_data.access_token;

    }

}

