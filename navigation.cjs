const routes=['/','/services/','/sectors/','/areas/melbourne/','/insights/','/faq/','/about/','/contact/'];
exports.routes=routes;
exports.rewrite=html=>html.replace(/(<nav[^>]*id="main-nav"[^>]*>)([\s\S]*?)(<\/nav>)/,(all,start,links,end)=>{let i=0;return start+links.replace(/<a\b([^>]*)>/g,(tag,attrs)=>{const route=routes[i++];if(!route)throw Error('Unexpected navigation count');return '<a'+attrs.replace(/href="[^"]*"/,'href="'+route+'"').replace(/\sdata-nav-path="[^"]*"/g,'')+' data-nav-path="'+route+'">';})+end;});
