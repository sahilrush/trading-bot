import axios from "axios";

const TWEET_MAX_TIME_MS = 60 * 1000;

interface Tweet {
  contents: string;
  id: string;
}

export async function getTweets(userName: string): Promise<Tweet[]> {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://twttrapi.p.rapidapi.com/user-tweets?${userName}`,
    headers: {
      "x-rapidapi-host": "twttrapi.p.rapidapi.com",
      "x-rapidapi-key": process.env.RAPID_API_KEY,
    },
  };

  const response = await axios.request(config);

  const timeLineResponse =
    response.data.user_result.result.timeline_response.timeline.instruction.filter(
      (x: any) => x._typename === "TimeLineAddEntries"
    );
  const tweets = timeLineResponse.entries.map((x: any) => ({
    content:
      x.content.content.tweetResult.result.core.user_result.result.description,
    id: x.content.content.tweetResult.result.core.user_result.result.id_str,
    created_at:
      x.content.content.tweetResult.result.core.user_result.result.created_at,
  }));
  return tweets;
}
