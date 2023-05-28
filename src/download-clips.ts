import axios from "axios";
import fs from "fs";
import https from "https";
import { delay } from "./utils";
import { convertToYoutubeShorts } from "./convert-to-short";
export let downloadVideo = async (url: string, outputFilename: string) => {
  return new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(`./clips/${outputFilename}`);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", async () => {
          file.close();
          await delay(60000);
          try {
            await convertToYoutubeShorts(
              `${outputFilename}`,
              `${outputFilename}.mp4`
            );
            console.log("done !!!!!");
            await delay(60000);
            resolve();
          } catch (error) {
            console.log(error);
            reject()
          }
        });
      })
      .on("error", (error) => {
        fs.unlink(outputFilename, () => {});
        reject(`Failed to download video: ${error.message}`);
      });
  });
};
