import axios from "axios";

export let getGameId = async (token:string,clientId:string,gameName: string): Promise<string | null> => {
  try {
    const url = "https://api.twitch.tv/helix/games";
    const headers = {
      "Client-ID": clientId,
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, {
      headers: headers,
      params: { name: gameName },
    });

    const game = response.data.data[0];
    if (game) {
      return game.id;
    } else {
      console.log(`No game found with the name ${gameName}`);
      return null;
    }
  } catch (error:any) {
    console.error(`Failed to get game ID: ${error.message}`);
    return null;
  }
}
