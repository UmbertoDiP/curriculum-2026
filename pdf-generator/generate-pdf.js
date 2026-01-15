const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Carica il file HTML locale
  const htmlPath = path.join(__dirname, 'di-puorto-umberto-15-01-2026.html');
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });

  // Genera il PDF nella stessa cartella
  await page.pdf({
    path: path.join(__dirname, 'di-puorto-umberto-15-01-2026.pdf'),
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    displayHeaderFooter: false,
    margin: {
      top: '15px',
      right: '15px',
      bottom: '15px',
      left: '15px'
    }
  });

  console.log('✅ PDF generato con successo: di-puorto-umberto-15-01-2026.pdf');
  console.log('📄 Testo completamente selezionabile');
  console.log('🎯 Rendering identico all\'HTML originale');

  await browser.close();
})();
