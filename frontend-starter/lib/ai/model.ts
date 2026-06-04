// Muster C — Provider + Modell an einer Stelle.
// Der Default-Provider liest ANTHROPIC_API_KEY automatisch aus der Env.
import { anthropic } from "@ai-sdk/anthropic";

export const getModel = () => anthropic("claude-opus-4-8");
