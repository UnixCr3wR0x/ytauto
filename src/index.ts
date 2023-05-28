import { getGameId } from "./get-gameid";
import dotenv from "dotenv";
import { getTwitchToken } from "./get-token";
import { getNewDota2ClipsEnglishOnly } from "./get-clips";
dotenv.config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

(async () => {
  let token = await getTwitchToken(clientId!!, clientSecret!!);
  console.log(`token is here ${token}`);
  let gameId = await getGameId(token!!,clientId!!,'dota 2');
  await getNewDota2ClipsEnglishOnly(token!!,clientId!!,gameId!!)
})();
