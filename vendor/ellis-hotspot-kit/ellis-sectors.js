/* Ellis Services Group · 8 commercial scenes.
 * Coordinates are relative to the complete image: top-left = 0,0; bottom-right = 1,1.
 * This classic script works without a bundler. It is also safe to import during SSR.
 */
(function (global) {
  'use strict';

  global.ELLIS_SECTORS = [
    {
      id: '01', key: 'office',
      point: { x: 0.259, y: 0.163 }, imagePosition: { x: 0.259, y: 0.163 },
      title: { zh: '办公室与写字楼', en: 'Offices & workplaces' },
      popupTitle: { zh: '办公空间维护', en: 'Workplace services' },
      description: {
        zh: '围绕办公空间、公共区域与楼宇设备安排维护，让维修与日常办公节奏衔接。',
        en: 'Coordinate repairs across workspaces, shared areas and building systems around everyday office activity.'
      },
      services: [
        { key: 'building-repairs', label: { zh: '楼宇与室内维修', en: 'Building & interior repairs' } },
        { key: 'hvac', label: { zh: '空调与通风', en: 'Air conditioning & ventilation' } },
        { key: 'electrical-lighting', label: { zh: '电气与照明', en: 'Electrical & lighting' } }
      ]
    },
    {
      id: '02', key: 'retail',
      point: { x: 0.640, y: 0.190 }, imagePosition: { x: 0.640, y: 0.190 },
      title: { zh: '零售与购物中心', en: 'Retail & shopping centres' },
      popupTitle: { zh: '零售场地维护', en: 'Retail property services' },
      description: {
        zh: '照顾店铺、展示空间与顾客通行区域，结合营业安排组织维修、翻新与标识更新。',
        en: 'Maintain shops, display spaces and customer access areas, coordinating repairs, refreshes and signage around trading needs.'
      },
      services: [
        { key: 'interior-fitout', label: { zh: '店铺翻新与修复', en: 'Shop refreshes & repairs' } },
        { key: 'signage', label: { zh: '广告与导向标识', en: 'Advertising & wayfinding signs' } },
        { key: 'building-repairs', label: { zh: '门窗与公共区域', en: 'Doors, windows & shared areas' } }
      ]
    },
    {
      id: '03', key: 'hospitality',
      point: { x: 0.192, y: 0.402 }, imagePosition: { x: 0.192, y: 0.402 },
      title: { zh: '餐饮与酒店', en: 'Hospitality & hotels' },
      popupTitle: { zh: '餐饮酒店维护', en: 'Hospitality services' },
      description: {
        zh: '针对接待、用餐与后勤空间的维修需求，结合现场通行条件和营业时间安排工作。',
        en: 'Plan maintenance for guest, dining and back-of-house spaces around site access and operating hours.'
      },
      services: [
        { key: 'plumbing-drainage', label: { zh: '水管与排水', en: 'Plumbing & drainage' } },
        { key: 'hvac', label: { zh: '空调与通风', en: 'Air conditioning & ventilation' } },
        { key: 'electrical-lighting', label: { zh: '电气与照明', en: 'Electrical & lighting' } }
      ]
    },
    {
      id: '04', key: 'warehouse',
      point: { x: 0.768, y: 0.555 }, imagePosition: { x: 0.768, y: 0.555 },
      title: { zh: '仓库与物流', en: 'Warehouses & logistics' },
      popupTitle: { zh: '仓库维护服务', en: 'Warehouse services' },
      description: {
        zh: '照顾仓库楼宇、装卸区、工业门与场地通道，按现场运营需求组织维护工作。',
        en: 'Coordinate maintenance for warehouse buildings, loading areas, industrial doors and site access around operational needs.'
      },
      services: [
        { key: 'industrial-doors', label: { zh: '工业门与装卸区', en: 'Industrial doors & loading areas' } },
        { key: 'roofing-waterproofing', label: { zh: '屋顶与排水', en: 'Roofing & roof drainage' } },
        { key: 'concrete-line-marking', label: { zh: '地坪与标线', en: 'Flooring & line marking' } }
      ]
    },
    {
      id: '05', key: 'industrial',
      point: { x: 0.917, y: 0.277 }, imagePosition: { x: 0.917, y: 0.277 },
      title: { zh: '工厂与工业园区', en: 'Factories & industrial parks' },
      popupTitle: { zh: '工业场地维护', en: 'Industrial property services' },
      description: {
        zh: '围绕厂房、设备配套与场地设施统筹工作，结合生产安排明确维护范围和进场条件。',
        en: 'Coordinate building and site maintenance around production schedules, with a clear scope and agreed access arrangements.'
      },
      services: [
        { key: 'planned-maintenance', label: { zh: '设备与计划维护', en: 'Systems & planned maintenance' } },
        { key: 'industrial-doors', label: { zh: '工业门与装卸区', en: 'Industrial doors & loading areas' } },
        { key: 'concrete-line-marking', label: { zh: '地坪与标线', en: 'Flooring & line marking' } }
      ]
    },
    {
      id: '06', key: 'medical',
      point: { x: 0.185, y: 0.643 }, imagePosition: { x: 0.185, y: 0.643 },
      title: { zh: '医疗与健康场所', en: 'Healthcare & wellness spaces' },
      popupTitle: { zh: '健康场所维护', en: 'Healthcare property services' },
      description: {
        zh: '维护诊所、接待区与配套空间，提前沟通开放时间、通行要求和现场工作安排。',
        en: 'Maintain clinics, reception areas and supporting spaces with access requirements and work schedules agreed in advance.'
      },
      services: [
        { key: 'building-repairs', label: { zh: '室内与设施维修', en: 'Interior & facility repairs' } },
        { key: 'hvac', label: { zh: '空调与通风', en: 'Air conditioning & ventilation' } },
        { key: 'electrical-lighting', label: { zh: '电气与照明', en: 'Electrical & lighting' } }
      ]
    },
    {
      id: '07', key: 'education',
      point: { x: 0.446, y: 0.670 }, imagePosition: { x: 0.446, y: 0.670 },
      title: { zh: '教育与社区设施', en: 'Education & community facilities' },
      popupTitle: { zh: '教育社区维护', en: 'Education & community services' },
      description: {
        zh: '关注教学、活动与户外区域的维护需求，结合设施使用时间安排维修与场地整理。',
        en: 'Care for learning, activity and outdoor spaces, scheduling repairs and grounds work around how each facility is used.'
      },
      services: [
        { key: 'building-repairs', label: { zh: '楼宇与日常维修', en: 'Building & general repairs' } },
        { key: 'landscaping', label: { zh: '园林与户外维护', en: 'Landscaping & grounds care' } },
        { key: 'electrical-lighting', label: { zh: '电气与照明', en: 'Electrical & lighting' } }
      ]
    },
    {
      id: '08', key: 'shared-property',
      point: { x: 0.545, y: 0.375 }, imagePosition: { x: 0.545, y: 0.375 },
      title: { zh: '商业公共物业', en: 'Shared commercial property' },
      popupTitle: { zh: '公共物业维护', en: 'Shared property services' },
      description: {
        zh: '统筹公共区域、外立面与室外环境的维护，将分散的物业工作整理为清晰的项目安排。',
        en: 'Bring shared-area, facade and outdoor maintenance together in a clear plan for the property.'
      },
      services: [
        { key: 'planned-maintenance', label: { zh: '物业计划维护', en: 'Planned property maintenance' } },
        { key: 'high-access-cleaning', label: { zh: '外立面与高空清洁', en: 'Facade & high-access cleaning' } },
        { key: 'landscaping', label: { zh: '园林与场地维护', en: 'Landscaping & grounds care' } }
      ]
    }
  ];
})(typeof globalThis !== 'undefined' ? globalThis : this);
