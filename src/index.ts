require("dotenv").config();
import { getTokenFromLLM } from "./get-tokenFronLLM";
import { getTweets } from "./get-tweets";

async function main(userName: string) {
  // const newTweets = await getTweets(userName);
  // console.log(newTweets);
  // for (tweet of newTweets) {
  //   const tokenAddress = await getTokenFromLLM(tweet.contents);
  //   if (tokenAddress) {
  //     const txn = await createSwapInstruction();
  //     for (let i = 0; i < SPAM_COUNT; i++) {
  //       sendTxn(txn);
  //     }
  //   }
  // }
  const response = await getTokenFromLLM(`
      I am Bullish on $FRIC
      The founder has 658k followers on instagram and they have an X post with 4M+ views

EsP4kJfKUDLfX274WoBSiiEy74Sh4tZKUCDjfULHpump`);
  console.log(response);
}

main("AltcoinGordon");
