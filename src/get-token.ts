import axios from 'axios';

export let getTwitchToken = async (clientId:string,clientSecret:string): Promise<string | null> => {
  const url = 'https://id.twitch.tv/oauth2/token';
  const params = new URLSearchParams({
    client_id: clientId!!,
    client_secret: clientSecret!!,
    grant_type: 'client_credentials',
  });

  try {
    const response = await axios.post(url, params);
    const token: string = response.data.access_token;
    return token;
  } catch (error:any) {
    console.error(`Failed to get Twitch OAuth token: ${error.message}`);
    return null;
  }
}

