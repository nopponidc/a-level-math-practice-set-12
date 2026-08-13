"use client";

import { useEffect, useRef, useState } from "react";
import { problems } from "./problems";
import "katex/dist/katex.min.css";

const pdfPath = (questionNo: number) => `/pdfs/set12-question-${String(questionNo).padStart(2, "0")}.pdf`;
const combinedPdfPath = "/pdfs/set12-all-questions.pdf";
const combinedPdfName = "A-Level-ชุดที่-12-โจทย์ครบ-30-ข้อ.pdf";

function ScratchPad({ questionNo, visible }: { questionNo: number; visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const history = useRef<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const old = canvas.width ? canvas.toDataURL() : "";
      canvas.width = Math.floor(rect.width * devicePixelRatio);
      canvas.height = Math.floor(rect.height * devicePixelRatio);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (old) {
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
        img.src = old;
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [visible]);

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };
  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    drawing.current = true;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const p = point(e);
    ctx.strokeStyle = "#2f6f52";
    ctx.lineWidth = 2.25;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  const undo = () => {
    const ctx = canvasRef.current?.getContext("2d");
    const previous = history.current.pop();
    if (ctx && previous) ctx.putImageData(previous, 0, 0);
  };
  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const copy = document.createElement("canvas");
    copy.width = canvas.width;
    copy.height = canvas.height;
    const ctx = copy.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, copy.width, copy.height);
    ctx.drawImage(canvas, 0, 0);
    const link = document.createElement("a");
    link.download = `กระดาษทด-ข้อ-${questionNo}.png`;
    link.href = copy.toDataURL("image/png");
    link.click();
  };

  return <section className="scratch-section" aria-label={`กระดาษทดข้อที่ ${questionNo}`}>
    <div className="scratch-head">
      <div className="scratch-title-mark" aria-hidden="true">✎</div>
      <div><span className="eyebrow">พื้นที่คิดของคุณ</span><h3>กระดาษทด · ข้อ {String(questionNo).padStart(2, "0")}</h3><p>เขียนคำนวณด้วยเมาส์ ปากกาสไตลัส หรือนิ้วได้ทันที</p></div>
      <div className="scratch-tools">
        <button onClick={undo} aria-label="ย้อนกลับ">↶ <span>ย้อนกลับ</span></button>
        <button onClick={clear} aria-label="ล้างกระดาษทด">⌫ <span>ล้าง</span></button>
        <button className="download-tool" onClick={download}>⇩ <span>ดาวน์โหลด</span></button>
      </div>
    </div>
    <div className="paper">
      <canvas ref={canvasRef} onPointerDown={start} onPointerMove={move} onPointerUp={() => drawing.current = false} onPointerCancel={() => drawing.current = false} />
    </div>
  </section>;
}

function ProblemCard({ problem, index, total }: { problem: (typeof problems)[number]; index: number; total: number }) {
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [scratchOpen, setScratchOpen] = useState(false);
  const [scratchReady, setScratchReady] = useState(false);
  const questionNo = index + 1;
  const progress = (questionNo / total) * 100;
  const toggleScratch = () => {
    if (!scratchReady) setScratchReady(true);
    setScratchOpen((open) => !open);
  };

  return <article className="problem-card" id={`problem-${questionNo}`} data-problem-index={index}>
    <div className="problem-head">
      <div className="problem-number"><span>ข้อ</span><strong>{String(questionNo).padStart(2, "0")}</strong></div>
      <div className="problem-meta"><span>คณิตศาสตร์ 12* · ชุดที่ 12</span><div className="mini-progress"><i style={{ width: `${progress}%` }} /></div><small>ข้อ {questionNo} จาก {total}</small></div>
    </div>
    <div className="typed-problem">{problem.question}</div>
    <div className="action-row">
      <p>{solutionOpen ? "อ่านแนวคิดแล้วลองสรุปวิธีทำด้วยตนเอง" : "ลองทำด้วยตนเองก่อน แล้วจึงเปิดดูแนวทาง"}</p>
      <div className="card-actions">
        <a className="question-pdf" href={pdfPath(questionNo)} download={`A-Level-ชุดที่-12-ข้อ-${String(questionNo).padStart(2, "0")}.pdf`}><span>PDF</span>บันทึกโจทย์</a>
        <button className={scratchOpen ? "scratch-toggle active" : "scratch-toggle"} onClick={toggleScratch} aria-expanded={scratchOpen} aria-controls={`scratch-${questionNo}`}><span>✎</span>{scratchOpen ? "ปิดกระดาษทด" : "เปิดกระดาษทด"}</button>
        <button className="reveal" onClick={() => setSolutionOpen(!solutionOpen)} aria-expanded={solutionOpen}>{solutionOpen ? "ซ่อนเฉลย" : "ดูเฉลย"}<span>{solutionOpen ? "↑" : "→"}</span></button>
      </div>
    </div>
    {solutionOpen && <section className="solution" aria-live="polite"><div className="solution-title"><span>เฉลยและแนวคิด</span><b>ข้อ {questionNo}</b></div><div className="typed-solution">{problem.solution}</div></section>}
    {scratchReady && <div id={`scratch-${questionNo}`} className={scratchOpen ? "scratch-panel" : "scratch-panel scratch-collapsed"} aria-hidden={!scratchOpen}><ScratchPad questionNo={questionNo} visible={scratchOpen} /></div>}
  </article>;
}

function PrintableQuestion({ index }: { index: number }) {
  const problem = problems[index];
  if (!problem) return <article className="print-sheet"><p>ไม่พบโจทย์ที่เลือก</p></article>;
  const no = index + 1;

  return <article className="print-sheet">
    <header className="print-head">
      <img src="/logo-base.png" alt="ตราโรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน" />
      <div><span>เอกสารประกอบการสอนวิชาคณิตศาสตร์ 12* (ค 33206)</span><h1>แบบฝึกหัด A-Level · ชุดที่ 12</h1><p>โรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน</p></div>
      <b>ข้อ<br/><strong>{String(no).padStart(2, "0")}</strong></b>
    </header>
    <section className="print-question">
      <div className="print-label"><span>โจทย์</span><small>รหัส {problem.code}</small></div>
      <div className="print-question-content">{problem.question}</div>
    </section>
    <section className="print-work">
      <div><span>พื้นที่แสดงวิธีทำ</span><i>ชื่อ-สกุล ................................................................................ ชั้น ............... เลขที่ ............</i></div>
    </section>
    <footer className="print-footer">
      <img src="/logo-base.png" alt="" />
      <div><strong>ออกแบบและพัฒนาโดย ครูนพพล สุขภิรมย์</strong><span>ครูชำนาญการพิเศษ · กลุ่มสาระการเรียนรู้คณิตศาสตร์</span><span>โรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน · สำนักงานเขตพื้นที่การศึกษามัธยมศึกษาน่าน</span></div>
      <b>ชุดที่ 12<br/><small>ข้อ {String(no).padStart(2, "0")}</small></b>
    </footer>
  </article>;
}

function PrintableQuestionCollection({ indexes }: { indexes: number[] }) {
  return <main className="print-collection">
    {indexes.map((index) => <PrintableQuestion key={`${problems[index]?.code ?? "question"}-${index}`} index={index} />)}
  </main>;
}

export default function Home() {
  const searchParams = typeof window === "undefined" ? null : new URLSearchParams(window.location.search);
  const printIndex = Number(searchParams?.get("question")) - 1;
  if (searchParams?.get("print") === "all") return <PrintableQuestionCollection indexes={problems.map((_, index) => index)} />;
  if (printIndex >= 0) return <PrintableQuestionCollection indexes={[printIndex]} />;
  return <InteractiveHome />;
}

function InteractiveHome() {
  const [current, setCurrent] = useState(0);
  const [menu, setMenu] = useState(false);
  const total = problems.length;
  const progress = ((current + 1) / total) * 100;

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-problem-index]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(Number((visible.target as HTMLElement).dataset.problemIndex));
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1, 0.3] });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const go = (index: number) => {
    document.getElementById(`problem-${index + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setCurrent(index);
    setMenu(false);
  };

  return <main>
    <header className="topbar">
      <div className="brand">
        <img src="/logo-base.png" alt="ตราโรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน" />
        <strong>เอกสารประกอบการสอนวิชาคณิตศาสตร์ 12* <em>(ค 33206)</em></strong>
      </div>
      <div className="topbar-actions"><a className="pdf-menu-button" href={combinedPdfPath} download={combinedPdfName}><span>↓</span>บันทึก PDF รวม 30 ข้อ</a><span className="doc-badge"><b>ชุดที่ 12</b><i />30 ข้อ</span></div>
    </header>

    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow light">Practice · Think · Learn</span>
          <h1>โจทย์พัฒนาทักษะสำหรับการสอบเรียนต่อ<br/>ระดับมหาวิทยาลัย A-Level<br/><i>พร้อมแนวคิดอย่างเป็นขั้นตอน</i></h1>
          <div className="hero-stats"><span><b>30</b> โจทย์คัดสรร</span><span><b>↓</b> PDF รวม 30 หน้า A4</span><span><b>✎</b> กระดาษทดแยกทุกข้อ</span></div>
        </div>
        <div className="formula-art" aria-hidden="true"><span>∫</span><b>x² + y²</b><em>π</em><small>lim</small></div>
      </div>
    </section>

    <nav className="question-nav" aria-label="เลือกข้อ">
      <button className="nav-toggle" onClick={() => setMenu(!menu)}><span>กำลังอ่านข้อ {current + 1} จาก {total}</span><b>{menu ? "ปิดรายการ ×" : "ไปยังข้อ ▾"}</b></button>
      <div className={menu ? "number-strip open" : "number-strip"}>
        {problems.map((_, index) => <button key={index} className={index === current ? "active" : ""} onClick={() => go(index)} aria-label={`ไปข้อที่ ${index + 1}`}>{index + 1}</button>)}
      </div>
    </nav>

    <section className="workspace">
      <aside className="side-index">
        <div className="side-title"><span className="eyebrow">แบบฝึกหัด</span><h2>ชุดที่ 12</h2><p>เลือกข้อเพื่อเลื่อนไปยังโจทย์</p></div>
        <a className="side-pdf" href={combinedPdfPath} download={combinedPdfName}><span>↓</span><b>ดาวน์โหลด PDF รวม</b><small>30 ข้อ · 30 หน้า A4</small></a>
        <div className="side-grid">{problems.map((_, index) => <button key={index} className={index === current ? "active" : ""} onClick={() => go(index)}>{String(index + 1).padStart(2, "0")}</button>)}</div>
        <div className="progress"><div style={{ width: `${progress}%` }} /><span>กำลังอ่านข้อ {current + 1} จาก {total}</span></div>
      </aside>

      <div className="problem-list">
        {problems.map((problem, index) => <ProblemCard key={index} problem={problem} index={index} total={total} />)}
      </div>
    </section>

    <footer><img src="/logo-base.png" alt=""/><p>ออกแบบและพัฒนาโดย <strong>ครูนพพล สุขภิรมย์</strong> ครูชำนาญการพิเศษ<br/>กลุ่มสาระการเรียนรู้คณิตศาสตร์ โรงเรียนศรีสวัสดิ์วิทยาคารจังหวัดน่าน<br/>สำนักงานเขตพื้นที่การศึกษามัธยมศึกษาน่าน</p><span>คณิตศาสตร์ · คิดเป็น · ทำเป็น</span></footer>
  </main>;
}
