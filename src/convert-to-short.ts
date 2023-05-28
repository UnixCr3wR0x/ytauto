import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "@ffmpeg-installer/ffmpeg";

// Set the path for ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath.path);

export let convertToYoutubeShorts = async (
  input: string,
  output: string
): Promise<void> => {
    
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
