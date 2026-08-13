import katex from "katex";
import type { ReactNode } from "react";

export function Math({ tex, block = false }: { tex: string; block?: boolean }) {
  return <span className={block ? "math block" : "math"} dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { displayMode: block, throwOnError: false }) }} />;
}

const choices = (...items: ReactNode[]) => <ol className="choices">{items.map((item, i) => <li key={i}>{item}</li>)}</ol>;
const answer = (value: ReactNode) => <div className="final-answer"><span>คำตอบ</span><strong>{value}</strong></div>;

function FrequencyTable() {
  return <table>
    <thead><tr><th>ชั้นที่</th><th>จุดกึ่งกลางของอันตรภาคชั้น</th><th>ความถี่สะสม</th></tr></thead>
    <tbody>{[[1,10,8],[2,15,16],[3,20,36],[4,25,40],[5,30,50]].map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
  </table>;
}

function GradeTable() {
  return <table>
    <thead><tr><th>วิชา</th><th>หน่วยกิต</th><th>เกรดที่ได้</th></tr></thead>
    <tbody>
      <tr><td>ว่ายน้ำ</td><td>1</td><td>4</td></tr>
      <tr><td>สังคมศาสตร์</td><td>2</td><td>4</td></tr>
      <tr><td>คณิตศาสตร์</td><td>3</td><td>2</td></tr>
      <tr><td>ฟิสิกส์</td><td>4</td><td>2</td></tr>
    </tbody>
  </table>;
}

export type Problem = { code: string; question: ReactNode; solution: ReactNode };

export const problems: Problem[] = [
  {
    code: "0037",
    question: <><p>ถ้า <Math tex="A=\{1,2,3,4,\ldots\}" /> และ <Math tex="B=\{\{1,2\},\{3,4,5\},6,7,8,\ldots\}" /> แล้ว <Math tex="(A-B)\cup(B-A)" /> มีสมาชิกกี่ตัว</p></>,
    solution: <><p>สมาชิก 1 ถึง 5 เป็นสมาชิกของ <Math tex="A" /> แต่ไม่ใช่สมาชิกของ <Math tex="B" /> เพราะสมาชิกสองตัวแรกของ <Math tex="B" /> เป็น “เซต” ส่วนจำนวนเต็มตั้งแต่ 6 เป็นต้นไปอยู่ในทั้งสองเซต</p><Math block tex="A-B=\{1,2,3,4,5\},\qquad B-A=\{\{1,2\},\{3,4,5\}\}" /><p>ยูเนียนจึงมีจำนวนเต็ม 5 ตัวและเซตอีก 2 เซต รวม 7 สมาชิก</p>{answer("7 ตัว")}</>,
  },
  {
    code: "0032",
    question: <><p>กำหนดให้ <Math tex="P,Q,R" /> และ <Math tex="S" /> เป็นประพจน์ ตารางค่าความจริงของประพจน์</p><Math block tex="((P\to Q)\to R)\to S" /><p>จะมีกรณีที่ค่าความจริงเป็นจริงเท่ากับข้อใดต่อไปนี้</p>{choices("6 กรณี", "8 กรณี", "11 กรณี", "12 กรณี")}</>,
    solution: <><p>มีค่าความจริงของ <Math tex="P,Q,R,S" /> ทั้งหมด <Math tex="2^4=16" /> กรณี ประพจน์จะเป็นเท็จเมื่อ <Math tex="S" /> เป็นเท็จและ <Math tex="(P\to Q)\to R" /> เป็นจริง</p><p>ใน 8 กรณีของ <Math tex="P,Q,R" /> ประพจน์ <Math tex="(P\to Q)\to R" /> เป็นเท็จเฉพาะเมื่อ <Math tex="P\to Q" /> จริงและ <Math tex="R" /> เท็จ ซึ่งมี 3 กรณี จึงเป็นจริง 5 กรณี</p><Math block tex="16-5=11" />{answer("11 กรณี (ข้อ 3)")}</>,
  },
  {
    code: "0026",
    question: <><p>ให้ <Math tex="p(x)" /> เป็นพหุนาม ถ้าหาร <Math tex="p(x)" /> ด้วย <Math tex="x-1" /> เหลือเศษ 3 และถ้าหาร <Math tex="p(x)" /> ด้วย <Math tex="x-3" /> เหลือเศษ 5 ถ้า <Math tex="r(x)=ax+b" /> คือเศษที่เกิดจากการหาร <Math tex="p(x)" /> ด้วย <Math tex="(x-1)(x-3)" /> แล้ว <Math tex="3a+2b" /> เท่ากับเท่าใด</p></>,
    solution: <><p>จากทฤษฎีเศษเหลือได้ <Math tex="p(1)=3" /> และ <Math tex="p(3)=5" /> โดยเศษ <Math tex="r(x)=ax+b" /> ต้องให้ค่าเดียวกันที่รากของตัวหาร</p><Math block tex="a+b=3,\qquad 3a+b=5" /><p>ลบสมการได้ <Math tex="2a=2" /> ดังนั้น <Math tex="a=1" /> และ <Math tex="b=2" /></p>{answer(<Math tex="3a+2b=3(1)+2(2)=7" />)}</>,
  },
  {
    code: "0027",
    question: <><p>กำหนดให้ <Math tex="P(x)=ax^5+bx^3+cx+d" /> เมื่อ <Math tex="a,b,c,d" /> เป็นค่าคงตัว ถ้า <Math tex="x-1" /> หาร <Math tex="P(x)" /> เหลือเศษ 10 และ <Math tex="x" /> หาร <Math tex="P(x)" /> เหลือเศษ 6 แล้ว <Math tex="x+1" /> หาร <Math tex="P(x)" /> เหลือเศษเท่ากับข้อใดต่อไปนี้</p>{choices("-10", "-6", "2", "4", "6")}</>,
    solution: <><p>จาก <Math tex="P(0)=6" /> ได้ <Math tex="d=6" /> และจาก <Math tex="P(1)=10" /> ได้</p><Math block tex="a+b+c+d=10\quad\Rightarrow\quad a+b+c=4" /><p>เศษจากการหารด้วย <Math tex="x+1" /> คือ</p><Math block tex="P(-1)=-(a+b+c)+d=-4+6=2" />{answer("2 (ข้อ 3)")}</>,
  },
  {
    code: "0018",
    question: <><p>ให้ <Math tex="\ell_1" /> เป็นเส้นตรง <Math tex="2x-3y-6=0" /> ที่ตัดแกน <Math tex="X" /> และแกน <Math tex="Y" /> ที่จุด <Math tex="A" /> และ <Math tex="B" /> ตามลำดับ จุด <Math tex="C" /> เป็นจุดกึ่งกลางระหว่าง <Math tex="A" /> และ <Math tex="B" /> และ <Math tex="\ell_2" /> เป็นเส้นตรงที่ตั้งฉากกับ <Math tex="\ell_1" /> ที่จุด <Math tex="C" /> และตัดแกน <Math tex="X" /> ที่จุด <Math tex="D" /> แล้วพื้นที่ของสามเหลี่ยม <Math tex="ACD" /> คือข้อใดต่อไปนี้</p>{choices(<Math tex="\frac{13}{12}" />, <Math tex="\frac{13}{8}" />, <Math tex="\frac{13}{6}" />, <Math tex="\frac{13}{4}" />)}</>,
    solution: <><p>เส้นตรง <Math tex="\ell_1" /> ตัดแกนที่ <Math tex="A=(3,0)" /> และ <Math tex="B=(0,-2)" /> จึงได้จุดกึ่งกลาง <Math tex="C=(\frac32,-1)" /> ความชันของ <Math tex="\ell_1" /> คือ <Math tex="\frac23" /> ดังนั้น <Math tex="\ell_2" /> มีความชัน <Math tex="-\frac32" /></p><Math block tex="\ell_2:y=-\frac32x+\frac54" /><p>จุดตัดแกน <Math tex="X" /> คือ <Math tex="D=(\frac56,0)" /> ฐาน <Math tex="AD" /> ยาว <Math tex="3-\frac56=\frac{13}{6}" /> และความสูงเท่ากับ 1</p>{answer(<Math tex="\frac12\left(\frac{13}{6}\right)(1)=\frac{13}{12}\ \text{ตารางหน่วย (ข้อ 1)}" />)}</>,
  },
  {
    code: "0019",
    question: <><p>กำหนดให้ <Math tex="a" /> เป็นจำนวนจริง และ <Math tex="A(a,1),B(-5,-4),C(1,-2),D(2,3)" /> เป็นจุดยอดของรูปสี่เหลี่ยมด้านขนาน <Math tex="ABCD" /> ถ้า <Math tex="\ell" /> เป็นเส้นตรงที่ตั้งฉากกับ <Math tex="AC" /> และผ่านจุดกึ่งกลางของด้าน <Math tex="AC" /> แล้วสมการของเส้นตรง <Math tex="\ell" /> คือสมการในข้อใดต่อไปนี้</p>{choices(<Math tex="5x-3y+6=0" />, <Math tex="5x-3y-6=0" />, <Math tex="5x-3y+9=0" />, <Math tex="5x-3y-9=0" />)}</>,
    solution: <><p>เส้นทแยงมุมของรูปสี่เหลี่ยมด้านขนานตัดกันครึ่งหนึ่ง จึงมี <Math tex="A+C=B+D" /> และได้ <Math tex="a+1=-5+2" /> ดังนั้น <Math tex="a=-4" /></p><p>จุดกึ่งกลางของ <Math tex="AC" /> คือ <Math tex="(-\frac32,-\frac12)" /> และความชันของ <Math tex="AC" /> เท่ากับ <Math tex="-\frac35" /> เส้นตั้งฉากจึงมีความชัน <Math tex="\frac53" /></p><Math block tex="y+\frac12=\frac53\left(x+\frac32\right)\quad\Rightarrow\quad5x-3y+6=0" />{answer("ข้อ 1")}</>,
  },
  {
    code: "กสพท.",
    question: <><p>จำนวนเต็ม <Math tex="a,b,c" /> หารด้วย 7 แล้วเหลือเศษ 1, 3, 5 ตามลำดับ ข้อใดต่อไปนี้หารด้วย 7 แล้วเหลือเศษมากที่สุด</p>{choices(<Math tex="a^2+b^2+c^2" />, <Math tex="-a^2+b^2+c^2" />, <Math tex="a^2-b^2+c^2" />, <Math tex="a^2+b^2-c^2" />, <Math tex="-a^2-b^2+c^2" />)}</>,
    solution: <><p>เมื่อคิดมอดูโล 7 จะได้</p><Math block tex="a^2\equiv1,\qquad b^2\equiv3^2\equiv2,\qquad c^2\equiv5^2\equiv4\pmod7" /><p>เศษของตัวเลือกทั้งห้าตามลำดับคือ <Math tex="0,5,3,6,1" /> ดังนั้นเศษมากที่สุดคือ 6</p>{answer(<Math tex="a^2+b^2-c^2\ \text{(ข้อ 4)}" />)}</>,
  },
  {
    code: "0033",
    question: <><p>กำหนดให้ <Math tex="r" /> เป็นความสัมพันธ์ในเซตของจำนวนจริง โดยที่</p><Math block tex="r=\left\{(x,y)\mid y=\sqrt{\frac{1-x^2}{1+x^2}}\right\}" /><p>ข้อใดต่อไปนี้ถูก</p>{choices(<Math tex="D_r=[-1,1],\ D_{r^{-1}}=[-1,1]" />, <Math tex="D_r=[-1,1],\ D_{r^{-1}}=[0,1]" />, <Math tex="D_r=[0,1],\ D_{r^{-1}}=[-1,1]" />, <Math tex="D_r=[0,1],\ D_{r^{-1}}=[0,1]" />)}</>,
    solution: <><p>เพราะ <Math tex="1+x^2>0" /> เสมอ เงื่อนไขภายในรากคือ <Math tex="1-x^2\ge0" /> จึงได้ <Math tex="-1\le x\le1" /></p><p>บนช่วงนี้อัตราส่วนภายในรากมีค่าตั้งแต่ 0 ถึง 1 ทำให้ <Math tex="0\le y\le1" /> และโดเมนของความสัมพันธ์ผกผันเท่ากับเรนจ์ของความสัมพันธ์เดิม</p>{answer(<Math tex="D_r=[-1,1],\ D_{r^{-1}}=[0,1]\ \text{(ข้อ 2)}" />)}</>,
  },
  {
    code: "0034",
    question: <><p>ให้</p><Math block tex="r=\left\{(x,y)\mid y=\frac{x^2-4}{\sqrt{x}-2}\right\}" /><p>พิจารณาข้อความต่อไปนี้</p><p>ก. <Math tex="4\in R_r" /></p><p>ข. <Math tex="R_{r^{-1}}=[0,4)\cup(4,\infty)" /></p><p>ข้อใดต่อไปนี้ถูก</p>{choices("ก. ถูก และ ข. ถูก", "ก. ถูก และ ข. ผิด", "ก. ผิด และ ข. ถูก", "ก. ผิด และ ข. ผิด")}</>,
    solution: <><p>โดเมนของ <Math tex="r" /> ต้องมี <Math tex="x\ge0" /> และ <Math tex="x\ne4" /> ดังนั้น <Math tex="R_{r^{-1}}=D_r=[0,4)\cup(4,\infty)" /> ข้อ ข. ถูก</p><p>ตรวจว่า 4 อยู่ในเรนจ์หรือไม่ ให้ <Math tex="t=\sqrt{x}\ge0" /> สมการ <Math tex="4=(x^2-4)/(\sqrt{x}-2)" /> จะเท่ากับ</p><Math block tex="t^4-4t+4=0" /><p>ฟังก์ชันด้านซ้ายมีค่าต่ำสุดที่ <Math tex="t=1" /> และมีค่าต่ำสุดเท่ากับ 1 จึงไม่มีคำตอบ ข้อ ก. ผิด</p>{answer("ก. ผิด และ ข. ถูก (ข้อ 3)")}</>,
  },
  {
    code: "0036",
    question: <><p>จงหาค่าของ</p><Math block tex="\sqrt{7-\sqrt{48}}+\sqrt{7+\sqrt{48}}" /></>,
    solution: <><p>เขียน <Math tex="\sqrt{48}=2\sqrt{12}" /> และ <Math tex="7=4+3" /> จะได้</p><Math block tex="\sqrt{(2-\sqrt3)^2}+\sqrt{(2+\sqrt3)^2}" /><p>เนื่องจาก <Math tex="2-\sqrt3>0" /> ค่าที่ได้คือ</p>{answer(<Math tex="(2-\sqrt3)+(2+\sqrt3)=4" />)}</>,
  },
  {
    code: "0037",
    question: <><p>ถ้า</p><Math block tex="\sqrt{2x^2-1+2x\sqrt{x^2-1}}=\left|ax+\sqrt{x^2-1}\right|" /><p>แล้ว <Math tex="\sqrt a" /> เท่ากับเท่าไร</p></>,
    solution: <><p>จัดพจน์ภายในรากเป็นกำลังสองสมบูรณ์ได้ว่า</p><Math block tex="2x^2-1+2x\sqrt{x^2-1}=x^2+(x^2-1)+2x\sqrt{x^2-1}=\left(x+\sqrt{x^2-1}\right)^2" /><p>จึงเปรียบเทียบกับด้านขวาได้ <Math tex="a=1" /></p>{answer(<Math tex="\sqrt a=1" />)}</>,
  },
  {
    code: "0029",
    question: <><p>จำนวนรากของสมการ <Math tex="\sin x=\log x" /> เป็นเท่าใด (กำหนดให้ <Math tex="\log" /> เป็นลอการิทึมฐาน 10)</p></>,
    solution: <><p>ต้องมี <Math tex="x>0" /> และเพราะ <Math tex="\sin x\le1" /> จึงพิจารณาเพียง <Math tex="x\le10" /> สำหรับ <Math tex="0<x<1" /> จะมี <Math tex="\sin x>0" /> แต่ <Math tex="\log x<0" /> จึงไม่มีราก</p><p>บนช่วง <Math tex="(1,\pi)" /> มีจุดตัด 1 จุด ส่วนช่วง <Math tex="(2\pi,3\pi)" /> กราฟไซน์เริ่มต่ำกว่ากราฟลอการิทึม สูงกว่าเมื่อใกล้ <Math tex="5\pi/2" /> แล้วกลับต่ำกว่าก่อน <Math tex="3\pi" /> จึงมีอีก 2 จุด ช่วงอื่นใน <Math tex="(1,10]" /> ค่าไซน์ไม่เป็นบวกพอที่จะตัดกราฟลอการิทึม</p>{answer("3 ราก")}</>,
  },
  {
    code: "0041",
    question: <><p>กำหนดให้ <Math tex="A" /> เป็นเมทริกซ์ขนาด <Math tex="3\times3" /> และ <Math tex="I" /> คือเมทริกซ์เอกลักษณ์ขนาด <Math tex="3\times3" /> ถ้า <Math tex="A^2+3A=I" /> แล้ว</p><Math block tex="\det(AA^t+A^t+2A+2I)" /><p>เท่ากับข้อใดต่อไปนี้</p>{choices("1", "3", "9", "27")}</>,
    solution: <><p>แยกตัวประกอบเมทริกซ์ภายในดีเทอร์มิแนนต์ได้</p><Math block tex="AA^t+A^t+2A+2I=(A+I)(A^t+2I)" /><p>จาก <Math tex="A^2+3A=I" /> มี <Math tex="A(A+2I)=-(A-I)" /> และ <Math tex="A^2-I=-3A" /> ดังนั้น</p><Math block tex="\det(A+I)\det(A+2I)=-\frac{\det(A^2-I)}{\det A}=-\frac{\det(-3A)}{\det A}=27" />{answer("27 (ข้อ 4)")}</>,
  },
  {
    code: "0042",
    question: <><p>กำหนดให้ <Math tex="A" /> และ <Math tex="B" /> เป็นเมทริกซ์มิติ <Math tex="3\times3" /> และ <Math tex="I" /> เป็นเมทริกซ์เอกลักษณ์มิติ <Math tex="3\times3" /> โดยที่ <Math tex="AB=A+B" /> และ <Math tex="\det(A-I)=8" /> จะได้ <Math tex="\det(I-B^t)" /> มีค่าเท่าใด</p></>,
    solution: <><p>เติม <Math tex="I" /> ทั้งสองข้างแล้วแยกตัวประกอบโดยตรง</p><Math block tex="AB-A-B+I=I\quad\Rightarrow\quad(A-I)(B-I)=I" /><p>หาดีเทอร์มิแนนต์และใช้ <Math tex="\det(A-I)=8" /> จะได้</p><Math block tex="8\det(B-I)=1\quad\Rightarrow\quad\det(B-I)=\frac18" /><p>เพราะเมทริกซ์มีมิติ 3</p>{answer(<Math tex="\det(I-B^t)=\det(-(B-I)^t)=(-1)^3\det(B-I)=-\frac18" />)}</>,
  },
  {
    code: "0049",
    question: <><p>จงพิจารณาข้อความต่อไปนี้</p><p>ก. <Math tex="\lVert\vec u-\vec v\rVert^2<\lVert\vec u\rVert^2-\lVert\vec v\rVert^2" /></p><p>ข. ถ้า <Math tex="\vec u\perp\vec v" /> แล้ว <Math tex="\lVert\vec u-\vec v\rVert^2=\lVert\vec u\rVert^2+\lVert\vec v\rVert^2" /></p><p>ข้อใดต่อไปนี้ถูก</p>{choices("ข้อ ก. ถูก ข้อ ข. ถูก", "ข้อ ก. ถูก ข้อ ข. ผิด", "ข้อ ก. ผิด ข้อ ข. ถูก", "ข้อ ก. ผิด ข้อ ข. ผิด")}</>,
    solution: <><p>ใช้เอกลักษณ์</p><Math block tex="\lVert\vec u-\vec v\rVert^2=\lVert\vec u\rVert^2-2\vec u\cdot\vec v+\lVert\vec v\rVert^2" /><p>ข้อความ ก. ไม่จริงเสมอ เช่น เมื่อ <Math tex="\vec u=\vec v" /> ทั้งสองข้างเป็น 0 จึงไม่เป็นอสมการแบบน้อยกว่า ส่วนถ้า <Math tex="\vec u\perp\vec v" /> จะมี <Math tex="\vec u\cdot\vec v=0" /> ทำให้ข้อความ ข. ถูก</p>{answer("ข้อ ก. ผิด ข้อ ข. ถูก (ข้อ 3)")}</>,
  },
  {
    code: "0050",
    question: <><p>พิจารณาข้อความต่อไปนี้</p><p>ก. ให้ <Math tex="\vec w=a\vec i+b\vec j+c\vec k" /> เมื่อ <Math tex="a,b,c" /> เป็นจำนวนจริง และให้ <Math tex="\vec u=\vec i+2\vec j+\vec k" />, <Math tex="\vec v=\vec i-\vec j+\vec k" /> ถ้า <Math tex="\vec w" /> ตั้งฉากกับ <Math tex="\vec u" /> และ <Math tex="\vec v" /> แล้ว <Math tex="a+b+c=1" /></p><p>ข. ให้ <Math tex="\vec u=2\vec i+\vec j" /> และ <Math tex="\vec v=a\vec i+b\vec j" /> เป็นเวกเตอร์ในระนาบ ถ้า <Math tex="\lVert\vec v\rVert=\frac3{\sqrt5}" /> และ <Math tex="\vec u\cdot\vec v=3" /> แล้ว <Math tex="\vec u" /> ทำมุม <Math tex="60^\circ" /> กับ <Math tex="\vec v" /></p><p>ข้อใดต่อไปนี้ถูกต้อง</p>{choices("ก. ถูก และ ข. ถูก", "ก. ถูก แต่ ข. ผิด", "ก. ผิด แต่ ข. ถูก", "ก. ผิด และ ข. ผิด")}</>,
    solution: <><p>จากความตั้งฉากในข้อ ก. ได้ <Math tex="a+2b+c=0" /> และ <Math tex="a-b+c=0" /> ลบกันได้ <Math tex="b=0" /> และ <Math tex="a+c=0" /> จึงมี <Math tex="a+b+c=0" /> ไม่ใช่ 1</p><p>ข้อ ข. มี <Math tex="\lVert\vec u\rVert=\sqrt5" /> ดังนั้น</p><Math block tex="\cos\theta=\frac{\vec u\cdot\vec v}{\lVert\vec u\rVert\lVert\vec v\rVert}=\frac3{\sqrt5(3/\sqrt5)}=1" /><p>จึงได้ <Math tex="\theta=0^\circ" /> ไม่ใช่ <Math tex="60^\circ" /></p>{answer("ก. ผิด และ ข. ผิด (ข้อ 4)")}</>,
  },
  {
    code: "0040",
    question: <><p>ให้ <Math tex="z" /> เป็นจำนวนเชิงซ้อน ซึ่ง</p><Math block tex="z=\frac{\overline{(i-\sqrt3)}(\sqrt3-i)^4}{-2+2\sqrt3i}" /><p>จงหา <Math tex="|\operatorname{Im}(z)|" /> เมื่อ <Math tex="\operatorname{Im}(z)" /> คือส่วนจินตภาพของ <Math tex="z" /></p></>,
    solution: <><p>ใช้ <Math tex="\overline{(i-\sqrt3)}=-i-\sqrt3" /> และ <Math tex="(\sqrt3-i)^2=2-2\sqrt3i" /> จะได้</p><Math block tex="z=\frac{(-i-\sqrt3)(2-2\sqrt3i)^2}{-2+2\sqrt3i}=4\sqrt3-4i" /><p>ส่วนจินตภาพจึงเท่ากับ <Math tex="-4" /></p>{answer(<Math tex="|\operatorname{Im}(z)|=4" />)}</>,
  },
  {
    code: "0041",
    question: <><p>ให้ <Math tex="z_1" /> และ <Math tex="z_2" /> เป็นจำนวนเชิงซ้อนใด ๆ และ <Math tex="\overline{z_1}" /> เป็นสังยุคของจำนวนเชิงซ้อน <Math tex="z_1" /> จงพิจารณาข้อความต่อไปนี้</p><p>ก. <Math tex="|\overline{z_1}|=|z_1|" /></p><p>ข. <Math tex="|z_1+z_2|=|z_1|+|z_2|" /></p><p>ค. <Math tex="|z_1z_2|=|z_1||z_2|" /></p><p>ข้อใดต่อไปนี้ถูก</p>{choices("ข้อ ก. หรือ ข้อ ข. หรือ ข้อ ค. ถูกเพียงข้อเดียวเท่านั้น", "ข้อ ก. และ ข้อ ข. เท่านั้นที่ถูก", "ข้อ ข. และ ข้อ ค. เท่านั้นที่ถูก", "ข้อ ก. และ ข้อ ค. เท่านั้นที่ถูก")}</>,
    solution: <><p>โมดูลัสไม่เปลี่ยนเมื่อหาสังยุค จึงได้ <Math tex="|\overline{z_1}|=|z_1|" /> และโมดูลัสของผลคูณเท่ากับผลคูณของโมดูลัสเสมอ จึงได้ <Math tex="|z_1z_2|=|z_1||z_2|" /></p><p>ส่วน <Math tex="|z_1+z_2|\le|z_1|+|z_2|" /> เป็นอสมการสามเหลี่ยม โดยจะเท่ากันเฉพาะบางกรณี ไม่จริงสำหรับจำนวนเชิงซ้อนใด ๆ ทุกคู่</p>{answer("ข้อ ก. และ ข้อ ค. เท่านั้นที่ถูก (ข้อ 4)")}</>,
  },
  {
    code: "0046",
    question: <><p>ถ้า <Math tex="a_n" /> เป็นลำดับเลขคณิตซึ่ง</p><Math block tex="\lim_{n\to\infty}\left(\frac{a_{n+1}^2-a_n^2}{n}\right)=4" /><p>แล้ว <Math tex="\sqrt{\frac{a_{17}-a_9}{2}}" /> มีค่าเท่าใด</p></>,
    solution: <><p>ให้ผลต่างร่วมเป็น <Math tex="d" /> จะมี <Math tex="a_n=a_1+(n-1)d" /> และ</p><Math block tex="\frac{a_{n+1}^2-a_n^2}{n}=\frac{(a_{n+1}+a_n)d}{n}\longrightarrow2d^2" /><p>จึงได้ <Math tex="2d^2=4" /> หรือ <Math tex="d^2=2" /> เนื่องจากปริมาณใต้รากในคำถามเป็นจำนวนจริงไม่ลบ จึงเลือก <Math tex="d=\sqrt2" /></p><Math block tex="\sqrt{\frac{a_{17}-a_9}{2}}=\sqrt{\frac{8d}{2}}=\sqrt{4\sqrt2}=2\sqrt[4]{2}" />{answer(<><Math tex="2\sqrt[4]{2}" /> หรือประมาณ 2.38</>)}</>,
  },
  {
    code: "0047",
    question: <><p>กำหนดให้ <Math tex="\beta" /> เป็นจำนวนจริง และให้ <Math tex="\{a_n\}" /> เป็นลำดับของจำนวนจริงที่นิยามโดย</p><Math block tex="a_n=\frac{\beta n-7}{n+2}\qquad n=1,2,3,\ldots" /><p>ถ้าผลบวก 9 พจน์แรกมีค่ามากกว่าผลบวก 7 พจน์แรกเป็นจำนวนเท่ากับ <Math tex="a_{108}" /> แล้ว <Math tex="\lim_{n\to\infty}a_n" /> มีค่าเท่ากับเท่าใด</p></>,
    solution: <><p>ผลต่างของผลบวกคือ <Math tex="a_8+a_9" /> จึงมี</p><Math block tex="\frac{8\beta-7}{10}+\frac{9\beta-7}{11}=\frac{108\beta-7}{110}" /><p>คูณด้วย 110 แล้วจัดรูปได้ <Math tex="178\beta-147=108\beta-7" /> ดังนั้น <Math tex="70\beta=140" /> และ <Math tex="\beta=2" /></p>{answer(<Math tex="\lim_{n\to\infty}\frac{2n-7}{n+2}=2" />)}</>,
  },
  {
    code: "0032",
    question: <><p>กำหนดให้</p><Math block tex="f(x)=\begin{cases}1,&x\le0\\0,&x>0\end{cases}" /><p>พิจารณาข้อความต่อไปนี้</p><p>ก. <Math tex="\displaystyle\lim_{x\to0^-}(f\circ f)(x)=0" /></p><p>ข. <Math tex="\displaystyle\lim_{x\to0^+}(f\circ f)(x)=1" /></p><p>ข้อใดต่อไปนี้ถูก</p>{choices("ก. ถูก และ ข. ถูก", "ก. ถูก และ ข. ผิด", "ก. ผิด และ ข. ถูก", "ก. ผิด และ ข. ผิด")}</>,
    solution: <><p>ถ้า <Math tex="x\le0" /> จะมี <Math tex="f(x)=1" /> และ <Math tex="f(f(x))=f(1)=0" /> ส่วนถ้า <Math tex="x>0" /> จะมี <Math tex="f(x)=0" /> และ <Math tex="f(f(x))=f(0)=1" /></p><p>ลิมิตทางซ้ายจึงเป็น 0 และลิมิตทางขวาเป็น 1</p>{answer("ก. ถูก และ ข. ถูก (ข้อ 1)")}</>,
  },
  {
    code: "0033",
    question: <><p>กำหนดให้ <Math tex="a>0" />, <Math tex="g(x)=x^2" /> และ</p><Math block tex="f(x)=\begin{cases}\dfrac{x}{x+2},&x<a\\[4pt]\dfrac{x+1}{x},&x\ge a\end{cases}" /><p>ถ้า</p><Math block tex="\lim_{x\to a^+}(f\circ g)(\sqrt{x})-\sqrt{\lim_{x\to a^-}(g\circ f)(x)}=\frac{11}{a(a+2)}" /><p>แล้ว <Math tex="a" /> มีค่าเท่ากับข้อใดต่อไปนี้</p>{choices("1", "3", "5", "9")}</>,
    solution: <><p>เพราะ <Math tex="g(\sqrt x)=x" /> ลิมิตแรกทางขวาใช้สาขา <Math tex="x\ge a" /> ของ <Math tex="f" /> จึงได้ <Math tex="(a+1)/a" /> ส่วนลิมิตที่สองทางซ้ายใช้ <Math tex="f(x)=x/(x+2)" /> และ <Math tex="a>0" /> จึงได้</p><Math block tex="\sqrt{\left(\frac{a}{a+2}\right)^2}=\frac{a}{a+2}" /><p>ดังนั้น</p><Math block tex="\frac{a+1}{a}-\frac{a}{a+2}=\frac{3a+2}{a(a+2)}=\frac{11}{a(a+2)}" /><p>ได้ <Math tex="3a+2=11" /></p>{answer(<Math tex="a=3\ \text{(ข้อ 2)}" />)}</>,
  },
  {
    code: "0055",
    question: <><p>ตารางแจกแจงความถี่ของข้อมูลชุดหนึ่ง ซึ่งมีความกว้างของแต่ละอันตรภาคชั้นเท่ากัน เป็นดังต่อไปนี้</p><FrequencyTable /><p>ให้ <Math tex="\bar x" /> เป็นค่าเฉลี่ยเลขคณิตและ <Math tex="med" /> เป็นมัธยฐานของข้อมูล ข้อใดต่อไปนี้ถูก</p>{choices(<><Math tex="\bar x=19" /> และ <Math tex="med=19.75" /></>, <><Math tex="\bar x=19" /> และ <Math tex="med=17.5" /></>, <><Math tex="\bar x=20" /> และ <Math tex="med=19.75" /></>, <><Math tex="\bar x=20" /> และ <Math tex="med=17.5" /></>)}</>,
    solution: <><p>แปลงความถี่สะสมเป็นความถี่แต่ละชั้นได้ <Math tex="8,8,20,4,10" /> รวม 50 ค่า ค่าเฉลี่ยคือ</p><Math block tex="\bar x=\frac{8(10)+8(15)+20(20)+4(25)+10(30)}{50}=20" /><p>ตำแหน่งมัธยฐานคือ 25 อยู่ในชั้นที่มีจุดกึ่งกลาง 20 ขอบล่าง 17.5 ความถี่ชั้น 20 และความถี่สะสมก่อนหน้า 16</p><Math block tex="med=17.5+5\left(\frac{25-16}{20}\right)=19.75" />{answer(<><Math tex="\bar x=20" /> และ <Math tex="med=19.75" /> (ข้อ 3)</>)}</>,
  },
  {
    code: "0056",
    question: <><p>นักเรียนห้องหนึ่งมี 51 คน ทำการสำรวจข้อมูลน้ำหนักของนักเรียนทั้งห้องโดยพบว่าค่ามัธยฐานเป็น 70 ภายหลังพบว่าอ่านข้อมูล 2 ตัวผิดไป คือ 63 และ 88 โดยอ่านน้อยกว่าความเป็นจริง 5 และอ่านมากกว่าความเป็นจริง 3 จงหามัธยฐานที่ถูกต้อง</p></>,
    solution: <><p>ค่าที่ถูกต้องคือ <Math tex="63+5=68" /> และ <Math tex="88-3=85" /> ข้อมูลเดิมตัวหนึ่งอยู่ต่ำกว่า 70 และอีกตัวอยู่สูงกว่า 70 เมื่อแก้แล้ว 68 ยังต่ำกว่า 70 และ 85 ยังสูงกว่า 70 ตำแหน่งข้อมูลลำดับกลางของข้อมูล 51 ค่าจึงไม่เปลี่ยน</p>{answer("70")}</>,
  },
  {
    code: "0057",
    question: <><p>นายดำลงทะเบียนเรียนในภาคการศึกษาหนึ่ง 4 วิชา โดยมีผลการเรียนดังตาราง นายดำได้เกรดเฉลี่ยเท่ากับข้อใด</p><GradeTable />{choices("2.17", "2.50", "2.60", "3.00")}</>,
    solution: <><p>เกรดเฉลี่ยเป็นค่าเฉลี่ยถ่วงน้ำหนักด้วยหน่วยกิต</p><Math block tex="\bar x=\frac{1(4)+2(4)+3(2)+4(2)}{1+2+3+4}=\frac{26}{10}=2.60" />{answer("2.60 (ข้อ 3)")}</>,
  },
  {
    code: "0038",
    question: <><p>ทอดลูกเต๋าสามลูกพร้อมกัน ความน่าจะเป็นที่ผลบวกของแต้มบนหน้าลูกเต๋าทั้งสามมีค่ามากกว่าหรือเท่ากับ 4 มีค่าเท่ากับข้อใด</p>{choices(<Math tex="\frac{71}{72}" />, <Math tex="\frac{107}{108}" />, <Math tex="\frac{213}{216}" />, <Math tex="\frac{215}{216}" />)}</>,
    solution: <><p>มีผลลัพธ์ที่เป็นไปได้เท่ากันทั้งหมด <Math tex="6^3=216" /> แบบ เหตุการณ์ตรงข้ามคือผลบวกน้อยกว่า 4 ซึ่งเกิดได้เพียงกรณี <Math tex="(1,1,1)" /> กรณีเดียว</p>{answer(<Math tex="1-\frac1{216}=\frac{215}{216}\ \text{(ข้อ 4)}" />)}</>,
  },
  {
    code: "0039",
    question: <><p>กล่องใบหนึ่งบรรจุขนมชั้น 24 ชิ้น แต่ละชิ้นมี 4 ชั้น ซึ่งมีสีเขียว ขาว แดง เหลือง และการเรียงลำดับสีของแต่ละชิ้นทั้ง 24 ชิ้นแตกต่างกันทั้งหมด ถ้าหยิบขนม 1 ชิ้นจากกล่องนี้โดยสุ่ม แล้วความน่าจะเป็นที่ชิ้นที่หยิบได้มีสองชั้นบนไม่ใช่สีแดงและไม่ใช่สีเหลืองเท่ากับข้อใดต่อไปนี้</p>{choices(<Math tex="\frac1{24}" />, <Math tex="\frac1{12}" />, <Math tex="\frac16" />, <Math tex="\frac14" />)}</>,
    solution: <><p>การเรียงสีทั้ง 4 สีมีทั้งหมด <Math tex="4!=24" /> แบบ ถ้าสองชั้นบนต้องเป็นสีเขียวกับสีขาว จะเรียงสองสีนี้ได้ <Math tex="2!" /> แบบ และชั้นล่างสองชั้นเป็นสีแดงกับสีเหลืองเรียงได้อีก <Math tex="2!" /> แบบ</p>{answer(<Math tex="\frac{2!\,2!}{4!}=\frac4{24}=\frac16\ \text{(ข้อ 3)}" />)}</>,
  },
  {
    code: "0013",
    question: <><p>นักฟุตบอลคนหนึ่งมีโอกาสยิงเข้าประตู 80% ในการยิงประตูแต่ละครั้ง ถ้านักฟุตบอลคนนี้ยิงประตู 5 ครั้ง จงหาความน่าจะเป็นที่</p><p>1) เขาจะยิงได้อย่างน้อย 2 ประตู</p><p>2) เขาจะยิงไม่เข้าประตูเลย</p></>,
    solution: <><p>ให้ <Math tex="X" /> เป็นจำนวนประตูที่ยิงเข้า จะมี <Math tex="X\sim B(5,0.8)" /></p><Math block tex="P(X\ge2)=1-P(X=0)-P(X=1)" /><Math block tex="=1-(0.2)^5-\binom51(0.8)(0.2)^4=0.99328" /><p>ส่วนความน่าจะเป็นที่จะยิงไม่เข้าเลยคือ</p><Math block tex="P(X=0)=(0.2)^5=0.00032" />{answer(<><div>1) 0.99328</div><div>2) 0.00032</div></>)}</>,
  },
  {
    code: "0022",
    question: <><p>ถ้าสมการจุดประสงค์คือ <Math tex="P=35x-25y" /> และอสมการข้อจำกัดคือ</p><Math block tex="2x+3y\le15,\qquad3x+y\le12,\qquad x>0,\ y\ge0" /><p>แล้วค่าสูงสุดของ <Math tex="P" /> เท่ากับเท่าใด</p></>,
    solution: <><p>จุดยอดที่เกี่ยวข้องของบริเวณคำตอบคือ <Math tex="(4,0)" /> และจุดตัดของเส้นข้อจำกัด <Math tex="(3,3)" /> รวมทั้งจุดบนขอบแกน <Math tex="Y" /> สำหรับพิจารณาค่าสูงสุด</p><Math block tex="P(4,0)=140,\qquad P(3,3)=30" /><p>ค่าบนขอบด้านซ้ายไม่เกินค่านี้ ดังนั้นค่าสูงสุดเกิดที่ <Math tex="(4,0)" /></p>{answer("140")}</>,
  },
  {
    code: "PAT1-7",
    question: <><p>จำนวนต่อไปนี้เรียกว่า “จำนวน PAT”</p><p>16325, 34721, 12347, 52163, 90341, 50381</p><p>จำนวนต่อไปนี้ “ไม่เป็นจำนวน PAT”</p><p>2564, 12345, 854, 12635, 34325, 45026</p><p>ข้อใดต่อไปนี้เป็น “จำนวน PAT”</p>{choices("75401", "13562", "72341", "83051")}</>,
    solution: <><p>จากตัวอย่าง จำนวน PAT ต้องเป็นเลข 5 หลักที่เลขโดดไม่ซ้ำกัน ผลบวกของเลขโดดเท่ากับ 17 และตำแหน่งเลขโดดสลับคี่-คู่-คี่-คู่-คี่</p><p>มีเพียง 72341 ที่มีเลขโดด 5 ตัวไม่ซ้ำกัน ผลบวก <Math tex="7+2+3+4+1=17" /> และมีรูปแบบคี่-คู่-คี่-คู่-คี่</p>{answer("72341 (ข้อ 3)")}</>,
  },
];
