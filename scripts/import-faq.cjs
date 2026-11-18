// One-time import from the supplied design document's verbatim appendix.
// The production build consumes the checked-in JSON, never a Downloads path.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const input=process.argv[2];if(!input)throw Error('Pass the supplied FAQ design Markdown path');
const document=fs.readFileSync(input,'utf8');
const appendix=document.match(/```markdown\r?\n([\s\S]*?)\r?\n```/)[1];
const keys=['scope','urgent','quotes','building','roofing','waterproofing','plumbing','electrical','hvac','fire','finishes','grounds','tenancy'];
const shortZh=['服务范围','紧急报修','报价与记录','建筑木作','屋顶与天沟','防水渗漏','水管燃气','电气照明','空调通风','消防门禁','涂装地面','园林停车场','物业与退租'];
const shortEn=['Service scope','Urgent repairs','Quotes & records','Building & joinery','Roofs & gutters','Leaks & waterproofing','Plumbing & gas','Electrical & lighting','HVAC & ventilation','Fire & access','Painting & finishes','Grounds & car parks','Property & make good'];
const topics=[...appendix.matchAll(/^## (\d+)\. (.+?) \/ (.+)\r?\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)].map((m,i)=>({key:keys[i],number:Number(m[1]),short:{zh:shortZh[i],en:shortEn[i]},title:{zh:m[3].trim(),en:m[2].trim()},questions:[...m[4].matchAll(/^### Q(\d+)\. (.+?) \/ (.+)\r?\n\s*\*\*EN:\*\* ([\s\S]*?)\r?\n\s*\*\*中文：\*\* ([\s\S]*?)(?=^### |$(?![\s\S]))/gm)].map(q=>({id:'q'+q[1],number:Number(q[1]),question:{en:q[2].trim(),zh:q[3].trim()},answer:{en:q[4].trim(),zh:q[5].trim()}}))}));
const expected=[7,6,8,6,6,5,6,5,6,6,5,4,7];
if(topics.length!==13||topics.some((t,i)=>t.questions.length!==expected[i])||topics.flatMap(t=>t.questions).some((q,i)=>q.number!==i+1))throw Error('Incomplete FAQ source import');
const root=path.resolve(__dirname,'..');
fs.writeFileSync(path.join(root,'content/faq-source.md'),appendix.trimEnd()+'\n');
fs.writeFileSync(path.join(root,'content/faq-content.json'),JSON.stringify({source:{file:path.basename(input),appendixSha256:crypto.createHash('sha256').update(appendix).digest('hex')},topics},null,2)+'\n');
console.log('Imported 13 topics, 77 original Chinese and 77 original English questions/answers.');
