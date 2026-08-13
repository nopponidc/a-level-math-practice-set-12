import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  throw new Error("ไม่พบ Playwright: กำหนด NODE_PATH ไปยังโฟลเดอร์ที่ติดตั้งเครื่องมือก่อนรันคำสั่งนี้");
}

const baseUrl = process.env.SET12_PREVIEW_URL ?? "http://127.0.0.1:4173";
const outputDir = resolve("public/pdfs");
await mkdir(outputDir, { recursive: true });

for (let question = 1; question <= 30; question += 1) {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  try {
    const context = await browser.newContext({ viewport: { width: 1240, height: 1754 }, deviceScaleFactor: 1 });
    try {
      const page = await context.newPage();
      await page.goto(`${baseUrl}/?question=${question}`, { waitUntil: "networkidle" });
      await page.emulateMedia({ media: "print" });
      const errors = await page.locator(".katex-error").count();
      if (errors) throw new Error(`พบสูตร KaTeX ที่แสดงผลไม่ได้ในข้อ ${question}`);
      const filename = `set12-question-${String(question).padStart(2, "0")}.pdf`;
      await page.pdf({ path: resolve(outputDir, filename), format: "A4", printBackground: true, preferCSSPageSize: true, margin: { top: "0", right: "0", bottom: "0", left: "0" } });
    } finally {
      await context.close();
    }
  } finally {
    await browser.close();
  }
}

const mergeBuildDir = resolve("tmp/pdfs");
const mergeBinary = resolve(mergeBuildDir, "merge-question-pdfs");
await mkdir(mergeBuildDir, { recursive: true });

const compileMergeResult = spawnSync(
  process.env.CLANG_PATH ?? "clang",
  [
    "-fobjc-arc",
    "-framework",
    "Foundation",
    "-framework",
    "PDFKit",
    resolve("scripts/merge-question-pdfs.m"),
    "-o",
    mergeBinary,
  ],
  { stdio: "inherit" },
);

if (compileMergeResult.status !== 0) {
  throw new Error("เตรียมตัวรวม PDF แบบเวกเตอร์ไม่สำเร็จ: โปรดตรวจว่าเครื่องมี clang และ PDFKit");
}

const vectorMergeResult = spawnSync(mergeBinary, [outputDir], { stdio: "inherit" });

if (vectorMergeResult.status !== 0) {
  throw new Error("รวม PDF แบบเวกเตอร์ไม่สำเร็จ");
}

console.log("สร้าง PDF โจทย์ A4 รายข้อ 30 ไฟล์ และ PDF รวมแบบเวกเตอร์ 30 หน้าเรียบร้อย");
