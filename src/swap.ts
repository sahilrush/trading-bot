import {
  Connection,
  Keypair,
  Transaction,
  VersionedTransaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import bs58 from "bs58";
import { NATIVE_MINT } from "@solana/spl-token";
import axios from "axios";
import { API_URLS } from "@raydium-io/raydium-sdk-v2";
import { unescape } from "querystring";

const connection = new Connection(
  "https://solana-mainnet.g.alchemy.com/v2/r9ZFZgQy11-faczguIGETwjalRCr8sRk"
);

const owner = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));

const slippage = 10;

export async function swap(tokenAddress: string, amount: number) {
  const { data: swapResponse } = await axios.get<SwapCompute>(
    `${
      API_URLS.SWAP_HOST
    }/compute/swap-base-in?inputMint=${NATIVE_MINT}&outputMint=${tokenAddress}&amount=${amount}&slippageBps=${
      slippage * 100
    }&txVersion=V0`
  ); // Use the URL xxx/swap-base-in or xxx/swap-base-out to define the swap type.

  const { data: swapTransactions } = await axios.post<{
    id: string;
    version: string;
    success: boolean;
    data: { transaction: string }[];
  }>(`${API_URLS.SWAP_HOST}/transaction/swap-base-in`, {
    // computeUnitPriceMicroLamports: String(data.data.default.h),
    swapResponse,
    txVersion: "V0",
    wallet: owner.publicKey.toBase58(),
    wrapSol: true,
    unwrapSol: false, // true means output mint receive sol, false means output mint received wsol
  });
  console.log(swapTransactions);
}
