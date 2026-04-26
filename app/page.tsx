"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Header from "@/components/Header";

/* ================================================================
   TYPES
   ================================================================ */
interface MarqueeHub {
  city: string;
  tz: string;
}

interface StrengthCard {
  icon: string;
  title: string;
  text: string;
}

interface ArchLayer {
  num: string;
  title: string;
  desc: string;
  tag: string;
}

interface FlagshipListing {
  status: "sold" | "active";
  address: string;
  price: string;
  details: string;
  specs: string[];
  link: string;
}

interface ImpactMetric {
  value: string;
  label: string;
}

interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  desc: string;
}

interface Certification {
  icon: string;
  name: string;
  issuer: string;
}

interface EcosystemPartner {
  name: string;
  role: string;
}

interface RssItem {
  title: string;
  source: string;
  url: string;
}

interface RepoData {
  name: string;
  description: string;
  language: string;
  stars: number;
}

type VisualizerDraw = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number
) => void;

/* ================================================================
   DATA
   ================================================================ */
const HUBS: MarqueeHub[] = [
  { city: "Toronto", tz: "America/Toronto" },
  { city: "Mississauga", tz: "America/Toronto" },
  { city: "Vaughan", tz: "America/Toronto" },
  { city: "Oakville", tz: "America/Toronto" },
  { city: "Markham", tz: "America/Toronto" },
  { city: "Brampton", tz: "America/Toronto" },
  { city: "Richmond Hill", tz: "America/Toronto" },
  { city: "Etobicoke", tz: "America/Toronto" },
];

const STRENGTHS: StrengthCard[] = [
  {
    icon: "\u{1F3E0}",
    title: "Luxury Residential Expertise",
    text: "Specializing in high-value residential properties across the Greater Toronto Area, from heritage homes in midtown Toronto to modern estates in Vaughan and Oakville. Every transaction is handled with the discretion and precision that luxury clients demand.",
  },
  {
    icon: "\u{1F4CA}",
    title: "Data-Driven Market Analytics",
    text: "Leveraging real-time TREB market data, comparative analysis, and predictive pricing models to ensure every listing is positioned for maximum value and every purchase represents the strongest possible investment.",
  },
  {
    icon: "\u{1F91D}",
    title: "Seamless Transaction Management",
    text: "From initial consultation through closing, I coordinate every detail — inspections, financing, legal review, and staging — so clients experience a frictionless journey from offer to keys in hand.",
  },
  {
    icon: "\u{1F4F1}",
    title: "Maximum Exposure Marketing",
    text: "Professional photography, virtual tours, targeted digital campaigns, and strategic MLS positioning ensure your property reaches the widest pool of qualified buyers in the shortest possible time.",
  },
];

const ARCH_LAYERS: ArchLayer[] = [
  {
    num: "01",
    title: "Listing & Acquisition Layer",
    desc: "Strategic property evaluation, competitive pricing analysis, and targeted acquisition for buyers seeking the best opportunities in the GTA market.",
    tag: "Foundation",
  },
  {
    num: "02",
    title: "Market Intelligence Layer",
    desc: "Real-time data from TREB, CREA, and proprietary analytics to identify trends, forecast valuations, and time transactions for optimal results.",
    tag: "Analytics",
  },
  {
    num: "03",
    title: "Client Experience Layer",
    desc: "Bilingual service in English and Spanish, personalized property tours, transparent communication, and dedicated support throughout every stage of the process.",
    tag: "Service",
  },
  {
    num: "04",
    title: "Closing & Negotiation Layer",
    desc: "Expert negotiation backed by deep market knowledge, ensuring clients secure the best terms whether buying or selling in competitive GTA conditions.",
    tag: "Execution",
  },
];

const FLAGSHIPS: FlagshipListing[] = [
  {
    status: "active",
    address: "43 Warfield Drive, Toronto",
    price: "$999,000",
    details: "Stunning detached home in a prime Toronto neighbourhood. Renovated kitchen, hardwood throughout, private backyard oasis. Steps to transit and top-rated schools.",
    specs: ["4 Bed", "2 Bath", "Detached", "Toronto"],
    link: "https://www.www1.homelife.ca/Maria-Luisa-Grimaldi",
  },
  {
    status: "active",
    address: "67 Beechborough Avenue, Toronto",
    price: "$849,000",
    details: "Charming semi-detached with modern upgrades in a sought-after west-end location. Open-concept main floor, finished basement, and a sun-drenched backyard.",
    specs: ["3+1 Bed", "2 Bath", "Semi-Detached", "Toronto"],
    link: "https://www.www1.homelife.ca/Maria-Luisa-Grimaldi",
  },
  {
    status: "active",
    address: "508-1 Clark Avenue W, Vaughan",
    price: "$898,800",
    details: "Elegant condo in the heart of Vaughan Metropolitan Centre. Floor-to-ceiling windows, premium finishes, and direct subway access. An urban lifestyle redefined.",
    specs: ["2 Bed", "2 Bath", "Condo", "Vaughan"],
    link: "https://www.www1.homelife.ca/Maria-Luisa-Grimaldi",
  },
  {
    status: "sold",
    address: "4493 Longmoor Road, Mississauga",
    price: "$1,250,000",
    details: "Spacious family home in a premium Mississauga enclave. Sold above asking in just 8 days on market, demonstrating the power of strategic pricing and maximum-exposure marketing.",
    specs: ["4 Bed", "3 Bath", "Detached", "Mississauga"],
    link: "https://www.realtor.ca/agent/1869338/maria-luisa-grimaldi-3500-dufferin-st-ste-101-toronto-ontario-m3k1n2",
  },
  {
    status: "sold",
    address: "221 Roselawn Avenue, Toronto",
    price: "$1,475,000",
    details: "Heritage-style home in coveted midtown Toronto. Multiple offers received within 48 hours. Closed seamlessly with full client satisfaction.",
    specs: ["4 Bed", "3 Bath", "Detached", "Toronto"],
    link: "https://www.realtor.ca/agent/1869338/maria-luisa-grimaldi-3500-dufferin-st-ste-101-toronto-ontario-m3k1n2",
  },
  {
    status: "sold",
    address: "88 Sheppard Avenue E, Unit 2205",
    price: "$685,000",
    details: "Luxury high-rise condo at Yonge & Sheppard. Investor client achieved 12% ROI within 18 months. Strategic acquisition and timing drove exceptional returns.",
    specs: ["1+1 Bed", "1 Bath", "Condo", "Toronto"],
    link: "https://www.realtor.ca/agent/1869338/maria-luisa-grimaldi-3500-dufferin-st-ste-101-toronto-ontario-m3k1n2",
  },
];

const IMPACT: ImpactMetric[] = [
  { value: "$150M+", label: "Closed Transaction Volume" },
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "14", label: "Average Days on Market" },
  { value: "10+", label: "Years Serving the GTA" },
];

const EXPERIENCE: TimelineEntry[] = [
  {
    period: "2015 \u2014 Present",
    role: "Sales Representative",
    org: "HomeLife/ROMANO Realty Ltd., Brokerage \u2014 Toronto, ON",
    desc: "Leading residential and commercial real estate transactions across the Greater Toronto Area. Managing a portfolio of luxury listings, investment properties, and first-time buyer acquisitions. Consistently ranked among top producers at the brokerage through strategic market positioning, bilingual client service, and data-driven pricing.",
  },
  {
    period: "2010 \u2014 2015",
    role: "Community Services & Client Relations",
    org: "Various Organizations \u2014 Toronto, ON",
    desc: "Built extensive community relationships through years of service across multiple organizations. Developed deep understanding of diverse client needs, cultural sensitivity, and the importance of trust-based professional relationships that directly translate to real estate excellence.",
  },
  {
    period: "Education",
    role: "B.A. Tourism and Hotel Management",
    org: "University Program",
    desc: "Formal education in hospitality and tourism management provided a strong foundation in client service excellence, negotiation, cross-cultural communication, and business operations — skills that are directly applied to delivering white-glove real estate experiences.",
  },
];

const CERTIFICATIONS: Certification[] = [
  { icon: "\u{1F3E2}", name: "Licensed REALTOR\u00AE", issuer: "RECO \u2014 Real Estate Council of Ontario" },
  { icon: "\u{1F451}", name: "Luxury Home Marketing Specialist", issuer: "Institute for Luxury Home Marketing" },
  { icon: "\u{1F4C8}", name: "Accredited Buyer Representative", issuer: "Real Estate Institute of Canada" },
  { icon: "\u{1F310}", name: "Bilingual Service Certification", issuer: "English & Spanish Fluency" },
  { icon: "\u{1F3D7}", name: "Commercial Real Estate Fundamentals", issuer: "OREA \u2014 Ontario Real Estate Association" },
  { icon: "\u{1F4BB}", name: "Digital Marketing for Real Estate", issuer: "Continuing Education Program" },
];

const ECOSYSTEM: EcosystemPartner[] = [
  { name: "HomeLife/ROMANO Realty", role: "Brokerage" },
  { name: "TREB / TRREB", role: "Toronto Regional Real Estate Board" },
  { name: "OREA", role: "Ontario Real Estate Association" },
  { name: "CREA", role: "Canadian Real Estate Association" },
  { name: "RECO", role: "Regulatory Body" },
  { name: "Realtor.ca", role: "National Listing Platform" },
];

const RSS_HEADLINES: RssItem[] = [
  { title: "GTA Housing Market Shows Resilience Amid Rate Changes", source: "CREA Market Watch", url: "https://creastats.crea.ca/" },
  { title: "Toronto Condo Prices Stabilize as Inventory Tightens", source: "Toronto Storeys", url: "https://torontostoreys.com/" },
  { title: "Bank of Canada Signals Further Rate Adjustments for 2026", source: "Financial Post", url: "https://financialpost.com/" },
  { title: "Vaughan Metropolitan Centre Emerges as GTA Growth Hub", source: "Urban Toronto", url: "https://urbantoronto.ca/" },
  { title: "Spring Market Forecast: What Buyers and Sellers Need to Know", source: "RE/MAX Canada", url: "https://blog.remax.ca/" },
];

const PLACEHOLDER_REPOS: RepoData[] = [
  { name: "gta-market-analyzer", description: "Real-time GTA housing market analytics and price prediction engine", language: "Python", stars: 42 },
  { name: "property-valuation-ai", description: "Machine learning model for accurate residential property valuations", language: "TypeScript", stars: 28 },
  { name: "listing-optimizer", description: "MLS listing optimization tool for maximum buyer engagement", language: "Python", stars: 19 },
];

/* ================================================================
   7 REAL-ESTATE CANVAS VISUALIZERS
   ================================================================ */
const visualizers: { name: string; draw: VisualizerDraw }[] = [
  /* 1 — Property Value Pulse */
  {
    name: "Property Value Pulse",
    draw: (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      const cols = 24;
      const gap = w / cols;
      for (let i = 0; i < cols; i++) {
        const x = i * gap + gap / 2;
        const base = Math.sin(i * 0.3 + t * 0.002) * 0.4 + 0.5;
        const pulse = Math.sin(t * 0.004 + i * 0.2) * 0.15;
        const barH = (base + pulse) * h * 0.7;
        const grad = ctx.createLinearGradient(x, h, x, h - barH);
        grad.addColorStop(0, "rgba(212,168,83,0.8)");
        grad.addColorStop(1, "rgba(46,204,113,0.3)");
        ctx.fillStyle = grad;
        ctx.fillRect(x - gap * 0.3, h - barH, gap * 0.6, barH);
      }
      // Trend line
      ctx.beginPath();
      ctx.strokeStyle = "rgba(212,168,83,0.6)";
      ctx.lineWidth = 2;
      for (let i = 0; i < w; i += 3) {
        const y = h * 0.35 - Math.sin(i * 0.015 + t * 0.003) * h * 0.12 - Math.cos(i * 0.008 + t * 0.002) * h * 0.06;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }
      ctx.stroke();
    },
  },
  /* 2 — Neighbourhood Connection Graph */
  {
    name: "Neighbourhood Connection Graph",
    draw: (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      const nodes: { x: number; y: number }[] = [];
      const count = 14;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t * 0.0005;
        const r = Math.min(w, h) * 0.32 + Math.sin(i * 1.7 + t * 0.002) * 20;
        nodes.push({
          x: w / 2 + Math.cos(angle) * r,
          y: h / 2 + Math.sin(angle) * r,
        });
      }
      // Connections
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(212,168,83,${0.3 - dist * 0.0015})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      // Nodes
      nodes.forEach((n, i) => {
        const size = 4 + Math.sin(i + t * 0.003) * 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
        ctx.fillStyle = i % 3 === 0 ? "rgba(46,204,113,0.8)" : "rgba(212,168,83,0.8)";
        ctx.fill();
      });
      // Center hub
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212,168,83,0.9)";
      ctx.fill();
    },
  },
  /* 3 — Market Trend Diffusion */
  {
    name: "Market Trend Diffusion",
    draw: (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.45;
      for (let r = 0; r < 6; r++) {
        const radius = ((t * 0.03 + r * 40) % (maxR + 40));
        const alpha = 1 - radius / (maxR + 40);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,168,83,${alpha * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      // Data points floating
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 + t * 0.001;
        const dist = 30 + Math.sin(i * 2.1 + t * 0.003) * maxR * 0.6;
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(46,204,113,0.6)" : "rgba(212,168,83,0.6)";
        ctx.fill();
      }
    },
  },
  /* 4 — Buyer-Seller Matching Flow */
  {
    name: "Buyer-Seller Matching Flow",
    draw: (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      const leftX = w * 0.15;
      const rightX = w * 0.85;
      const midX = w / 2;
      // Left column (Sellers)
      for (let i = 0; i < 5; i++) {
        const y = h * 0.15 + i * (h * 0.15);
        ctx.beginPath();
        ctx.arc(leftX, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212,168,83,0.8)";
        ctx.fill();
      }
      // Right column (Buyers)
      for (let i = 0; i < 5; i++) {
        const y = h * 0.15 + i * (h * 0.15);
        ctx.beginPath();
        ctx.arc(rightX, y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(46,204,113,0.8)";
        ctx.fill();
      }
      // Matching lines with animated particles
      const pairs = [[0, 2], [1, 0], [2, 3], [3, 1], [4, 4]];
      pairs.forEach(([s, b], idx) => {
        const sy = h * 0.15 + s * (h * 0.15);
        const by = h * 0.15 + b * (h * 0.15);
        ctx.beginPath();
        ctx.moveTo(leftX, sy);
        ctx.quadraticCurveTo(midX, (sy + by) / 2 + Math.sin(t * 0.002 + idx) * 15, rightX, by);
        ctx.strokeStyle = "rgba(212,168,83,0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
        // Particle
        const prog = ((t * 0.001 + idx * 0.3) % 1);
        const px = leftX + (rightX - leftX) * prog;
        const py = sy + (by - sy) * prog + Math.sin(prog * Math.PI) * Math.sin(t * 0.002 + idx) * 15;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,201,122,0.9)";
        ctx.fill();
      });
      // Center label
      ctx.beginPath();
      ctx.arc(midX, h / 2, 14, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212,168,83,0.2)";
      ctx.fill();
      ctx.fillStyle = "rgba(212,168,83,0.9)";
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MLG", midX, h / 2);
    },
  },
  /* 5 — GTA Heatmap Scanner */
  {
    name: "GTA Heatmap Scanner",
    draw: (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      const gridX = 16;
      const gridY = 10;
      const cellW = w / gridX;
      const cellH = h / gridY;
      for (let gx = 0; gx < gridX; gx++) {
        for (let gy = 0; gy < gridY; gy++) {
          const intensity = Math.sin(gx * 0.5 + t * 0.002) * Math.cos(gy * 0.6 + t * 0.0015) * 0.5 + 0.5;
          const r = Math.floor(212 * intensity);
          const g = Math.floor(168 * intensity * 0.5 + 100 * (1 - intensity));
          const b = Math.floor(83 * intensity);
          ctx.fillStyle = `rgba(${r},${g},${b},${intensity * 0.5 + 0.05})`;
          ctx.fillRect(gx * cellW, gy * cellH, cellW - 1, cellH - 1);
        }
      }
      // Scanner line
      const scanX = ((t * 0.05) % w);
      const scanGrad = ctx.createLinearGradient(scanX - 30, 0, scanX + 5, 0);
      scanGrad.addColorStop(0, "rgba(212,168,83,0)");
      scanGrad.addColorStop(1, "rgba(212,168,83,0.6)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(scanX - 30, 0, 35, h);
    },
  },
  /* 6 — Closing Rate Optimizer */
  {
    name: "Closing Rate Optimizer",
    draw: (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      // Funnel shape
      const stages = ["Leads", "Viewings", "Offers", "Closed"];
      const widths = [0.9, 0.7, 0.45, 0.25];
      const stageH = h / stages.length;
      stages.forEach((_, i) => {
        const topW = w * widths[i];
        const botW = i < stages.length - 1 ? w * widths[i + 1] : w * 0.15;
        const topX = (w - topW) / 2;
        const botX = (w - botW) / 2;
        const y = i * stageH;
        const pulse = Math.sin(t * 0.003 + i * 0.8) * 0.1 + 0.9;
        ctx.beginPath();
        ctx.moveTo(topX, y);
        ctx.lineTo(topX + topW, y);
        ctx.lineTo(botX + botW, y + stageH);
        ctx.lineTo(botX, y + stageH);
        ctx.closePath();
        const grad = ctx.createLinearGradient(0, y, 0, y + stageH);
        grad.addColorStop(0, `rgba(212,168,83,${0.15 + i * 0.08})`);
        grad.addColorStop(1, `rgba(46,204,113,${0.1 + i * 0.1})`);
        ctx.fillStyle = grad;
        ctx.globalAlpha = pulse;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(212,168,83,0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      // Animated particles falling through funnel
      for (let p = 0; p < 8; p++) {
        const py = ((t * 0.04 + p * 50) % h);
        const stage = py / stageH;
        const currentWidth = w * (widths[Math.min(Math.floor(stage), 3)] || 0.15);
        const px = w / 2 + Math.sin(p * 3.7 + t * 0.002) * currentWidth * 0.35;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,201,122,0.8)";
        ctx.fill();
      }
    },
  },
  /* 7 — AI Property Match Agent */
  {
    name: "AI Property Match Agent",
    draw: (ctx, w, h, t) => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      // Central AI core
      const coreR = 16 + Math.sin(t * 0.004) * 3;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      coreGrad.addColorStop(0, "rgba(212,168,83,0.9)");
      coreGrad.addColorStop(1, "rgba(46,204,113,0.3)");
      ctx.fillStyle = coreGrad;
      ctx.fill();
      // Orbiting property nodes
      const orbitCount = 8;
      for (let i = 0; i < orbitCount; i++) {
        const angle = (i / orbitCount) * Math.PI * 2 + t * 0.0015;
        const orbitR = 50 + Math.sin(i * 1.2 + t * 0.002) * 15;
        const nx = cx + Math.cos(angle) * orbitR;
        const ny = cy + Math.sin(angle) * orbitR;
        // Connection to core
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = `rgba(212,168,83,${0.15 + Math.sin(t * 0.003 + i) * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        // Node
        ctx.beginPath();
        ctx.arc(nx, ny, 5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(212,168,83,0.7)" : "rgba(46,204,113,0.7)";
        ctx.fill();
      }
      // Outer scanning ring
      const scanAngle = (t * 0.003) % (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(cx, cy, 75, scanAngle, scanAngle + 0.8);
      ctx.strokeStyle = "rgba(212,168,83,0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      // Data streams
      for (let s = 0; s < 12; s++) {
        const sa = (s / 12) * Math.PI * 2;
        const sr = 80 + Math.sin(s + t * 0.002) * 10;
        const sx = cx + Math.cos(sa) * sr;
        const sy = cy + Math.sin(sa) * sr;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,201,122,0.4)";
        ctx.fill();
      }
    },
  },
];

/* ================================================================
   VISUALIZER ROTATOR HOOK
   ================================================================ */
function useVisualizerRotator(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  interval = 10000
) {
  const [index, setIndex] = useState(0);
  const animRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % visualizers.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let running = true;
    const loop = (time: number) => {
      if (!running) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      visualizers[index].draw(ctx, rect.width, rect.height, time);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [index, canvasRef]);

  return visualizers[index].name;
}

/* ================================================================
   LIVE CLOCK HOOK
   ================================================================ */
function useLiveClocks(hubs: MarqueeHub[]) {
  const [times, setTimes] = useState<string[]>([]);
  useEffect(() => {
    const tick = () => {
      setTimes(
        hubs.map((h) => {
          try {
            return new Date().toLocaleTimeString("en-US", {
              timeZone: h.tz,
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            });
          } catch {
            return "--:--:--";
          }
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hubs]);
  return times;
}

/* ================================================================
   MAIN PAGE COMPONENT
   ================================================================ */
export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const vizName = useVisualizerRotator(canvasRef);
  const clockTimes = useLiveClocks(HUBS);

  /* RSS state */
  const [headlines, setHeadlines] = useState<RssItem[]>(RSS_HEADLINES);
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcreastats.crea.ca%2Ffeed",
          { signal: controller.signal }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.items?.length) {
            setHeadlines(
              data.items.slice(0, 5).map((item: { title: string; link: string }) => ({
                title: item.title,
                source: "CREA Market Watch",
                url: item.link,
              }))
            );
          }
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => controller.abort();
  }, []);

  /* GitHub repos state */
  const [repos, setRepos] = useState<RepoData[]>(PLACEHOLDER_REPOS);
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          "https://api.github.com/users/iceccarelli/repos?sort=updated&per_page=3",
          { signal: controller.signal }
        );
        if (res.ok) {
          const data = await res.json();
          if (data.length) {
            setRepos(
              data.map((r: { name: string; description: string | null; language: string | null; stargazers_count: number }) => ({
                name: r.name,
                description: r.description || "Real estate technology tool",
                language: r.language || "TypeScript",
                stars: r.stargazers_count,
              }))
            );
          }
        }
      } catch {
        /* keep placeholders */
      }
    })();
    return () => controller.abort();
  }, []);

  const marqueeItems = [...HUBS, ...HUBS];

  return (
    <>
      <Header />

      {/* ===== HERO ===== */}
      <section id="hero" className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">HomeLife/ROMANO Realty Ltd.</div>
            <h1 className="hero-title">
              <span className="gradient-text">Maria Luisa</span>
              <br />
              Grimaldi
            </h1>
            <p className="hero-description">
              Your trusted real estate partner across the Greater Toronto Area.
              I bring deep market expertise, bilingual service, and an
              unwavering commitment to securing the best possible outcome for
              every client — whether buying your dream home or maximizing the
              value of your most important asset.
            </p>
            <div className="hero-ctas">
              <a
                href="https://www.www1.homelife.ca/Maria-Luisa-Grimaldi"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary"
              >
                View Listings &rarr;
              </a>
              <a href="#live-intelligence" className="cta-secondary">
                Market Report
              </a>
              <a href="#connect" className="cta-secondary">
                Free Consultation
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-shell">
              <div className="portrait-glow" />
              <img
                src="/portrait.jpg"
                alt="Maria Luisa Grimaldi — Sales Representative"
                width={800}
                height={1000}
              />
            </div>
            <div className="visualizer-shell">
              <canvas ref={canvasRef} />
            </div>
            <div className="visualizer-label">{vizName}</div>
          </div>
        </div>
      </section>

      {/* ===== GLOBAL ORIENTATION MARQUEE ===== */}
      <div className="marquee-section">
        <div className="marquee-track">
          {marqueeItems.map((hub, i) => (
            <div key={`${hub.city}-${i}`} className="marquee-item">
              <span className="marquee-dot" />
              <span>{hub.city}</span>
              <span className="marquee-time">
                {clockTimes[i % HUBS.length] || "--:--:--"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ABOUT THE WORK ===== */}
      <section id="about" className="section">
        <div className="section-inner">
          <div className="section-label">Why Clients Choose Me</div>
          <h2 className="section-title">
            <span className="gradient-text">Expertise That Delivers</span>{" "}
            Results
          </h2>
          <p className="section-subtitle">
            Every real estate transaction is unique. I combine deep local market
            knowledge with a client-first philosophy to deliver outcomes that
            exceed expectations — whether you are a first-time buyer, seasoned
            investor, or selling a luxury property.
          </p>
          <div className="card-grid">
            {STRENGTHS.map((s) => (
              <div key={s.title} className="glass-panel strength-card">
                <div className="card-icon">{s.icon}</div>
                <div className="card-title">{s.title}</div>
                <div className="card-text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ARCHITECTURE OF REAL ESTATE SUCCESS ===== */}
      <section id="architecture" className="section">
        <div className="section-inner">
          <div className="section-label">My Approach</div>
          <h2 className="section-title">
            Architecture of{" "}
            <span className="gradient-text">Real Estate Success</span>
          </h2>
          <p className="section-subtitle">
            A systematic, four-layer methodology that transforms every
            transaction into a strategic operation — from initial market
            intelligence through expert negotiation and seamless closing.
          </p>
          <div className="architecture-layers">
            {ARCH_LAYERS.map((layer) => (
              <div key={layer.num} className="glass-panel arch-layer">
                <div className="layer-number">{layer.num}</div>
                <div className="layer-content">
                  <h3>{layer.title}</h3>
                  <p>{layer.desc}</p>
                </div>
                <span className="layer-tag">{layer.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FLAGSHIP LISTINGS ===== */}
      <section id="flagship" className="section">
        <div className="section-inner">
          <div className="section-label">Featured Properties</div>
          <h2 className="section-title">
            <span className="gradient-text">Flagship</span> Listings &amp;
            Closed Deals
          </h2>
          <p className="section-subtitle">
            A curated selection of active listings and recently closed
            transactions that demonstrate my commitment to achieving the highest
            possible value for every client.
          </p>
          <div className="flagship-grid">
            {FLAGSHIPS.map((f) => (
              <div key={f.address} className="glass-panel flagship-card">
                <span
                  className={`flagship-status ${f.status === "sold" ? "status-sold" : "status-active"}`}
                >
                  {f.status === "sold" ? "Sold" : "Active"}
                </span>
                <div className="flagship-address">{f.address}</div>
                <div className="flagship-price">{f.price}</div>
                <div className="flagship-details">{f.details}</div>
                <div className="flagship-specs">
                  {f.specs.map((sp) => (
                    <span key={sp} className="spec-tag">
                      {sp}
                    </span>
                  ))}
                </div>
                <a
                  href={f.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flagship-link"
                >
                  View Details &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LIVE INTELLIGENCE HUB ===== */}
      <section id="live-intelligence" className="section">
        <div className="section-inner">
          <div className="section-label">Real-Time Data</div>
          <h2 className="section-title">
            Live <span className="gradient-text">Market Intelligence</span> Hub
          </h2>
          <p className="section-subtitle">
            Stay informed with real-time market data, REIT performance tracking,
            and the latest headlines from Canada&apos;s real estate industry.
          </p>

          {/* TradingView Ticker Tape */}
          <div className="glass-panel live-panel" style={{ marginBottom: "1.5rem", minHeight: "auto", padding: "0" }}>
            <iframe
              className="ticker-tape"
              src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22TSX%3AXRE%22%2C%22title%22%3A%22iShares%20S%26P%2FTSX%20REIT%22%7D%2C%7B%22proName%22%3A%22TSX%3AREI.UN%22%2C%22title%22%3A%22RioCan%20REIT%22%7D%2C%7B%22proName%22%3A%22TSX%3ACAR.UN%22%2C%22title%22%3A%22Canadian%20Apartment%22%7D%2C%7B%22proName%22%3A%22TSX%3ABN%22%2C%22title%22%3A%22Brookfield%22%7D%2C%7B%22proName%22%3A%22TSX%3AFCR.UN%22%2C%22title%22%3A%22First%20Capital%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%2C%22colorTheme%22%3A%22dark%22%7D"
              style={{ width: "100%", height: "46px", border: "none" }}
              title="TradingView Ticker"
            />
          </div>

          <div className="live-hub-grid">
            {/* Market Overview */}
            <div className="glass-panel live-panel" style={{ padding: "0", overflow: "hidden" }}>
              <iframe
                src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22showFloatingTooltip%22%3Atrue%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Canadian%20REITs%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22TSX%3AXRE%22%2C%22d%22%3A%22iShares%20REIT%20ETF%22%7D%2C%7B%22s%22%3A%22TSX%3AREI.UN%22%2C%22d%22%3A%22RioCan%20REIT%22%7D%2C%7B%22s%22%3A%22TSX%3ACAR.UN%22%2C%22d%22%3A%22Canadian%20Apartment%22%7D%2C%7B%22s%22%3A%22TSX%3ABN%22%2C%22d%22%3A%22Brookfield%22%7D%5D%7D%5D%7D"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="TradingView Market Overview"
              />
            </div>

            {/* RSS Headlines */}
            <div className="glass-panel live-panel">
              <div className="live-panel-header">
                <span className="live-panel-title">Market Headlines</span>
                <span className="live-badge">Live</span>
              </div>
              <ul className="rss-list">
                {headlines.map((item, i) => (
                  <li key={i} className="rss-item">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="rss-item-title">{item.title}</div>
                    </a>
                    <div className="rss-item-source">{item.source}</div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Technology Tools for Real Estate Professionals */}
            <div className="glass-panel live-panel" style={{ gridColumn: "1 / -1" }}>
              <div className="live-panel-header">
                <span className="live-panel-title">Technology Tools</span>
                <span className="live-badge">Trending 2026</span>
              </div>
              <div className="repo-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem" }}>
                
                {/* HouseSigma */}
                <a 
                  href="https://housesigma.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="repo-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="repo-name">HouseSigma</div>
                  <div className="repo-desc">Real-time sold prices, market trends, neighbourhood analytics, and instant property alerts across the entire GTA. The #1 tool used by Toronto agents.</div>
                  <div className="repo-meta">
                    <span>Market Intelligence</span>
                    <span>100K+ Agents</span>
                  </div>
                </a>

                {/* Matterport */}
                <a 
                  href="https://matterport.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="repo-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="repo-name">Matterport</div>
                  <div className="repo-desc">Industry-leading 3D virtual tours and digital twins. Dramatically increases buyer engagement and reduces showing requests by up to 50%.</div>
                  <div className="repo-meta">
                    <span>Virtual Tours</span>
                    <span>Industry Standard</span>
                  </div>
                </a>

                {/* DocuSign */}
                <a 
                  href="https://www.docusign.com/real-estate" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="repo-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="repo-name">DocuSign</div>
                  <div className="repo-desc">Secure electronic signatures trusted by real estate professionals worldwide. Fast, compliant, and paperless closings from anywhere.</div>
                  <div className="repo-meta">
                    <span>E-Signatures</span>
                    <span>1M+ REALTORS®</span>
                  </div>
                </a>

                {/* Zolo.ca */}
                <a 
                  href="https://www.zolo.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="repo-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="repo-name">Zolo.ca</div>
                  <div className="repo-desc">Advanced Canadian listings platform with price history, school rankings, neighbourhood insights, and powerful search filters used daily by GTA professionals.</div>
                  <div className="repo-meta">
                    <span>Listings &amp; Data</span>
                    <span>Top GTA Agents</span>
                  </div>
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== QUANTIFIED IMPACT ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="section-label">By the Numbers</div>
          <h2 className="section-title">
            <span className="gradient-text">Quantified</span> Impact
          </h2>
          <div className="impact-grid">
            {IMPACT.map((m) => (
              <div key={m.label} className="glass-panel impact-card">
                <div className="impact-value">{m.value}</div>
                <div className="impact-label">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROFESSIONAL EXPERIENCE ===== */}
      <section id="experience" className="section">
        <div className="section-inner">
          <div className="section-label">Career</div>
          <h2 className="section-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <div className="timeline">
            {EXPERIENCE.map((e) => (
              <div key={e.role} className="glass-panel timeline-item">
                <div>
                  <div className="timeline-period">{e.period}</div>
                </div>
                <div>
                  <div className="timeline-role">{e.role}</div>
                  <div className="timeline-org">{e.org}</div>
                  <div className="timeline-desc">{e.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Credentials</div>
          <h2 className="section-title">
            Standards &amp;{" "}
            <span className="gradient-text">Certifications</span>
          </h2>
          <div className="cert-grid">
            {CERTIFICATIONS.map((c) => (
              <div key={c.name} className="glass-panel cert-card">
                <div className="cert-icon">{c.icon}</div>
                <div className="cert-name">{c.name}</div>
                <div className="cert-issuer">{c.issuer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUSTED ECOSYSTEM ===== */}
      <section className="section">
        <div className="section-inner">
          <div className="section-label">Network</div>
          <h2 className="section-title">
            Trusted <span className="gradient-text">Ecosystem</span>
          </h2>
          <div className="ecosystem-grid">
            {ECOSYSTEM.map((p) => (
              <div key={p.name} className="glass-panel ecosystem-card">
                <div className="ecosystem-name">{p.name}</div>
                <div className="ecosystem-role">{p.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONNECT ===== */}
      <section id="connect" className="section">
        <div className="section-inner">
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <div className="connect-grid">
            <div className="connect-info">
              <div className="connect-item">
                <div className="connect-icon">{"\u{1F4DE}"}</div>
                <div>
                  <div className="connect-label">Direct Line</div>
                  <a href="tel:+16472871276" className="connect-value">
                    647-287-1276
                  </a>
                </div>
              </div>
              <div className="connect-item">
                <div className="connect-icon">{"\u{1F3E2}"}</div>
                <div>
                  <div className="connect-label">Office</div>
                  <a href="tel:+14166351232" className="connect-value">
                    (416) 635-1232
                  </a>
                </div>
              </div>
              <div className="connect-item">
                <div className="connect-icon">{"\u{2709}"}</div>
                <div>
                  <div className="connect-label">Email</div>
                  <a
                    href="mailto:marialuisa@grimaldirealty.ca"
                    className="connect-value"
                  >
                    marialuisa@grimaldirealty.ca
                  </a>
                </div>
              </div>
              <div className="connect-item">
                <div className="connect-icon">{"\u{1F310}"}</div>
                <div>
                  <div className="connect-label">HomeLife Profile</div>
                  <a
                    href="https://www.www1.homelife.ca/Maria-Luisa-Grimaldi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="connect-value"
                  >
                    homelife.ca/Maria-Luisa-Grimaldi
                  </a>
                </div>
              </div>
              <div className="connect-item">
                <div className="connect-icon">{"\u{1F4CD}"}</div>
                <div>
                  <div className="connect-label">Office Address</div>
                  <div className="connect-value">
                    3500 Dufferin St, Suite 101, Toronto, ON M3K 1N2
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-panel connect-cta-panel">
              <h3 className="connect-cta-title">
                <span className="gradient-text">Free Consultation</span>
              </h3>
              <p className="connect-cta-text">
                Whether you are buying, selling, or investing in the GTA real
                estate market, I am here to provide expert guidance tailored to
                your unique goals. Let us discuss your next move.
              </p>
              <a
                href="mailto:marialuisa@grimaldirealty.ca?subject=Free%20Consultation%20Request"
                className="cta-primary"
              >
                Book a Consultation &rarr;
              </a>
              <a
                href="https://www.realtor.ca/agent/1869338/maria-luisa-grimaldi-3500-dufferin-st-ste-101-toronto-ontario-m3k1n2"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary"
                style={{ marginTop: "0.5rem" }}
              >
                View on Realtor.ca
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
