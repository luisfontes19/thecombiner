# TheCombiner

Combines supplied words and generates all possible combinations/permutations. Can also hash wordlist entries to look for an hash match.

The problem that I have with tools like [cupp](https://github.com/Mebus/cupp) is that it doesn't actually generates all possible combinations and due to that I've missed real cases. This tool is an attempt to fix it. 

It can also be used to generate the wordlist and compare the results with a provided hash. This can be usefull when trying to break tokens, that you suspect are generated based on known data

## Installation


```bash
npm install thecombiner
```


## Usage


```text
 _____ _            ___                _     _                 
/__   \ |__   ___  / __\___  _ __ ___ | |__ (_)_ __   ___ _ __ 
  / /\/ '_ \ / _ \/ /  / _ \| '_ ` _ \| '_ \| | '_ \ / _ \ '__|
 / /  | | | |  __/ /__| (_) | | | | | | |_) | | | | |  __/ |   
 \/   |_| |_|\___\____/\___/|_| |_| |_|_.__/|_|_| |_|\___|_|   
  
 By Luis Fontes

thecombiner <options> word list space seperated

Options:
      --help        Show help                                                                        [boolean]
      --version     Show version number                                                              [boolean]
  -c, --capitalize  Also add capitalized words to the mix                                            [boolean]
  -r, --reverse     Also add reversed words to the mix                                               [boolean]
  -o, --output      Output file for the generated possibilities (if not supplied prints to stdout     [string]
  -i, --input       Specify a file with words (one per line) instead of supplying from inline arguments
                                                                                                      [string]
  -t, --test        Hash all generated combinations, to match the supplied value. Requires -a         [string]
  -a                Algorithm to be used with -t                  [choices: "md5", "sha1", "sha256", "sha512"]

Examples:
  thecombiner -c -t 1bf25b04bc57e7a84d5cca410e6b6c28 jown doe flipper 1 123

when using -i or -r the supplied words will double (for each).10 words combinations will take about a 1minute
to process (with md5).From there on, for each new word the possibilities increase significantly.

```