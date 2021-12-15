import type { Address, Language, LanguageContext, ExpressionUI, Interaction, HolochainLanguageDelegate } from "@perspect3vism/ad4m";
import Adapter from "./adapter";

function interactions(expression: Address): Interaction[] {
  return [];
}

export class UI implements ExpressionUI {
  icon(): string {
    return "";
  }

  constructorIcon(): string {
    return "";
  }
}

export const name = "ui-bundle-store"; // TODO make a configure for different type of files

export default async function create(context: LanguageContext): Promise<Language> {
  const expressionAdapter = new Adapter(context);

  return {
    name,
    expressionAdapter,
    interactions,
  } as Language;
}
