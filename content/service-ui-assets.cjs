/* Independent assets: reference mockups are never served as page backgrounds. */
const detail=name=>'/assets/region-reference-v3/detail-'+name+'.webp';
const design=name=>'/assets/design/'+name+'.webp';
const showcase=name=>'/assets/service-showcase/'+name+'.webp';
const problem=name=>'/assets/service-reference-v1/problem-'+name+'.webp';
const scenes=[
 [detail('door'),detail('wall-repair'),problem('building-ceiling'),problem('building-cabinet')],
 [detail('roof'),showcase('roofing-detail'),problem('roof-flashing'),problem('roof-membrane')],
 [detail('lighting'),design('electrical'),problem('electrical-outlet'),problem('electrical-warehouse')],
 [detail('plumbing'),design('connector-pipe'),design('plumbing'),problem('plumbing-gas')],
 [detail('hvac-equipment'),problem('hvac-condensate'),detail('hvac-technician'),problem('hvac-filter')],
 [problem('access-reader'),problem('security-intercom'),problem('security-camera'),design('security')],
 [showcase('garden-irrigation'),detail('garden'),problem('garden-sprinkler'),design('education')],
 [showcase('signage'),detail('signage'),problem('signage-directions'),problem('signage-fixing')],
 [showcase('facade-cleaning'),detail('facade'),detail('showroom'),design('retail-entrance')],
 [showcase('cleaning-equipment'),problem('cleaning-carpet'),problem('cleaning-bathroom'),problem('cleaning-bin-room')],
 [detail('parking'),showcase('carpark'),detail('parking'),problem('parking-drain')],
 [showcase('fitout'),detail('wall-repair'),detail('signage'),design('interior-room')]
];
const icons=['buildings','house-line','lightbulb','drop','wind','shield-check','tree','storefront','buildings','broom','road-horizon','gear'];
const modes=['materials','roof','lighting','systems','hvac','security','landscape','wayfinding','facade','matrix','parking','stages'];
const specialistImages={'cleaning-waste-hygiene':'specialist-cleaning-plan-v2','hvac-building-systems':'specialist-hvac-wide-v2','car-parks-external-works':'specialist-carpark-aerial-v2'};
module.exports=services=>Object.fromEntries(services.map((s,i)=>[s.slug,{
 hero:'/assets/service-reference-v1/hero-'+s.slug+'.webp',
 specialist:'/assets/service-reference-v1/'+(specialistImages[s.slug]||'specialist-'+s.slug)+'.webp',
 materials:i===0?['panel','hinge','partition'].map(n=>'/assets/service-reference-v1/specialist-building-'+n+'.webp'):i===8?['glass','metal','brick'].map(n=>'/assets/service-reference-v1/material-facade-'+n+'.webp'):null,
 problems:scenes[i],icon:'/assets/sector-selector/icons/'+icons[i]+'.svg',mode:modes[i],
 options:i===10?['/assets/service-reference-v1/gallery-car-parks-external-works-before.webp','/assets/service-reference-v1/specialist-car-parks-external-works.webp',problem('parking-drain')]:null,
 cleaningPair:i===9?['before','after'].map(phase=>'/assets/service-reference-v1/gallery-cleaning-public-'+phase+'-v2.webp'):null,
 gallery: i===0||i===6||i===8||i===10?[
  '/assets/service-reference-v1/gallery-'+s.slug+'-before.webp',
  '/assets/service-reference-v1/gallery-'+s.slug+'-after.webp',i===0?detail('wall-repair'):scenes[i][0],i===0?problem('building-cabinet'):scenes[i][1]
 ]:i===2?['/assets/service-reference-v1/gallery-electrical-lighting-before.webp','/assets/service-reference-v1/gallery-electrical-lighting-after.webp',...scenes[i].slice(0,2)]
 :i===7?['/assets/service-reference-v1/gallery-signage-wayfinding-day.webp','/assets/service-reference-v1/gallery-signage-wayfinding-night.webp',showcase('signage'),detail('signage')]
 :i===11?['/assets/service-reference-v1/gallery-fit-outs-make-good-existing.webp','/assets/service-reference-v1/gallery-fit-outs-make-good-work.webp','/assets/service-reference-v1/gallery-fit-outs-make-good-complete.webp',detail('wall-repair')]
 :i===3?['site','inspection','work','completed'].map(phase=>'/assets/service-reference-v1/gallery-plumbing-'+phase+'-v2.webp')
 :i===4?[detail('hvac-equipment'),problem('hvac-filter'),problem('hvac-condensate'),detail('hvac-technician')]
 :i===5?['/assets/service-reference-v1/specialist-fire-security-access.webp',problem('access-reader'),problem('security-camera'),problem('security-intercom')]:scenes[i]
}]))
