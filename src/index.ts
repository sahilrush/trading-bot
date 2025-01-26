require("dotenv").config();
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getTokenFromLLM } from "./get-tokenFronLLM";
import { getTweets } from "./get-tweets";
import { swap } from "./swap";

const SOL_AMOUNT = 1 + LAMPORTS_PER_SOL;

async function main(userName: string) {
  const newTweets = await getTweets(userName);
  console.log(newTweets);
  for (let tweet of newTweets) {
    const tokenAddress = await getTokenFromLLM(tweet.contents);
    if (tokenAddress != "null") {
      await swap(tokenAddress, SOL_AMOUNT);
    }
  }
}

main("AltcoinGordon");
