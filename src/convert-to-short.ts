import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

import ffmpegPath from "@ffmpeg-installer/ffmpeg";


// Set the path for ffmpeg

export let convertToYoutubeShorts = async (
  input: string, 
  output: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let process = ffmpeg(input)
      .setDuration(60)       // Max duration is 60s
      .aspect('9:16')
      .format('mp4')       
      .outputOptions([
        '-movflags +faststart' // Put moov atom at the begining of the file
      ])
      .output(output)      
      .on('end', resolve)
      .on('error', reject)
      .run();
  });
};

(async () => {
  try {
    await convertToYoutubeShorts(
      "./clips/AdorableSuspiciousButterflyCopyThis-izZKthp_eCQjnHSC.mp4",
      "./final/AdorableSuspiciousButterflyCopyThis-izZKthp_eCQjnHSC.mp4"
    );
  } catch (error) {
    console.log(error);
  }
})();
