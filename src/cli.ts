#!/usr/bin/env node

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as yargs from 'yargs';
import { benchmark } from './benchmark';
import * as Generator from './generator';

const banner =
  `
 _____ _            ___                _     _                 
/__   \\ |__   ___  / __\\___  _ __ ___ | |__ (_)_ __   ___ _ __ 
  / /\\/ '_ \\ / _ \\/ /  / _ \\| '_ \` _ \\| '_ \\| | '_ \\ / _ \\ '__|
 / /  | | | |  __/ /__| (_) | | | | | | |_) | | | | |  __/ |   
 \\/   |_| |_|\\___\\____/\\___/|_| |_| |_|_.__/|_|_| |_|\\___|_|   
  
 By Luis Fontes
`;

console.log(banner);

const argv = yargs
  .usage("$0 <options> word list space seperated")
  .epilog("when using -i or -r the supplied words will double (for each)." +
    "10 words combinations will take about a 1minute to process (with md5)." +
    "From there on, for each new word the possibilities increase significantly.")
  .wrap(process.stdout.columns)
  .example("$0 -c -t 1bf25b04bc57e7a84d5cca410e6b6c28 jown doe flipper 1 123", "")
  .options({
    c: { type: 'boolean', alias: 'capitalize', description: "Also add capitalized words to the mix" },
    r: { type: 'boolean', alias: 'reverse', description: "Also add reversed words to the mix" },
    o: { type: 'string', alias: "output", description: "Output file for the generated possibilities (if not supplied prints to stdout" },
    i: { type: 'string', alias: "input", description: "Specify a file with words (one per line) instead of supplying from inline arguments" },
    t: { type: 'string', alias: "test", description: "Hash all generated combinations, to match the supplied value. Requires -a" },
    a: { choices: ["md5", "sha1", "sha256", "sha512"], description: "Algorithm to be used with -t" }
  }).argv;

if ((argv._.length === 0 && !argv.i) || argv.h) {
  yargs.showHelp();
  process.exit();
}

const words = argv.i ? fs.readFileSync(argv.i).toString().split("\n") : argv._.map(s => s.toString())

console.log("Generating possibilities...");
const opts = { capitalize: argv.c === true, reverse: argv.r === true };
const possibilities = Generator.allPossibilities(words, opts);

if (argv.o) fs.writeFileSync(argv.o, possibilities.join("\n"));
else if (!argv.t) console.log(possibilities.join("\n")); //only print to console if not testing

if (argv.t) {
  const alg = argv.a || "md5";

  const time = benchmark(alg, possibilities.length);
  console.log("Estimated time for testing all possibilities: " + time);

  possibilities.forEach((p, i) => {
    process.stdout.cursorTo(0);
    process.stdout.write(`(${i + 1} of ${possibilities.length})`);

    if (argv.t === crypto.createHash(alg).update(p).digest("hex")) {
      console.log("\n[+] FOUND - " + p);
      process.exit();
    }
  });
}

