import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

test("the teaching app contains all required product elements", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const problems = await readFile(new URL("../app/problems.tsx", import.meta.url), "utf8");
  assert.match(page, /คณิตศาสตร์ 12\*/);
  assert.match(page, /บันทึก PDF รวม 30 ข้อ/);
  assert.match(page, /ชุดที่ 12/);
  assert.match(page, /set12-all-questions\.pdf/);
  assert.match(page, /กระดาษทด/);
  assert.match(page, /ดูเฉลย/);
  assert.match(page, /ครูนพพล สุขภิรมย์/);
  assert.equal((problems.match(/code: "/g) ?? []).length, 30);
});

test("all 30 one-page A4 question PDFs are present", async () => {
  await Promise.all(Array.from({ length: 30 }, (_, index) => {
    const name = `../public/pdfs/set12-question-${String(index + 1).padStart(2, "0")}.pdf`;
    return access(new URL(name, import.meta.url));
  }));
});

test("the combined 30-question PDF is present", async () => {
  await access(new URL("../public/pdfs/set12-all-questions.pdf", import.meta.url));
});

test("the combined PDF preserves vector text and equations", async () => {
  const generator = await readFile(new URL("../scripts/generate-question-pdfs.mjs", import.meta.url), "utf8");
  const merger = await readFile(new URL("../scripts/merge-question-pdfs.m", import.meta.url), "utf8");
  assert.match(generator, /PDFKit/);
  assert.match(merger, /insertPage/);
  assert.doesNotMatch(merger, /pdftoppm|drawImage/);
});
