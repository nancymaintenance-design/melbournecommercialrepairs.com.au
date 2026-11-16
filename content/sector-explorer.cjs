const e=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
exports.section=(sectors,slugs,zh,en)=>'<section id="page-content" class="sector-explorer sector-kit-page" data-sector-kit-page aria-labelledby="sector-explorer-heading">'+
'<div class="sector-explorer-heading"><div><p class="sector-kicker" data-zh="商业场景 / MELBOURNE" data-en="COMMERCIAL SPACES / MELBOURNE">商业场景 / MELBOURNE</p><h1 id="sector-explorer-heading" data-zh="'+e(zh)+'" data-en="'+e(en)+'">'+e(zh)+'</h1></div></div>'+
'<div id="sector-kit" class="sector-kit-host" data-sector-kit></div>'+
'<nav class="sector-choices sector-direct-links" aria-label="Property sector details">'+sectors.map((s,i)=>'<a href="/sectors/'+slugs[i]+'/?lang=zh"><span class="sector-choice-index">'+String(i+1).padStart(2,'0')+'</span><span data-zh="'+e(s.zh)+'" data-en="'+e(s.en)+'">'+e(s.zh)+'</span><span aria-hidden="true">↗</span></a>').join('')+'</nav></section>';

