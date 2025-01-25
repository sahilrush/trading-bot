import { getTweets } from "./get-tweets";

async function main(userName: string) {
  const newTweets: Tweet[] = await getTweets(userName);
  console.log(newTweets)
  // for (tweet of newTweets) {
  //   const tokenAddress = await getTokenFromLLM(tweet.contents);
  //   if (tokenAddress) {
  //     const txn = await createSwapInstruction();
  //     for (let i = 0; i < SPAM_COUNT; i++) {
  //       sendTxn(txn);
  //     }
  //   }
  // }
}

main("");
