/**
 * Visual content, deliberately separated from regional copy and rendering.
 * All scenes are illustrations from Ellis' existing design assets, not project evidence.
 * Hotspots use percentages of the full source image (preserve its aspect ratio).
 */
const image = (file, width, height, altZh, altEn, position = '50% 50%', extra = {}) => Object.freeze({
  src: `/assets/${file}`, width, height, altZh, altEn, position, transparent: false, ...extra,
});

export const sceneAssets = Object.freeze({
  city: image('hero-melbourne-v2.webp', 1896, 830, '墨尔本 Flinders Street Station、雅拉河与天际线的品牌场景示意', 'Melbourne Flinders Street Station, river and skyline brand illustration', '50% 54%'),
  architecture: image('architecture.webp', 1536, 1024, '办公楼、仓库与楼顶设备的三维建筑示意', 'Three-dimensional illustration of offices, warehouse space and rooftop building equipment', '50% 55%', { transparent: true }),
  cutaway: image('interior-open.webp', 1536, 1024, '展开的办公楼层、接待区及建筑设备示意', 'Exploded office floors, reception areas and building services illustration', '50% 54%', { transparent: true }),
  equipment: image('equipment-exploded.webp', 1536, 1024, '上拉的屋面及设备管线层与下方商业楼宇示意', 'Separated roof and equipment layers above a commercial building', '50% 50%', { transparent: true }),
  warehouse: image('warehouse.webp', 1536, 1024, '仓库屋面、装卸入口、附属办公室与外部通道示意', 'Warehouse roof, loading entrances, ancillary offices and external access illustration', '50% 58%', { transparent: true }),
  retail: image('retail.webp', 1536, 1024, '有玻璃店面、公共入口及停车区域的零售商业楼宇示意', 'Retail building illustration with glazed shopfronts, common entrances and parking', '50% 56%', { transparent: true }),
  industrial: image('industrial.webp', 1536, 1024, '工业厂房、附属办公楼、设备与场地入口示意', 'Industrial premises, ancillary office, building equipment and site entrance illustration', '50% 56%', { transparent: true }),
  landscape: image('landscape.webp', 1536, 1024, '带有庭院步道、花园及绿化的商业物业示意', 'Commercial property illustration with courtyard paths, gardens and landscaping', '50% 61%', { transparent: true }),
  campus: image('campus.webp', 1774, 887, '办公、零售、接待、仓储与社区空间组成的商业场景示意', 'Illustrative commercial campus with office, retail, hospitality, warehouse and community spaces', '50% 58%', { transparent: true }),
  office: image('office-interior.webp', 1774, 887, '办公室会议室、公共通道与天花设备场景示意', 'Office meeting room, shared circulation and ceiling services illustration'),
  retailInside: image('retail-interior.webp', 1774, 887, '零售店面、共享通道与中庭采光场景示意', 'Retail shopfronts, shared walkways and a naturally lit atrium illustration'),
  hospitality: image('hospitality-interior.webp', 1774, 887, '餐饮物业接待区及访客使用空间示意', 'Hospitality reception and visitor areas illustration'),
  warehouseInside: image('warehouse-interior.webp', 1774, 887, '仓储货架、装卸门、车行与步行通道示意', 'Warehouse racking, loading door and vehicle and pedestrian access illustration'),
  industrialInside: image('industrial-interior.webp', 1774, 887, '工业厂房设备、照明与作业通道示意', 'Industrial premises equipment, lighting and work access illustration'),
  medical: image('medical-interior.webp', 1774, 887, '诊所接待、等候与公共通道场景示意', 'Clinic reception, waiting and shared circulation illustration'),
  education: image('education-interior.webp', 1774, 887, '教育与社区设施的教室及共用通道示意', 'Education and community classrooms and shared circulation illustration'),
  common: image('common-interior.webp', 1774, 887, '商业大楼接待、入口与共享设施场景示意', 'Commercial reception, entrances and shared facilities illustration'),
  roof: image('roofing-detail.webp', 1536, 1024, '商业建筑金属屋面细部示意', 'Commercial metal roof detail illustration', '50% 50%', { transparent: true }),
  garden: image('garden-irrigation.webp', 1536, 1024, '商业场地园林及灌溉场景示意', 'Commercial landscaping and irrigation illustration'),
  signage: image('signage.webp', 1536, 1024, '商业物业标识场景示意', 'Commercial property signage illustration'),
  facade: image('facade-cleaning.webp', 1536, 1024, '玻璃外立面与高空作业平台场景示意', 'Glazed building facade and suspended access platform illustration'),
  carpark: image('carpark.webp', 1536, 1024, '商业停车场与地面标线场景示意', 'Commercial car park and surface marking illustration'),
  fitout: image('fitout.webp', 1536, 1024, '商业空间墙面修复与翻新场景示意', 'Commercial wall repair and refurbishment illustration'),
});

const A = sceneAssets;
const visual = (layout, hero, scene, details, hotspotPositions, accent = 'orange') => Object.freeze({
  layout, hero, scene, details: Object.freeze(details), hotspotPositions: Object.freeze(hotspotPositions.map(([x,y]) => Object.freeze({x,y}))), accent,
});

export const hubVisual = visual('region-atlas', A.city, A.campus, [A.office, A.warehouseInside, A.retailInside], [[24,25],[78,65],[51,42]], 'citron');

export const regionVisuals = Object.freeze({
  'cbd-inner-melbourne': visual('office-cutaway', A.architecture, A.cutaway, [A.office, A.fitout, A.facade], [[40,42],[42,76],[68,78]], 'orange'),
  'eastern-suburbs': visual('retail-interior', A.retail, A.retailInside, [A.retailInside, A.signage, A.office], [[60,73],[30,50],[45,22]], 'citron'),
  'south-east-melbourne': visual('equipment-layers', A.industrial, A.equipment, [A.roof, A.industrialInside, A.warehouseInside], [[63,18],[67,38],[44,67]], 'orange'),
  'western-suburbs': visual('loading-panorama', A.warehouse, A.warehouse, [A.carpark, A.roof, A.warehouseInside], [[73,68],[57,35],[35,61]], 'citron'),
  'northern-suburbs': visual('work-orders', A.industrial, A.industrialInside, [A.fitout, A.common, A.garden], [[48,65],[27,44],[73,56]], 'orange'),
  'north-east-melbourne': visual('courtyard', A.campus, A.medical, [A.medical, A.education, A.common], [[30,59],[78,51],[63,31]], 'citron'),
  'north-west-melbourne': visual('dual-window', A.warehouse, A.warehouseInside, [A.roof, A.carpark, A.office], [[45,15],[84,65],[18,48]], 'orange'),
  'bayside-southern-suburbs': visual('facade-detail', A.retail, A.retail, [A.facade, A.roof, A.carpark], [[50,61],[72,35],[80,73]], 'citron'),
  'casey-cardinia': visual('tenancy-stages', A.campus, A.common, [A.fitout, A.office, A.garden], [[35,56],[59,42],[85,63]], 'orange'),
  'frankston-mornington-peninsula': visual('indoor-outdoor', A.landscape, A.hospitality, [A.hospitality, A.industrialInside, A.garden], [[28,57],[66,26],[82,50]], 'citron'),
});

/** Photo-like regional overview assets, generated to match the approved visual.
 * These are illustrative architecture, not customer projects or branch locations.
 */
const overviewPhotos = Object.freeze({
  'cbd-inner-melbourne': image('region-cbd-inner-v2.webp',1536,1024,'市中心玻璃办公楼场景示意','Illustrative city-centre glass office towers','50% 52%'),
  'eastern-suburbs': image('region-eastern-v2.webp',1536,1024,'东区街角商业办公楼场景示意','Illustrative leafy eastern commercial office building'),
  'south-east-melbourne': image('region-south-east-v2.webp',1536,1024,'东南区办公与工业楼宇场景示意','Illustrative south-east office and industrial premises'),
  'western-suburbs': image('region-western-v2.webp',1536,1024,'西区仓库卷帘门与外立面场景示意','Illustrative western warehouse loading doors'),
  'northern-suburbs': image('region-northern-v2.webp',1536,1024,'北区商务园办公楼场景示意','Illustrative northern business park office'),
  'north-east-melbourne': image('region-north-east-v2.webp',1536,1024,'东北区林荫办公楼场景示意','Illustrative north-eastern office building with street trees'),
  'north-west-melbourne': image('region-north-west-v2.webp',1536,1024,'西北区仓库与附属办公室场景示意','Illustrative north-western warehouse and ancillary office'),
  'bayside-southern-suburbs': image('region-bayside-southern-v2.webp',1536,1024,'Bayside湾边圆弧商业楼场景示意','Illustrative Bayside waterfront commercial building'),
  'casey-cardinia': image('region-casey-cardinia-v2.webp',1536,1024,'Casey与Cardinia工业园商业单元场景示意','Illustrative Casey and Cardinia industrial estate unit'),
  'frankston-mornington-peninsula': image('region-frankston-mornington-peninsula-v2.webp',1536,1024,'Frankston与半岛低层商业接待建筑场景示意','Illustrative Frankston and Peninsula commercial reception building'),
});
const cbdStreet = image('preview-cbd-street-v2.webp',1897,829,'市中心玻璃办公楼入口与林荫人行道场景示意','Illustrative CBD office entrance and tree-lined footpath','50% 50%');

/** Resolve semantic region IDs; route suffix aliases are accepted for integration. */
export function getVisual(slug = 'melbourne') {
  if (slug === 'melbourne') return hubVisual;
  const aliases = {
    'cbd-inner': 'cbd-inner-melbourne', eastern: 'eastern-suburbs',
    'south-east': 'south-east-melbourne', western: 'western-suburbs', northern: 'northern-suburbs',
    'north-east': 'north-east-melbourne', 'north-west': 'north-west-melbourne',
    'bayside-southern': 'bayside-southern-suburbs',
  };
  const key = regionVisuals[slug] ? slug : aliases[slug];
  const base = regionVisuals[key];
  if (!base) return hubVisual;
  const photo = overviewPhotos[key];
  const card = {...photo,src:photo.src.replace('/assets/','/assets/card-'),width:640,height:427};
  return {...base,card,preview:key==='cbd-inner-melbourne'?cbdStreet:photo};
}
