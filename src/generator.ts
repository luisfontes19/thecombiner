export type CombinationCallback = (combination: Array<string>) => void;

export interface GeneratorOptions {
  capitalize: boolean,
  reverse: boolean
}
export const allPermutations = (items: string[]) => {
  // adapted from: https://stackoverflow.com/questions/9960908/permutations-in-javascript

  let results: string[] = [];

  function permute(arr: string[], memo?: string[]) {
    memo = memo || [];
    let cur: string[];

    for (let i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) results.push(memo.concat(cur).join(""));

      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }
    return results;
  }

  permute(items);
  return results;
};

export const allCombinations = (arr: string[], callback: CombinationCallback) => {
  // adapted from https://js-algorithms.tutorialhorizon.com/2015/10/23/combinations-of-an-array/

  let i, j, combination;

  const arrLen = arr.length;
  const power = Math.pow;
  const combinations = power(2, arrLen);

  // Time & Space Complexity O (n * 2^n)
  for (i = 0; i < combinations; i++) {
    combination = [];
    for (j = 0; j < arrLen; j++) {
      if ((i & power(2, j)))
        combination.push(arr[j]);
    }
    callback(combination)
  }
};

export const allPossibilities = (arr: string[], opts: GeneratorOptions) => {
  let allPossibilities: string[] = [];

  if (opts.reverse) arr = arr.concat(arr.map((s) => s.split("").reverse().join("")));
  if (opts.capitalize) arr = arr.concat(arr.map((s) => s.charAt(0).toUpperCase() + s.slice(1)));
  allCombinations(arr, (combination) => allPossibilities = allPossibilities.concat(allPermutations(combination)));

  return allPossibilities;
};

