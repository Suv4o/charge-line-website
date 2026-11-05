// Packs PNGs into one favicon.ico (each image stored as PNG, which every current browser reads).
// Usage: node favicon.mjs <png>... <out.ico>
import { readFileSync, writeFileSync } from "node:fs";

const args = process.argv.slice(2);
const out = args.pop();
const images = args.map((file) => {
  const data = readFileSync(file);
  // PNG header: width and height are big-endian at bytes 16 and 20
  return { data, width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
});

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // 1 = icon
header.writeUInt16LE(images.length, 4);

const entries = [];
let offset = 6 + 16 * images.length;
for (const { data, width, height } of images) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(width >= 256 ? 0 : width, 0);
  entry.writeUInt8(height >= 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2); // no palette
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4); // colour planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(data.length, 8);
  entry.writeUInt32LE(offset, 12);
  entries.push(entry);
  offset += data.length;
}

writeFileSync(out, Buffer.concat([header, ...entries, ...images.map((image) => image.data)]));
