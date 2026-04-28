// Data structure containing the content for the SmartClinity Canvas Model

// Helper SVGs
const icons = {
    hospital: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" /></svg>`,
    residence: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m8.25-9.75H3.75m0 0l8.25-8.25 8.25 8.25m-16.5 0v11.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75V11.25" /></svg>`,
    homeCare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.592 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.361 4.5 4.5 0 00-3.332-7.36 4.5 4.5 0 00-8.5 0 4.5 4.5 0 00-3.332 7.361A3.75 3.75 0 002.25 15z" /></svg>`,
    ai: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" /></svg>`,
    data: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>`,
    hardwarePcb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="2" /><path stroke-linecap="round" stroke-linejoin="round" d="M2 9h2M2 15h2M9 2v2M15 2v2M20 9h2M20 15h2M9 20v2M15 20v2M8 8h8v8H8z" /><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`,
    sensor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>`,
    alerts: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
    clinician: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>`,
    humanCare: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`,
    ethics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>`,
    environment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>`,
    audit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" /></svg>`,
    saas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>`,
    
    // Custom Composites
    manualCrossed: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /><path stroke-linecap="round" stroke-linejoin="round" stroke="#ff5151" stroke-width="2" opacity="0.8" d="M4 4l16 16" /></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" /></svg>`,
    techSupportDoctor: `<svg viewBox="0 0 60 40" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="20" cy="10" r="6" /><path d="M10 40 C10 25 25 25 25 25" /><path d="M12 20h4 M14 18v4" stroke="#89d957" stroke-width="1.5" /><circle cx="40" cy="10" r="6" /><path d="M50 40 C50 25 35 25 35 25" /><path d="M46 20 a2 2 0 100 4 a2 2 0 000-4z" stroke="#5170ff" stroke-width="1.5" /><path d="M46 19v1 M46 24v1 M44 22h1 M47 22h1" stroke="#5170ff" stroke-width="1.5" /><path d="M25 25 l5 5 l5 -5" stroke-width="2" /><path d="M30 30 v-8" stroke-width="2" /></svg>`,
    cloudDashboardCombo: `<svg viewBox="0 0 60 40" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 25 a8 8 0 01-5-14 12 12 0 0122-3 8 8 0 017 12 c0 4-3 7-7 8 H20 L15 35 V25 Z" stroke-width="2" /><rect x="18" y="12" width="8" height="6" rx="1" /><path d="M18 14h8 M20 16v2" /><path d="M32 18 l2-4 l3 2 l3-5" stroke="#89d957" stroke-width="1.5" /><path d="M30 18 h12" stroke-width="1" /><rect x="36" y="10" width="6" height="6" rx="1" /><path d="M35 12h1 M35 14h1 M38 9v1 M40 9v1 M42 12h-1 M42 14h-1 M38 16v1 M40 16v1" /></svg>`,
    customerSegmentsPath: `<svg viewBox="0 0 200 60" fill="none" stroke="currentColor" stroke-width="1.5"><g transform="translate(20, 10)"><path d="M0 30V10 M8 30V10 M-6 10h20 M-6 16h20 M-6 22h20 M-10 30h28" /><path d="M4 -2 v8 M0 2 h8" stroke="#89d957" /><text x="4" y="45" font-size="7" text-anchor="middle" font-weight="600" fill="currentColor" stroke="none">HOSPITAL</text></g><path d="M40 40 Q 60 40 70 25 T 100 15" stroke-dasharray="3 3" stroke="#5170ff" stroke-width="2" /><g transform="translate(100, 0)"><path d="M12 25V12 L0 0 L-12 12 V25 M-6 5h12 M-16 12h32" /><rect x="-4" y="15" width="8" height="10" /><text x="0" y="40" font-size="7" text-anchor="middle" font-weight="600" fill="currentColor" stroke="none">RESIDENCE</text></g><path d="M120 15 Q 135 15 145 25 T 165 35" stroke-dasharray="3 3" stroke="#5170ff" stroke-width="2" /><g transform="translate(170, 20)"><path d="M8 15V8 L0 0 L-8 8 V15 M-4 6h8 M-12 8h24" /><text x="0" y="30" font-size="7" text-anchor="middle" font-weight="600" fill="currentColor" stroke="none">HOME CARE</text></g></svg>`,
    economicLoop: `<img src="assets/canvas/SCALABLERECURRINGMODEL.png" style="width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;" />`,
    impactNarrative: `<img src="assets/canvas/POSITIVEIMPACT.png" style="width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;" />`,
    customerRelationshipsImg: `<img src="assets/canvas/CUSTOMERRELATIONSHIPS.png" style="width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;" />`,
    customerSegmentImg: `<img src="assets/canvas/CUSTOMERSEGMENT.png" style="width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;" />`
};

const canvasData = {
    valueProposition: {
        id: "value-proposition",
        title: "Value Proposition",
        globalSlogan: `<strong>SmartClinity</strong> frees <strong class="text-bold">clinical time</strong> through <strong class="text-purple">connected intelligence</strong>: it automates <strong class="text-bold">fluid monitoring</strong>, generates <strong class="text-bold">real-time alerts</strong> and helps professionals provide <strong class="text-green">better care</strong>. Work with us to bring <strong class="word-pillars">time, attention and humanity</strong> back to healthcare.`,
        icons: [],
        mainIcon: icons.humanCare,
        coreSentence: "Technology that does not replace the professional: it returns time to care better.",
        bullets: [
            "Automates repetitive clinical monitoring.",
            "Generates real-time alerts and traceable data.",
            "Gives professionals more time to care for patients."
        ]
    },
    keyPartners: {
        id: "key-partners",
        title: "Key Partners",
        globalSlogan: "From clinical centers to connected homes",
        icons: [
            { svg: icons.hospital, label: "Hospital" },
            { svg: icons.residence, label: "Residence" },
            { svg: icons.homeCare, label: "Home Care" }
        ],
        mainIcon: icons.hospital,
        coreSentence: "Clinical and care institutions as validation, deployment and improvement partners.",
        bullets: [
            "Hospitals and care centers act as validation partners.",
            "Future integration with home-care telemedicine.",
            "Customers act as partners during pilot and integration phases."
        ]
    },
    keyActivities: {
        id: "key-activities",
        title: "Key Activities",
        globalSlogan: "Automate repetition. Empower care.",
        icons: [
            { svg: icons.sensor, label: "Monitor" },
            { svg: icons.cloud, label: "Cloud" },
            { svg: icons.alerts, label: "Alerts" }
        ],
        mainIcon: icons.sensor,
        coreSentence: "Automating repetitive clinical monitoring through a digital intelligence layer.",
        bullets: [
            "Capture data continuously.",
            "Interpret data through a digital intelligence layer.",
            "Generate useful alerts for healthcare professionals."
        ]
    },
    keyResources: {
        id: "key-resources",
        title: "Key Resources",
        globalSlogan: "Sensors + Cloud + AI",
        icons: [
            { svg: icons.hardwarePcb, label: "Hardware" },
            { svg: icons.cloud, label: "Cloud" },
            { svg: icons.ai, label: "AI" }
        ],
        mainIcon: icons.ai,
        coreSentence: "Continuous clinical intelligence driven by connected infrastructure.",
        bullets: [
            "Clinical sensing layer and connectivity infrastructure.",
            "Cloud servers and real-time data pipeline.",
            "AI models that transform measurements into actionable information."
        ]
    },
    competitiveAdvantage: {
        id: "competitive-advantage",
        title: "Competitive Advantage",
        globalSlogan: "Continuous clinical intelligence",
        icons: [
            { svg: icons.manualCrossed, label: "Obsolete" },
            { svg: icons.arrowRight, label: "" },
            { svg: icons.sensor, label: "Sensor" },
            { svg: icons.data, label: "Data" }
        ],
        mainIcon: icons.data,
        coreSentence: "Turning an underexplored clinical need into a continuous, non-invasive monitoring layer.",
        bullets: [
            "Replaces periodic manual follow-up of clinical fluids.",
            "Provides continuous monitoring, traceability and immediate alerts.",
            "Non-invasive connected monitoring with an intelligence layer."
        ]
    },
    customerRelationships: {
        id: "customer-relationships",
        title: "Customer Relationships",
        globalSlogan: "We stand with clinicians",
        icons: [
            { svg: icons.customerRelationshipsImg, label: "" }
        ],
        mainIcon: icons.customerRelationshipsImg,
        coreSentence: "We stand beside doctors so they can stand beside patients.",
        bullets: [
            "We accompany clinical teams beyond technology installation.",
            "Provide supervision, audits and continuous support.",
            "Ensuring the system works when it matters most."
        ]
    },
    channels: {
        id: "channels",
        title: "Channels",
        globalSlogan: "Pilot to cloud dashboard",
        icons: [
            { svg: icons.cloudDashboardCombo, label: "Cloud & Dashboard" }
        ],
        mainIcon: icons.cloudDashboardCombo,
        coreSentence: "Deploying through partnerships and operating through the cloud.",
        bullets: [
            "Clinical pilots and demonstrations.",
            "Institutional collaborations.",
            "Cloud-based deployment and service continuity."
        ]
    },
    customerSegments: {
        id: "customer-segments",
        title: "Customer Segments",
        globalSlogan: "Hospital today. Home care tomorrow.",
        icons: [
            { svg: icons.customerSegmentImg, label: "" }
        ],
        mainIcon: icons.customerSegmentImg,
        coreSentence: "From acute care to continuous remote assistance.",
        bullets: [
            "Medical centers and hospitals as first market.",
            "Elderly care residences as recurring care environments.",
            "Telemedicine and home-care patients as future expansion."
        ]
    },
    economicEngine: {
        id: "economic-engine",
        title: "Economic Engine",
        concern: "Operational cost for servers & connectivity.",
        opportunity: {
            title: "Scalable recurring model",
            coreSentence: "The cost of maintaining the platform makes a recurring model based on hardware, cloud SaaS and premium AI possible.",
            pillars: [
                { title: "Hardware deploys", desc: "Opens the door to the clinical center." },
                { title: "Software retains", desc: "The cloud SaaS delivers value over time." },
                { title: "Data compounds", desc: "AI converts continuous use into premium intelligence." }
            ],
            icons: [
                { svg: icons.economicLoop, label: "Recurrent Value Loop" }
            ]
        }
    },
    socialImpact: {
        id: "social-impact",
        title: "Social & Environmental Impact",
        concern: "Fear of dehumanization & environmental pressure.",
        opportunity: {
            title: "Human time and responsible efficiency",
            coreSentence: "SmartClinity turns a double concern into a double opportunity: more human time for care and responsible clinical practice.",
            pillars: [
                { title: "Human Care", desc: "More time for the patient." },
                { title: "Ethical AI", desc: "AI assists; it does not replace the professional." },
                { title: "Sustainable Efficiency", desc: "Less inefficiency, more traceability." }
            ],
            icons: [
                { svg: icons.impactNarrative, label: "Positive Impact Story" }
            ]
        }
    }
};

window.canvasData = canvasData;
