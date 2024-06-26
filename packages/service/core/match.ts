import compare from 'resemblejs/compareImages';

import { Config, Subfolder, getImage, saveImage } from '../../internal'


export async function match(filename: string, takeScreenshot: () => Promise<Buffer>): Promise<number> {
  const config = Config.get();
  const actualImage = await takeScreenshot();
  let expectedImage = getImage(filename, Subfolder.EXPECTED);
  
  saveImage(filename, Subfolder.ACTUAL, actualImage);

  if (!expectedImage) {
    if (config.initiateExpectedImage) {
      saveImage(filename, Subfolder.EXPECTED, actualImage);
      expectedImage = actualImage;
    } else {
      return Number.POSITIVE_INFINITY
    }
  }

  const result = await compare(expectedImage, actualImage, { output: config.ressembleOutput });
  const data = result.getBuffer();
  let mismatch = parseFloat(result.misMatchPercentage);

  if (mismatch > config.allowedMismatch) {
    saveImage(filename, Subfolder.DIFF, data);
  } else {
    mismatch = 0;
  }
  return mismatch;
}
