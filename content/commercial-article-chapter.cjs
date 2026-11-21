function inline(parts, {text,link}) {
 return parts.map(([kind,value,href])=>{
  if(kind==='link')return link(href,value,'','');
  if(kind==='strong')return '<strong>'+inline(value,{text,link})+'</strong>';
  return text('span',value);
 }).join('');
}

function table(rows, {text,copy,esc}) {
 const [header,...body]=rows;
 return `<div class="led-evidence-table"><div class="led-table-wrap"><table role="table">
  <thead role="rowgroup"><tr role="row">${header.map(pair=>`<th scope="col" role="columnheader" ${copy(pair)}>${esc(pair[0])}</th>`).join('')}</tr></thead>
  <tbody role="rowgroup">${body.map(([key,...cells])=>`<tr role="row">
   <th scope="row" role="rowheader">${text('span',key,'led-row-tag')}</th>
   ${cells.map((pair,index)=>`<td role="cell">${text('b',header[index+1],'led-mobile-label')}${text('span',pair)}</td>`).join('')}
  </tr>`).join('')}</tbody></table></div></div>`;
}

module.exports = function editorialChapter(index, heading, blocks, ui) {
 let body='';
 let reading=false;
 for(const [kind,value] of blocks) {
  if(kind==='heading'||kind==='table'){
   if(reading)body+='</div>';
   reading=false;
  }
  if(kind==='table'){
   body+=table(value,ui);
   continue;
  }
  if(!reading){
   body+='<div class="led-judgement">';
   reading=true;
  }
  if(kind==='heading')body+=ui.text('h3',value);
  if(kind==='paragraph')body+='<p>'+inline(value,ui)+'</p>';
  if(kind==='list')body+='<ul>'+value.map(item=>ui.text('li',item)).join('')+'</ul>';
 }
 if(reading)body+='</div>';
 if(index===1)return '<div class="led-evidence-panel"><div class="led-evidence-head">'+heading+'</div></div>'+body;
 if(index===3)return heading+'<div class="led-record-panel">'+body+'</div>';
 return heading+body;
};
