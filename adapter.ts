import type {
  Address, Expression, ExpressionAdapter, PublicSharing,
  LanguageContext, AgentService
} from "@perspect3vism/ad4m";
import type { IPFS } from "ipfs-core-types";
import type { Readable } from "stream";
import axios from "axios";
import { BUCKET_NAME, s3, UPLOAD_ENDPOINT } from "./config";
import { GetObjectCommand } from "@aws-sdk/client-s3";

class FileStorePutAdapter implements PublicSharing {
  #agent: AgentService;
  #IPFS: IPFS;

  constructor(context: LanguageContext) {
    this.#agent = context.agent;
    this.#IPFS = context.IPFS;
  }

  async createPublic(data: object): Promise<Address> {
    const agent = this.#agent;
    const expression = agent.createSignedExpression(data);
    const content = JSON.stringify(expression);

    const result = await this.#IPFS.add(
      { content },
      { onlyHash: true },
    );
    const hash = result.cid.toString();
    
    const postData = {
      hash,
      content
    };
    const postResult = await axios.post(UPLOAD_ENDPOINT, postData);
    if (postResult.status != 200) {
      console.error("Upload content error: ", postResult);
    }

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
  putAdapter: PublicSharing;

  constructor(context: LanguageContext) {
    this.putAdapter = new FileStorePutAdapter(context);
  }

  async get(address: Address): Promise<Expression> {
    const cid = address.toString();

    const params = {
      Bucket: BUCKET_NAME,
      Key: cid,
    }

    const response = await s3.send(new GetObjectCommand(params));
    const contents = await streamToString(response.Body as Readable);

    return JSON.parse(contents);
  }
}
