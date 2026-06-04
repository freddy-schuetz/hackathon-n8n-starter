#!/usr/bin/env node
// PostToolUse Hook: Exportiert Workflow-JSON nach backup/ bei Create/Update
//
// Hinweis: Dieser Hook loggt die Tool-Inputs (Intent, Operations etc.) als Backup-Kontext.
// Der vollständige Workflow-JSON kann bei Bedarf mit n8n-cli oder n8n_get_workflow abgerufen werden.

const fs = require("fs");
const path = require("path");

const BACKUP_TOOLS = [
  "mcp__n8n-mcp__n8n_create_workflow",
  "mcp__n8n-mcp__n8n_update_partial_workflow",
  "mcp__n8n-mcp__n8n_update_full_workflow"
];

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  try {
    const data = JSON.parse(input);
    const toolName = data.tool_name || "";
    const toolInput = data.tool_input || {};
    const toolResult = data.tool_result || {};
    const cwd = data.cwd || process.cwd();

    if (!BACKUP_TOOLS.includes(toolName)) {
      process.exit(0);
    }

    const workflowId = toolInput.id || "new";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const action = toolName.replace("mcp__n8n-mcp__", "");

    const backupDir = path.join(cwd, "backup", "workflow-changes");
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const backupFile = path.join(backupDir, `${timestamp}_${action}_${workflowId}.json`);
    const backupData = {
      timestamp: new Date().toISOString(),
      action,
      workflowId,
      intent: toolInput.intent || null,
      toolInput,
      toolResult: typeof toolResult === "string" ? toolResult.slice(0, 2000) : toolResult
    };

    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2), "utf8");
  } catch {
    // Backup-Fehler sollen den Workflow nicht blockieren
  }

  process.exit(0);
});
