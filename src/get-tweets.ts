require("dotenv").config();
import axios from "axios";

const TWEET_MAX_TIME_MS = 60 * 1000;

interface Tweet {
  contents: string;
  id: string;
  createdAt: string;
}

export async function getTweets(userName: string): Promise<Tweet[]> {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://twttrapi.p.rapidapi.com/user-tweets?username=${userName}}`,
    headers: {
      "x-rapidapi-host": "twttrapi.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
    },
  };

  const response = await axios.request(config);
  const timeLineResponse =
    response.data.user_result.result.timeline_response.timeline.instruction.filter(
      (x: any) => x._typename === "TimeLineAddEntries"
    );

  const tweets: Tweet[] = [];
  timeLineResponse[0].entries.map((x: any) => {
    try {
      tweets.push({
        contents:
          x.content.content.tweetResult.result.core.user_result.result.legacy
            .description,
        id: x.content.content.tweetResult.result.core.user_result.result.legacy
          .id_str,
        createdAt:
          x.content.content.tweetResult.result.core.user_result.result.legacy
            .created_at,
      });
    } catch (e) {} 
  });
  return tweets;
}
