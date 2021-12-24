import type { Address, Expression, ExpressionAdapter, PublicSharing, LanguageContext, AgentService, HolochainLanguageDelegate } from "@perspect3vism/ad4m";
import type { IPFS } from "ipfs-core-types";
import axios from "axios";
import https from "https";
import { BUCKET_NAME, s3, UPLOAD_ENDPOINT } from "./config";
import type { Readable } from "stream";
import { GetObjectCommand } from "@aws-sdk/client-s3";

class SharedPerspectivePutAdapter implements PublicSharing {
  #agent: AgentService;
  #IPFS: IPFS;

  constructor(context: LanguageContext) {
    this.#agent = context.agent;
    this.#IPFS = context.IPFS;
  }

  async createPublic(neighbourhood: object): Promise<Address> {
    const agent = this.#agent;
    const expression = agent.createSignedExpression(neighbourhood);
    const content = JSON.stringify(expression);
    const result = await this.#IPFS.add(
      { content },
      { onlyHash: true },
    );
    const hash = result.cid.toString();

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false
    });
    const postData = {
      hash,
      content,
    };
    console.log("============ hash: ", hash);
    console.log("============ has2h: ", hash);
    const postResult = await axios.post(UPLOAD_ENDPOINT, postData, { httpsAgent });
    console.log("============ post result: ", result);
    console.log("============ post result2222: ", result);
    if (postResult.status != 200) {
      console.error("Create neighbourhood error: ", postResult);
    }

    // @ts-ignore
    return hash as Address;
  }
}

async function streamToString(stream: Readable): Promise<string> {
  return await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  })
}
export default class Adapter implements ExpressionAdapter {
  #IPFS: IPFS;

  putAdapter: PublicSharing;

  constructor(context: LanguageContext) {
    this.#IPFS = context.IPFS;
    this.putAdapter = new SharedPerspectivePutAdapter(context);
  }

  async get(address: Address): Promise<Expression> {
    const cid = address.toString();

    const params = {
      Bucket: BUCKET_NAME,
      Key: cid,
    };

    const response = await s3.send(new GetObjectCommand(params));
    const contents = await streamToString(response.Body as Readable);

    return JSON.parse(contents);
  }
}
