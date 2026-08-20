const fs = require("fs");
const path = require("path");

const distDir = path.resolve(__dirname, "../dist");
const publicDir = path.resolve(__dirname, "../public");

if (!fs.existsSync(distDir)) {
  console.error("Dist directory not found!");
  process.exit(1);
}

// 1. Ensure .nojekyll in both dist and public
fs.writeFileSync(path.join(distDir, ".nojekyll"), "");
fs.writeFileSync(path.join(publicDir, ".nojekyll"), "");

// 2. Ensure CNAME in dist
const cnameContent = "usasmmprovider.com";
fs.writeFileSync(path.join(distDir, "CNAME"), cnameContent);
fs.writeFileSync(path.join(publicDir, "CNAME"), cnameContent);

const indexHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

// 3. Make 404.html an exact copy of index.html so GitHub Pages SPA routing is 100% seamless
fs.writeFileSync(path.join(distDir, "404.html"), indexHtml);

// 4. Extract all services from src/data/*Services.ts
const dataDir = path.resolve(__dirname, "../src/data");
const serviceFiles = [
  "reviewsServices.ts",
  "bankServices.ts",
  "emailServices.ts",
  "voipServices.ts",
  "socialServices.ts",
  "developerServices.ts",
];

const allServices = [];

serviceFiles.forEach((file) => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf-8");
  
  // Extract JSON-like objects with slug, seoTitle, metaDescription, name
  const regex = /"slug":\s*"([^"]+)",[\s\S]*?"name":\s*"([^"]+)",[\s\S]*?"seoTitle":\s*"([^"]+)",[\s\S]*?"metaDescription":\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    allServices.push({
      slug: match[1],
      name: match[2],
      seoTitle: match[3],
      metaDescription: match[4],
    });
  }
});

console.log(`Found ${allServices.length} services to pre-render for GitHub Pages.`);

function customizeHtml(seoTitle, metaDescription, canonicalUrl) {
  let custom = indexHtml;
  if (seoTitle) {
    custom = custom.replace(/<title>.*?<\/title>/, `<title>${seoTitle}</title>`);
    custom = custom.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${seoTitle}" />`);
    custom = custom.replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${seoTitle}" />`);
  }
  if (metaDescription) {
    custom = custom.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${metaDescription}" />`);
    custom = custom.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${metaDescription}" />`);
    custom = custom.replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${metaDescription}" />`);
  }
  if (canonicalUrl) {
    custom = custom.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
    custom = custom.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
    custom = custom.replace(/<meta name="twitter:url" content=".*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`);
  }
  return custom;
}

// 5. Generate /service/:slug/index.html & /services/:slug/index.html
allServices.forEach((svc) => {
  const serviceDir = path.join(distDir, "service", svc.slug);
  const servicesPluralDir = path.join(distDir, "services", svc.slug);
  
  fs.mkdirSync(serviceDir, { recursive: true });
  fs.mkdirSync(servicesPluralDir, { recursive: true });
  
  const canonicalUrl = `https://www.usasmmprovider.com/service/${svc.slug}`;
  const customPage = customizeHtml(svc.seoTitle, svc.metaDescription, canonicalUrl);
  
  fs.writeFileSync(path.join(serviceDir, "index.html"), customPage);
  fs.writeFileSync(path.join(servicesPluralDir, "index.html"), customPage);
});

// 6. Generate Category and Catalog static routes
const categories = [
  { id: "reviews", name: "Buy Authentic Online Reviews & Reputation Boost" },
  { id: "bank-wallet", name: "Buy Verified Bank & FinTech Accounts" },
  { id: "email-number", name: "Buy USA PVA Gmails & Virtual Phone Numbers" },
  { id: "accounts", name: "Buy Aged Social & Developer Accounts" },
];

categories.forEach((cat) => {
  const catDir = path.join(distDir, "category", cat.id);
  fs.mkdirSync(catDir, { recursive: true });
  const customPage = customizeHtml(
    `${cat.name} | USASMMProvider`,
    `Browse all premium ${cat.name} packages with instant delivery, verified credentials and non-drop warranty.`,
    `https://www.usasmmprovider.com/category/${cat.id}`
  );
  fs.writeFileSync(path.join(catDir, "index.html"), customPage);
});

// Catalog / Categories routes
const catalogDir = path.join(distDir, "catalog");
fs.mkdirSync(catalogDir, { recursive: true });
fs.writeFileSync(
  path.join(catalogDir, "index.html"),
  customizeHtml(
    "Full Service Catalog | USASMMProvider",
    "Explore our complete inventory of verified reviews, bank accounts, PVA emails, phone numbers, and developer accounts.",
    "https://www.usasmmprovider.com/catalog"
  )
);

console.log("GitHub Pages static multi-route SEO & 404 handler generated successfully!");
