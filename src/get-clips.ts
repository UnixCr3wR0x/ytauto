import axios from "axios";
import { saveClipsToJsonFile } from "./save-to-json";
import { downloadVideo } from "./download-clips";
import youtubedl from "youtube-dl-exec";
import { convertToYoutubeShorts } from "./convert-to-short";

export let getNewDota2ClipsEnglishOnly = async (
  token: string,
  clientId: string,
  gameId: string
): Promise<void> => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const startedAt = yesterday.toISOString();
  if (!gameId) {
    return;
  }

  try {
    const url = "https://api.twitch.tv/helix/clips";
    const headers = {
      "Client-ID": clientId,
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(url, {
      headers: headers,
      params: {
        game_id: gameId,
        language: "en",
        first: 100, // Fetch up to 100 clips (maximum allowed)
        started_at: startedAt,
      },
    });

    const clips = response.data.data;
    if (clips.length > 0) {
      console.log("Newest Dota 2 English only clips:", clips);
      //   await saveClipsToJsonFile(clips);
      console.log(clips.length);
      //   for (const clip of clips) {
      try {
        await youtubedl(clips[0].url, {
            output: `./clips/${clips[0].id}.mp4`,
            format: 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
          });
        console.log(`Downloaded clip to ${clips[0].id}`);
        await convertToYoutubeShorts(
            `./clips/${clips[0].id}.mp4`,
            `./final/${clips[0].id}.mp4`
          );
      } catch (error) {
        console.error(error);
      }
      //   }
    } else {
      console.log("No newest Dota 2 English only clips found");
    }
  } catch (error: any) {
    if (error) {
      console.error(`Failed to get newest Dota 2 English only clips: ${error}`);
    }
  }
};
