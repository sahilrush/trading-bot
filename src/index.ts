

async function main(userName: string) {
  const newTweets: Tweet[] = await getTweets(userid)
      for(tweet of newTweets) {
        const tokenAddress = await getTokenFromLLM(tweet.contents)
          if(tokenAddress) {
            const txn = await createSwapInstruction();
            for(let i = 0; i<SPAM_COUNT; i++){
              sendTxn(txn)
            }
          }
      } 
}

main()