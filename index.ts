import type { Address, Language, LanguageContext, Interaction } from "@perspect3vism/ad4m";
import Adapter from "./adapter";
import { LANGUAGE_NAME } from "./config";

function interactions(expression: Address): Interaction[] {
  return [];
}

export const name = LANGUAGE_NAME;

export default async function create(context: LanguageContext): Promise<Language> {
  const expressionAdapter = new Adapter(context);

  return {
    name,
    expressionAdapter,
    interactions,
  } as Language;
}
