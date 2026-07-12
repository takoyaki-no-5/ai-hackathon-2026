import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const PORT = 8787;

function loadEnvFile(fp) {
  if (!fs.existsSync(fp)) return;
  for (const line of fs.readFileSync(fp, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env) || !process.env[k]) process.env[k] = v;
  }
}

loadEnvFile(path.join(ROOT, "secrets", ".env"));
loadEnvFile(path.join(__dirname, ".env"));

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const API_KEY = process.env.OPENAI_API_KEY || "";

const SYSTEM = `You create a short cinematic web scene. Reply with ONLY one JSON object, no markdown.
Keys:
- bg: CSS background for the full stage (color or gradient)
- html: one HTML fragment. Root should be <div class="scene">...</div>.
  Allowed tags only: div, span, h1, h2, h3, p, em, strong, br, ul, li.
  Use class names for styling. No scripts, no links, no images, no iframes, no SVG, no event handlers.
  Include at least a title (h1) and one more expressive element (subtitle, floating labels, deco spans, list, etc.).
- css: CSS that styles .scene and descendants. You MAY include @keyframes and animation properties.
  Make it feel like a short music-video / title sequence for the theme.
  No @import, no url(), no javascript.

beat meanings:
- intro: quiet establish
- peak / main: strongest expression
- outro: lingering afterimage

Japanese copy. Be bold and visual. Keep CSS under ~1500 chars, HTML under ~1200 chars.`;

function send(res, status, data, type = "application/json; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Access-Control-Allow-Origin": "*"
  });
  if (Buffer.isBuffer(data) || typeof data === "string") {
    res.end(data);
  } else {
    res.end(JSON.stringify(data));
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function openaiStyle(theme, beat) {
  if (!API_KEY) {
    const err = new Error("OPENAI_API_KEY is not set");
    err.status = 503;
    throw err;
  }
  const user = `theme: ${theme}\nbeat: ${beat}\nReturn JSON now.`;
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: user }
      ]
    })
  });
  const raw = await r.text();
  if (!r.ok) {
    const err = new Error(`OpenAI ${r.status}: ${raw.slice(0, 300)}`);
    err.status = 502;
    throw err;
  }
  const data = JSON.parse(raw);
  const text = data.choices?.[0]?.message?.content || "{}";
  return JSON.parse(text);
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    return res.end();
  }

  if (req.url === "/api/health") {
    return send(res, 200, { ok: Boolean(API_KEY), model: MODEL });
  }

  if (req.url === "/api/style" && req.method === "POST") {
    try {
      const body = JSON.parse((await readBody(req)) || "{}");
      const slot = await openaiStyle(body.theme || "無題", body.beat || "main");
      return send(res, 200, slot);
    } catch (e) {
      return send(res, e.status || 500, { error: String(e.message || e) });
    }
  }

  const file = req.url === "/" ? "/index.html" : req.url;
  const fp = path.join(__dirname, path.normalize(file).replace(/^(\.\.[/\\])+/, ""));
  if (!fp.startsWith(__dirname) || !fs.existsSync(fp) || fs.statSync(fp).isDirectory()) {
    return send(res, 404, { error: "not found" });
  }
  const ext = path.extname(fp);
  const type =
    ext === ".html" ? "text/html; charset=utf-8" :
    ext === ".js" ? "text/javascript; charset=utf-8" :
    "application/octet-stream";
  return send(res, 200, fs.readFileSync(fp), type); // Buffer OK: send() handles it
});

server.listen(PORT, () => {
  console.log(`css-live demo http://localhost:${PORT}`);
  console.log(API_KEY ? `model: ${MODEL}` : "WARN: set OPENAI_API_KEY to enable AI");
});
