import fs from 'fs';
import path from 'path';

function generateFontCSS(baseURL) {
  const fonts = [
    {
      fontFamily: "DM Sans",
      src: `${baseURL}/fonts/DMSans-Regular.ttf`,
      fontWeight: "normal",
      fontStyle: "normal",
    },
    {
      fontFamily: "DM Sans",
      src: `${baseURL}/fonts/DMSans-Medium.ttf`,
      fontWeight: "500",
      fontStyle: "normal",
    },
    {
      fontFamily: "DM Sans",
      src: `${baseURL}/fonts/DMSans-MediumItalic.ttf`,
      fontWeight: "500",
      fontStyle: "italic",
    },
  ];

  const cssLines = fonts.map(
    (font) => `
  @font-face {
      font-family: '${font.fontFamily}';
      src: url('${font.src}') format('truetype');
      font-weight: ${font.fontWeight};
      font-style: ${font.fontStyle};
  }`
  );

  return cssLines.join("\n");
}

async function getBaseUrlFromConfig() {
  const configPath = path.resolve(process.cwd(), './astro.config.mjs');
  const config = await import(configPath);
  console.log(config.default.base);
  return config.default.base
}

async function main() {
  const newBaseURL = await getBaseUrlFromConfig();
  const fontCSS = generateFontCSS(newBaseURL);
  if (process.cwd().includes("script")) {
    process.chdir('../')
  }
  const filePath = path.resolve(process.cwd(), './src/assets/css/fonts.css');
  console.log(filePath);
  fs.writeFileSync(filePath, fontCSS, 'utf8');
  console.log('font.css file has been generated!');
}

main();

