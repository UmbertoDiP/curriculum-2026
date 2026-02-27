const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF(htmlFilename, pdfFilename) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Carica il file HTML locale
  const htmlPath = path.join(__dirname, htmlFilename);
  await page.goto(`file://${htmlPath}`, {
    waitUntil: 'networkidle0'
  });

  // Genera il PDF nella stessa cartella
  await page.pdf({
    path: path.join(__dirname, pdfFilename),
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

  console.log(`✅ PDF generato con successo: ${pdfFilename}`);

  await browser.close();
}

(async () => {
  // Genera PDF italiano
  await generatePDF('di-puorto-umberto-15-01-2026.html', 'di-puorto-umberto-15-01-2026.pdf');

  // Genera PDF inglese
  await generatePDF('di-puorto-umberto-15-01-2026-en.html', 'di-puorto-umberto-15-01-2026-en.pdf');

  console.log('📄 Testo completamente selezionabile');
  console.log('🎯 Rendering identico all\'HTML originale');
  console.log('✅ Entrambi i PDF (IT e EN) generati con successo');
})();
