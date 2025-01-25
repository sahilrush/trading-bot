"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTweets = getTweets;
const axios_1 = __importDefault(require("axios"));
const TWEET_MAX_TIME_MS = 60 * 1000;
function getTweets(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `https://twttrapi.p.rapidapi.com/user-tweets?${userName}`,
            headers: {
                "x-rapidapi-host": "twttrapi.p.rapidapi.com",
                "x-rapidapi-key": process.env.RAPID_API_KEY,
            },
        };
        const response = yield axios_1.default.request(config);
        const timeLineResponse = response.data.user_result.result.timeline_response.timeline.instruction.filter((x) => x._typename === "TimeLineAddEntries");
        const tweets = timeLineResponse.entries.map((x) => ({
            content: x.content.content.tweetResult.result.core.user_result.result.description,
            id: x.content.content.tweetResult.result.core.user_result.result.id_str,
            created_at: x.content.content.tweetResult.result.core.user_result.result.created_at,
        }));
        return tweets;
    });
}
