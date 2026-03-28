export const caseStudies = [
  {
    slug: 'autosonic-car-accessories',
    title: 'Autosonic Car Accessories Website',
    client: 'Autosonic Car Accessories',
    industry: 'Automotive',
    summary:
      'A professional web presence for an automotive parts and accessories retailer — built to showcase product lines and turn browsers into inquiries.',
    kpis: [
      { label: 'Inquiry Lift', value: 85 },
      { label: 'Mobile Sessions', value: 72 },
      { label: 'Page Engagement', value: 48 },
    ],
    chart: [
      { month: 'M1', baseline: 18, after: 32 },
      { month: 'M2', baseline: 21, after: 51 },
      { month: 'M3', baseline: 23, after: 78 },
      { month: 'M4', baseline: 25, after: 95 },
      { month: 'M5', baseline: 28, after: 106 },
      { month: 'M6', baseline: 31, after: 124 },
    ],
    challenge:
      'No dedicated website for a parts and accessories store — walk-ins could not preview ranges online and competitors with better digital presence were easier to find.',
    solution:
      'Shipped a structured, SEO-aware site with clear categories for automotive parts and accessories, strong branding, and frictionless contact paths for quotes and store visits.',
    outcome:
      'More qualified inquiries, clearer communication of what Autosonic stocks, and a foundation the team can extend as the catalog grows.',
  },
  {
    slug: 'clearpath-hrms',
    title: 'ClearPath HRMS',
    client: 'ClearPath BPO Solutions',
    industry: 'BPO',
    summary:
      'Replaced spreadsheet-heavy HR workflows with a unified platform for attendance, payroll, and performance.',
    kpis: [
      { label: 'Payroll Time Saved', value: 80 },
      { label: 'Payroll Accuracy', value: 100 },
      { label: 'Employee Adoption', value: 93 },
    ],
    chart: [
      { month: 'M1', baseline: 35, after: 40 },
      { month: 'M2', baseline: 34, after: 56 },
      { month: 'M3', baseline: 36, after: 67 },
      { month: 'M4', baseline: 37, after: 80 },
      { month: 'M5', baseline: 35, after: 92 },
      { month: 'M6', baseline: 36, after: 100 },
    ],
    challenge:
      'Manual payroll and attendance tracking consumed days, caused stress, and introduced error risk.',
    solution:
      'Built a role-based HR suite with payroll automation, leave workflows, and clean dashboards for HR leadership.',
    outcome:
      'Cut cycle time from days to minutes while improving confidence across HR and finance teams.',
  },
  {
    slug: 'spiceroute-pos',
    title: 'SpiceRoute Unified POS',
    client: 'SpiceRoute Group',
    industry: 'F&B',
    summary:
      'Connected 4 branches with synchronized POS, kitchen display, and inventory visibility.',
    kpis: [
      { label: 'Order Errors Reduced', value: 60 },
      { label: 'Table Turnover Gain', value: 100 },
      { label: 'Branch Sync Uptime', value: 99 },
    ],
    chart: [
      { month: 'M1', baseline: 28, after: 31 },
      { month: 'M2', baseline: 30, after: 48 },
      { month: 'M3', baseline: 29, after: 63 },
      { month: 'M4', baseline: 30, after: 77 },
      { month: 'M5', baseline: 31, after: 92 },
      { month: 'M6', baseline: 30, after: 99 },
    ],
    challenge:
      'Inconsistent branch-level operations and no trustworthy real-time reporting for leadership.',
    solution:
      'Built an offline-first POS layer and branch sync infrastructure, then introduced executive dashboards.',
    outcome:
      'Faster service, better inventory decisions, and confidence in branch-level performance data.',
  },
  {
    slug: 'anailytics-capstone',
    title: 'aNAILytics',
    client: 'Pampanga State University — Computer Engineering',
    industry: 'Academic',
    summary:
      'Capstone hardware–software system on Raspberry Pi: camera-based fingernail imaging to support non-invasive pre-screening for anemia, CKD, and B12 deficiency cues.',
    kpis: [
      { label: 'Screening Pipeline', value: 92 },
      { label: 'On-device Prototype', value: 95 },
      { label: 'Defense Readiness', value: 97 },
    ],
    chart: [
      { month: 'M1', baseline: 22, after: 38 },
      { month: 'M2', baseline: 24, after: 52 },
      { month: 'M3', baseline: 26, after: 64 },
      { month: 'M4', baseline: 27, after: 78 },
      { month: 'M5', baseline: 28, after: 88 },
      { month: 'M6', baseline: 29, after: 95 },
    ],
    challenge:
      'Computer Engineering students needed a defensible capstone that combined embedded systems, computer vision, and health-adjacent screening — without claiming to replace clinical diagnosis.',
    solution:
      'Delivered a Raspberry Pi device with camera capture, fingernail image preprocessing, a trained screening model, and a clear results interface, plus documentation aligned to PSU CE requirements.',
    outcome:
      'End-to-end demonstrable prototype for panel review, practical pre-diagnostic cues for users, and a strong portfolio piece for the graduating team.',
  },
]

export function getCaseStudy(slug) {
  return caseStudies.find((item) => item.slug === slug)
}

