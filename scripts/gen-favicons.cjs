const fs = require("fs");
const zlib = require("zlib");

// Bold, high-contrast SVG
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="7" fill="#020617"/>
  <path d="M16 3.5 L27 7.5 C27 18 21.5 25.5 16 29 C10.5 25.5 5 18 5 7.5 Z" fill="#10b981" stroke="#34d399" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M11 16 L14.5 19.5 L21.5 12" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

fs.writeFileSync("public/favicon.svg", svgContent);
fs.writeFileSync("favicon.svg", svgContent);

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function generateShieldPNG(width, height) {
  const rowSize = width * 4 + 1;
  const raw = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    raw[y * rowSize] = 0;
    for (let x = 0; x < width; x++) {
      const idx = y * rowSize + 1 + x * 4;
      const nx = (x / (width - 1)) * 2 - 1;
      const ny = (y / (height - 1)) * 2 - 1;
      
      const inShield = (ny >= -0.75 && ny <= 0.85) && 
        (Math.abs(nx) <= (ny < 0 ? 0.78 : 0.78 * (1 - Math.pow(Math.max(0, ny) / 0.85, 1.6))));

      function distToSegment(px, py, x1, y1, x2, y2) {
        const dx = x2 - x1, dy = y2 - y1;
        const len2 = dx * dx + dy * dy;
        let t = ((px - x1) * dx + (py - y1) * dy) / len2;
        t = Math.max(0, Math.min(1, t));
        return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
      }

      const d1 = distToSegment(nx, ny, -0.32, 0.05, -0.1, 0.28);
      const d2 = distToSegment(nx, ny, -0.1, 0.28, 0.35, -0.22);
      const inCheck = (Math.min(d1, d2) < 0.13);

      if (inCheck && inShield) {
        raw[idx] = 255;
        raw[idx + 1] = 255;
        raw[idx + 2] = 255;
        raw[idx + 3] = 255;
      } else if (inShield) {
        raw[idx] = 16;
        raw[idx + 1] = 185;
        raw[idx + 2] = 129;
        raw[idx + 3] = 255;
      } else {
        const rad = Math.hypot(Math.max(0, Math.abs(nx) - 0.55), Math.max(0, Math.abs(ny) - 0.55));
        if (rad < 0.42) {
          raw[idx] = 2;
          raw[idx + 1] = 6;
          raw[idx + 2] = 23;
          raw[idx + 3] = 255;
        } else {
          raw[idx] = 0;
          raw[idx + 1] = 0;
          raw[idx + 2] = 0;
          raw[idx + 3] = 0;
        }
      }
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  
  return Buffer.concat([
    signature, 
    createChunk("IHDR", ihdr), 
    createChunk("IDAT", zlib.deflateSync(raw)), 
    createChunk("IEND", Buffer.alloc(0))
  ]);
}

function createICO(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  let offset = 6 + count * 16;
  const dirEntries = [];
  const imageBuffers = [];

  for (const png of pngBuffers) {
    const w = png.readUInt32BE(16);
    const h = png.readUInt32BE(20);
    const entry = Buffer.alloc(16);
    entry[0] = w >= 256 ? 0 : w;
    entry[1] = h >= 256 ? 0 : h;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    
    dirEntries.push(entry);
    imageBuffers.push(png);
    offset += png.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

const p16 = generateShieldPNG(16, 16);
const p32 = generateShieldPNG(32, 32);
const p48 = generateShieldPNG(48, 48);
const p192 = generateShieldPNG(192, 192);

fs.writeFileSync("public/favicon-16x16.png", p16);
fs.writeFileSync("public/favicon-32x32.png", p32);
fs.writeFileSync("public/favicon.png", p32);
fs.writeFileSync("public/apple-touch-icon.png", p192);

const icoBuf = createICO([p16, p32, p48]);
fs.writeFileSync("public/favicon.ico", icoBuf);
fs.writeFileSync("favicon.ico", icoBuf);

console.log("All Favicons generated with enhanced visibility!");
