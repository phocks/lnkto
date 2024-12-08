import { encodeBase58 } from "jsr:@std/encoding/base58";
import { FreshContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const message = "Joshua is the best!";
  const messageBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", messageBuffer);
  const hash = encodeBase58(hashBuffer);
  return new Response(hash);
};
