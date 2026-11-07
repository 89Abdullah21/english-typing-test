import fs from "node:fs";
import path from "node:path";

function createIco(size) {
  const width = size;
  const height = size;
  const bpp = 32;
  const imageSize = width * height * 4;
  const andMaskSize = Math.ceil(width / 32) * 4 * height;
  const bihSize = 40;
  const totalImageDataSize = bihSize + imageSize + andMaskSize;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(1, 4); // 1 image

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(width === 256 ? 0 : width, 0);
  dirEntry.writeUInt8(height === 256 ? 0 : height, 1);
  dirEntry.writeUInt8(0, 2); // color count
  dirEntry.writeUInt8(0, 3); // reserved
  dirEntry.writeUInt16LE(1, 4); // color planes
  dirEntry.writeUInt16LE(bpp, 6); // bits per pixel
  dirEntry.writeUInt32LE(totalImageDataSize, 8); // image data size
  dirEntry.writeUInt32LE(6 + 16, 12); // offset (22)

  const bih = Buffer.alloc(bihSize);
  bih.writeUInt32LE(bihSize, 0);
  bih.writeInt32LE(width, 4);
  bih.writeInt32LE(height * 2, 8); // Double height for ICO
  bih.writeUInt16LE(1, 12); // Planes
  bih.writeUInt16LE(bpp, 14); // BitCount
  bih.writeUInt32LE(0, 16); // BI_RGB
  bih.writeUInt32LE(imageSize + andMaskSize, 20);
  bih.writeInt32LE(0, 24);
  bih.writeInt32LE(0, 28);
  bih.writeUInt32LE(0, 32);
  bih.writeUInt32LE(0, 36);

  // Pixel data (BGRA, bottom-to-top)
  const pixels = Buffer.alloc(imageSize);
  const andMask = Buffer.alloc(andMaskSize, 0); // 0 = opaque

  // Colors:
  // Primary Gold: #E2B714 -> R: 226, G: 183, B: 20
  // Dark Chassis: #232528 -> R: 35, G: 37, B: 40
  // Red Accent: #CA4754 -> R: 202, G: 71, B: 84
  const colGold = [20, 183, 226, 255]; // BGRA
  const colDark = [40, 37, 35, 255];
  const colRed = [84, 71, 202, 255];

  for (let y = 0; y < height; y++) {
    // inverted Y for BMP bottom-to-top
    const bmpY = height - 1 - y;
    for (let x = 0; x < width; x++) {
      const offset = (bmpY * width + x) * 4;

      // Outer border radius check
      const r = 4;
      const inCorner =
        (x < r && y < r && Math.hypot(x - r, y - r) > r) ||
        (x >= width - r && y < r && Math.hypot(x - (width - r - 1), y - r) > r) ||
        (x < r && y >= height - r && Math.hypot(x - r, y - (height - r - 1)) > r) ||
        (x >= width - r && y >= height - r && Math.hypot(x - (width - r - 1), y - (height - r - 1)) > r);

      if (inCorner) {
        pixels.writeUInt8(0, offset);
        pixels.writeUInt8(0, offset + 1);
        pixels.writeUInt8(0, offset + 2);
        pixels.writeUInt8(0, offset + 3);
        continue;
      }

      // Outer rim: dark border (1px)
      const isRim = x === 0 || y === 0 || x === width - 1 || y === height - 1;
      if (isRim) {
        pixels.set(colDark, offset);
        continue;
      }

      // Bold 'T' monogram in the center
      // T top bar: y from 7 to 11, x from 7 to 24 (for 32x32)
      // T stem: y from 11 to 24, x from 13 to 18
      const scale = size / 32;
      const isTTop = y >= 7 * scale && y < 12 * scale && x >= 7 * scale && x < 25 * scale;
      const isTStem = y >= 11 * scale && y < 25 * scale && x >= 13 * scale && x < 19 * scale;

      // Red dot accent at bottom right: x around 22, y around 21
      const isRedDot = Math.hypot(x - 22 * scale, y - 21 * scale) <= 2.5 * scale;

      if (isRedDot) {
        pixels.set(colRed, offset);
      } else if (isTTop || isTStem) {
        pixels.set(colDark, offset);
      } else {
        pixels.set(colGold, offset);
      }
    }
  }

  return Buffer.concat([header, dirEntry, bih, pixels, andMask]);
}

const ico32 = createIco(32);
fs.writeFileSync("public/favicon.ico", ico32);
fs.writeFileSync("src/app/favicon.ico", ico32);
console.log("favicon.ico generated successfully!");
