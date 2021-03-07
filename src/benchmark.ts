import * as crypto from 'crypto';

export function secondsToString(seconds: number) {
  const numyears = Math.floor(seconds / 31536000);
  const numdays = Math.floor((seconds % 31536000) / 86400);
  const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  const numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);

  let str = `${numseconds} seconds`;

  if (numminutes) str = numminutes + " minutes " + numseconds + " seconds";
  if (numhours) str = numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
  if (numdays) str = numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";
  if (numyears) str = numyears + " years " + numdays + " days " + numhours + " hours " + numminutes + " minutes " + numseconds + " seconds";

  return str;
}


export const benchmark = (hash: string, numberOfTries: number, benchmarkTries = 1000) => {
  const begin = new Date().getTime();
  for (let i = 0; i < benchmarkTries; i++)
    crypto.createHash(hash).update("benchmarkbenchmarkbenchmarkbenchmarkbenchmarkbenchmark").digest("hex");

  const end = new Date().getTime();
  const average = (end - begin) / benchmarkTries;


  return secondsToString(Math.round((average * numberOfTries)) / 1000);

}