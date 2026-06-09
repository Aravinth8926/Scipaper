import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o";
export const MAX_TOKENS = parseInt(process.env.OPENAI_MAX_TOKENS || "4096", 10);
export const TEMPERATURE = {
  analysis: 0.1,
  suggestions: 0.3,
  chat: 0.7,
};
