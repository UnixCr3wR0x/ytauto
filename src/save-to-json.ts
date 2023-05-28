import fs from "fs";
export let saveClipsToJsonFile = async (
  clips: any[]
): Promise<boolean | null> => {
  return new Promise((resolve, reject) => {
    const fileName = "new_dota2_clips_english.json";
    const jsonData = JSON.stringify(clips, null, 2);

    fs.writeFile(fileName, jsonData, "utf-8", (error:any) => {
      if (error) {
        console.error(`Failed to save clips to JSON file: ${error.message}`);
        resolve(true);
      } else {
        console.log(`Saved clips to ${fileName}`);
        reject(null);
      }
    });
  });
};
