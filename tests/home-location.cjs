const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const business=require('../business.json');
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const contact=fs.readFileSync(path.join(root,'contact/index.html'),'utf8');
const tags=html=>[...html.matchAll(/<([a-z][\w:-]*)\b[^>]*>/gi)];
const attributes=tag=>Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(["'])([\s\S]*?)\2/g)].map(match=>[match[1],match[3]]));
const hasClass=(tag,name)=>(attributes(tag).class||'').split(/\s+/).includes(name);
const byId=(html,id)=>tags(html).filter(tag=>attributes(tag[0]).id===id);

function element(html,opening){
 assert(opening,'Expected HTML element');
 const name=opening[1],start=opening.index;
 const tokens=new RegExp('<\\/?'+name+'\\b[^>]*>','gi');
 tokens.lastIndex=start;
 let depth=0,token;
 while((token=tokens.exec(html))){
  depth+=token[0].startsWith('</')?-1:1;
  if(!depth)return {start,end:tokens.lastIndex,html:html.slice(start,tokens.lastIndex)};
 }
 assert.fail('Complete '+name+' element');
}
assert.equal(byId(home,'location').length,1,'Exactly one homepage map section');
assert.equal(byId(home,'contact').length,1,'Exactly one compatible #contact anchor');
const contactOpening=byId(home,'contact')[0];
assert.equal(contactOpening[1].toLowerCase(),'section','Restore the independent homepage Contact section');
assert(hasClass(contactOpening[0],'contact-section'),'Restore the original orange Contact layout class');
const contactHero=element(home,contactOpening);
const location=element(home,byId(home,'location')[0]);
assert.equal(location.html.match(/^<(\w+)/)[1],'section','Map keeps section semantics');
const copy=element(location.html,tags(location.html).find(tag=>hasClass(tag[0],'location-copy')));
const actions=element(copy.html,tags(copy.html).find(tag=>hasClass(tag[0],'location-actions')));
assert.equal(byId(actions.html,'contact').length,0,'The Contact anchor belongs to its restored section');
assert(!tags(home).some(tag=>hasClass(tag[0],'location-project-cta')),'Cancelled map CTA redesign is absent');
assert(!tags(home).some(tag=>tag[1].toLowerCase()==='link'&&/\/?home-location\.css(?:\?|$)/.test(attributes(tag[0]).href||'')),'Cancelled map stylesheet is not loaded');
const actionLinks=tags(actions.html).filter(tag=>tag[1].toLowerCase()==='a');
const consult=actionLinks.filter(tag=>attributes(tag[0]).href==='/#contact');
assert.equal(consult.length,1,'Original map enquiry link scrolls to /#contact');
const plain=value=>value.replace(/\s*[↗→]\s*$/,'').trim();
const consultationLabel=attributes(consult[0][0]);
assert.equal(plain(consultationLabel['data-zh']),'咨询物业项目','Original Chinese map enquiry label');
assert.equal(plain(consultationLabel['data-en']),'Discuss your property','Original English map enquiry label');
const phone=actionLinks.filter(tag=>hasClass(tag[0],'location-phone'));
assert.equal(phone.length,1,'One original map phone link');
assert.equal(attributes(phone[0][0]).href,business.telephoneHref,'Map phone uses the approved dial destination');
assert(element(actions.html,phone[0]).html.includes(business.telephoneDisplay),'Map phone displays the approved local number');
assert(actionLinks.some(tag=>attributes(tag[0]).href===business.mapsUrl),'Original left-side Google Maps button remains');

// These are the user's existing business map, not a new geocoded location.
assert.equal(business.mapsUrl,'https://maps.app.goo.gl/Pv4etoJxN2tekg9h9','Original real map URL remains unchanged');
const sourceMap=new URL(business.mapEmbedUrl);
assert.equal(sourceMap.searchParams.get('cid'),'5829696045991509477','Original business map CID remains unchanged');
const frames=tags(location.html).filter(tag=>tag[1].toLowerCase()==='iframe');
assert.equal(frames.length,1,'One actual embedded map');
const embedded=new URL(attributes(frames[0][0]).src.replace(/&amp;/g,'&'));
assert.equal(embedded.origin,sourceMap.origin,'Same Google map host');
assert.equal(embedded.pathname,sourceMap.pathname,'Same Google map route');
assert.equal(embedded.searchParams.get('cid'),sourceMap.searchParams.get('cid'),'Embedded map uses the original business CID');
assert.equal(embedded.searchParams.get('output'),'embed','Google map remains an embed');
assert(tags(location.html).some(tag=>tag[1].toLowerCase()==='a'&&attributes(tag[0]).href===business.mapsUrl),'Visible map link uses the real business listing');

const footer=tags(home).find(tag=>tag[1].toLowerCase()==='footer');
assert(footer&&footer.index>contactHero.end,'Footer follows the restored Contact section');
assert.equal(home.slice(location.end,contactHero.start).replace(/<!--[\s\S]*?-->/g,'').trim(),'','Original Contact section immediately follows the map');
assert.equal(home.slice(contactHero.end,footer.index).replace(/<!--[\s\S]*?-->/g,'').replace(/\s/g,''),'</main>','Restored Contact section is the final section before the footer');
assert.equal(tags(home).filter(tag=>tag[1].toLowerCase()==='section'&&hasClass(tag[0],'contact-section')).length,1,'Exactly one original Contact hero');
const quoteButtons=tags(contactHero.html).filter(tag=>tag[1].toLowerCase()==='button'&&/\bdata-quote(?:\s|>|=)/.test(tag[0]));
assert.equal(quoteButtons.length,1,'Original Contact quote-modal button remains');
const button=element(contactHero.html,quoteButtons[0]).html;
const buttonLabels=tags(button).map(tag=>attributes(tag[0]));
assert(buttonLabels.some(attrs=>attrs['data-zh']==='开始项目咨询'&&attrs['data-en']==='START A CONVERSATION'),'Original bilingual quote button copy remains');
const heroHeadings=tags(contactHero.html).filter(tag=>tag[1].toLowerCase()==='h2');
assert.equal(heroHeadings.length,1,'Original Contact uses one H2');
assert(attributes(heroHeadings[0][0])['data-zh']&&attributes(heroHeadings[0][0])['data-en'],'Original Contact title remains bilingual');
assert.equal((home.match(/<h1\b/g)||[]).length,1,'Homepage retains its single original H1');
assert.equal((location.html.match(/<h1\b/g)||[]).length,0,'Map adds no page H1');
assert.equal(byId(home,'quote-dialog').length,1,'Existing quote modal is retained');
assert.equal(byId(contact,'contact-enquiry-form').length,1,'Actual Contact page still has its enquiry form');
assert.equal((contact.match(/<h1\b/g)||[]).length,1,'Actual Contact page retains one H1');
assert.match(contact,/<body\b[^>]*\bcontact-page\b/,'Contact keeps its dedicated form layout');
console.log(JSON.stringify({mapSections:1,legacyContactAnchors:1,independentHomeContactHeroes:1,mapConsultation:'/#contact',originalQuoteButton:true,bilingual:true,mapCID:embedded.searchParams.get('cid'),mapURLPreserved:true,mapTelephoneCorrect:true,contactImmediatelyAfterMap:true,footerImmediatelyAfterContact:true,cancelledCTAAbsent:true,homepageH1:1,contactFormPreserved:true}));
