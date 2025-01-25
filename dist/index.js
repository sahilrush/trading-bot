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
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const get_tokenFronLLM_1 = require("./get-tokenFronLLM");
function main(userName) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const response = yield (0, get_tokenFronLLM_1.getTokenFromLLM)(`
      I am Bullish on $FRIC
      The founder has 658k followers on instagram and they have an X post with 4M+ views

EsP4kJfKUDLfX274WoBSiiEy74Sh4tZKUCDjfULHpump`);
        console.log(response);
    });
}
main("AltcoinGordon");
