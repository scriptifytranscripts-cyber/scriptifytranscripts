/**
 * Helper to download any URL as a real binary file
 */
export async function downloadFileFromUrl(url: string, filename: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Download failed, using fallback:', error);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

/**
 * Helper to trigger text / html / doc download
 */
export function downloadTextContent(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate official printable HTML Letterhead & Document Header (offline self-contained)
 */
export function generateLetterheadHtml(logoBase64?: string): string {
  const logoSrc = logoBase64
    ? `data:image/jpeg;base64,${logoBase64}`
    : '/logo.jpg';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scriptify Transcripts - Official Document Letterhead</title>
  <style>
    @page {
      size: letter;
      margin: 20mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.6;
      background-color: #f8fafc;
      padding: 40px 20px;
      margin: 0;
    }
    .page-container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      padding: 50px 60px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      border-radius: 8px;
      box-sizing: border-box;
    }
    @media print {
      body {
        background: transparent;
        padding: 0;
      }
      .page-container {
        box-shadow: none;
        padding: 0;
        max-width: 100%;
        border-radius: 0;
      }
      .no-print {
        display: none !important;
      }
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      border-bottom: 2px solid #0b1e36;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .logo-cell {
      vertical-align: middle;
      width: 60%;
    }
    .logo-img {
      width: 64px;
      height: 64px;
      vertical-align: middle;
      margin-right: 15px;
      border-radius: 6px;
    }
    .brand-title {
      display: inline-block;
      vertical-align: middle;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
      color: #0b1e36;
      margin: 0;
      text-transform: uppercase;
    }
    .brand-accent {
      color: #00a8e8;
    }
    .brand-tagline {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    .address-cell {
      vertical-align: middle;
      text-align: right;
      width: 40%;
      font-size: 11px;
      color: #475569;
      line-height: 1.5;
    }
    .address-cell strong {
      color: #0f172a;
    }
    .meta-grid {
      display: table;
      width: 100%;
      margin-bottom: 30px;
      background: #f1f5f9;
      padding: 15px 20px;
      border-radius: 6px;
      font-size: 12px;
      box-sizing: border-box;
    }
    .meta-row {
      display: table-row;
    }
    .meta-label {
      display: table-cell;
      font-weight: 700;
      color: #334155;
      padding: 4px 10px 4px 0;
      width: 25%;
    }
    .meta-val {
      display: table-cell;
      color: #0f172a;
      padding: 4px 0;
    }
    .content-body {
      font-size: 14px;
      color: #1e293b;
      min-height: 350px;
    }
    .footer-bar {
      margin-top: 50px;
      border-top: 1px solid #e2e8f0;
      padding-top: 15px;
      text-align: center;
      font-size: 10px;
      color: #94a3b8;
    }
    .print-button {
      background: #00a8e8;
      color: #020617;
      border: none;
      padding: 10px 20px;
      font-size: 13px;
      font-weight: bold;
      border-radius: 6px;
      cursor: pointer;
      margin-bottom: 20px;
    }
    .print-button:hover {
      background: #38bdf8;
    }
  </style>
</head>
<body>
  <div class="no-print" style="text-align: center; margin-bottom: 20px;">
    <button class="print-button" onclick="window.print()">Print Letterhead / Save to PDF</button>
  </div>

  <div class="page-container">
    <table class="header-table">
      <tr>
        <td class="logo-cell">
          <img src="${logoSrc}" alt="Scriptify Transcripts Logo" class="logo-img" />
          <div class="brand-title">
            <h1 class="brand-name">Scriptify <span class="brand-accent">Transcripts</span></h1>
            <div class="brand-tagline">Accurate &bull; Secure &bull; Fast</div>
          </div>
        </td>
        <td class="address-cell">
          <strong>Scriptify Transcripts</strong><br>
          30 N Gould St, STE R<br>
          Sheridan, WY 82801, USA<br>
          Email: contact@scriptifytranscripts.com<br>
          Web: scriptifytranscripts.com
        </td>
      </tr>
    </table>

    <div class="meta-grid">
      <div class="meta-row">
        <span class="meta-label">DATE:</span>
        <span class="meta-val">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">CASE / MATTER:</span>
        <span class="meta-val">In Re: Deposition Examination & Audio Record #ST-2026</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">DELIVERY SPEED:</span>
        <span class="meta-val">Court-Certified Verbatim &bull; Expedited 48h Turnaround</span>
      </div>
      <div class="meta-row">
        <span class="meta-label">SECURITY LEVEL:</span>
        <span class="meta-val">Client-Side AES-256 Verified &bull; Zero Ephemeral Retention</span>
      </div>
    </div>

    <div class="content-body">
      <h3 style="font-size: 16px; color: #0b1e36; margin-top: 0;">CERTIFICATE OF ACCURACY & STENOGRAPHIC FIDELITY</h3>
      <p>This certified transcription document has been produced in accordance with Federal Rule 30(b)(6) standard formatting conventions and certified court reporter guidelines.</p>
      
      <p>I hereby certify that the audio recording provided to Scriptify Transcripts was ingested via our encrypted zero-retention processing gateway, and that the accompanying verbatim text represents a complete, true, and accurate transcription of the spoken dialogue, witness testimony, and proceedings to the highest degree of phonetic fidelity (99.8%+ benchmark).</p>
      
      <p style="margin-top: 40px;"><strong>Transcription Quality Assurance Division</strong><br>
      Scriptify Transcripts<br>
      Sheridan, Wyoming</p>
    </div>

    <div class="footer-bar">
      Scriptify Transcripts &bull; 30 N Gould St, STE R, Sheridan, WY 82801 &bull; contact@scriptifytranscripts.com &bull; Certified Transcription Services
    </div>
  </div>
</body>
</html>`;
}

/**
 * Generate Word .doc compatible letterhead
 */
export function generateWordDocLetterhead(): string {
  return `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>Scriptify Transcripts Letterhead</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body { font-family: Arial, sans-serif; font-size: 11pt; color: #1e293b; line-height: 1.5; }
    table.header { width: 100%; border-bottom: 2pt solid #0b1e36; margin-bottom: 20pt; padding-bottom: 15pt; }
    .brand { font-size: 20pt; font-weight: bold; color: #0b1e36; }
    .accent { color: #00a8e8; }
    .tagline { font-size: 9pt; color: #64748b; font-weight: bold; text-transform: uppercase; }
    .address { font-size: 9pt; color: #475569; text-align: right; }
    .meta-table { width: 100%; background: #f1f5f9; padding: 10pt; margin-bottom: 20pt; font-size: 10pt; }
    .footer { font-size: 8pt; color: #94a3b8; text-align: center; border-top: 1pt solid #cbd5e1; padding-top: 10pt; margin-top: 40pt; }
  </style>
</head>
<body>
  <table class="header">
    <tr>
      <td width="60%">
        <div class="brand">SCRIPTIFY <span class="accent">TRANSCRIPTS</span></div>
        <div class="tagline">Accurate &bull; Secure &bull; Fast</div>
      </td>
      <td width="40%" class="address">
        <b>Scriptify Transcripts</b><br>
        30 N Gould St, STE R<br>
        Sheridan, WY 82801, United States<br>
        contact@scriptifytranscripts.com<br>
        scriptifytranscripts.com
      </td>
    </tr>
  </table>

  <table class="meta-table">
    <tr><td><b>Date:</b></td><td>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td></tr>
    <tr><td><b>Matter / Reference:</b></td><td>Official Certified Transcript #ST-2026</td></tr>
    <tr><td><b>Format Standard:</b></td><td>Rule 30(b)(6) Line-Numbered Deposition</td></tr>
  </table>

  <h2>Certificate of Accuracy</h2>
  <p>This certified document confirms that the audio recording submitted to Scriptify Transcripts has been transcribed verbatim in accordance with court reporting standards.</p>
  <p>[Type your legal transcript body or official correspondence here...]</p>

  <div class="footer">
    Scriptify Transcripts &bull; 30 N Gould St, STE R, Sheridan, WY 82801 &bull; contact@scriptifytranscripts.com
  </div>
</body>
</html>`;
}

/**
 * Generate complete Markdown Style Guide & Marketing Copy
 */
export function generateBrandGuideMarkdown(): string {
  return `# Scriptify Transcripts - Official Brand Identity Guidelines

**Tagline:** Accurate • Secure • Fast  
**US Headquarters:** 30 N Gould St, STE R, Sheridan, WY 82801, United States  
**Official Email:** contact@scriptifytranscripts.com  
**Website:** https://scriptifytranscripts.com  

---

## 1. Brand Positioning
Scriptify Transcripts is a premier US legal and professional audio transcription company providing trial attorneys, corporate counsel, research institutions, and media creators with high-accuracy, certified audio-to-text.

**Key Brand Pillars:**
- **99.8% Verbatim Precision:** Rigorous dual-pass human proofing for court depositions and technical audio.
- **Competitive Market Rates:** Delivering court-grade transcripts starting at $1.45/minute (vs. $1.99–$3.50+ legacy stenographers).
- **Zero Ephemeral Retention:** Client-side AES-256 pre-encryption with automatic memory purge upon delivery.

---

## 2. Color Palette (Judicial Paper & Constitutional Navy)
- **Judicial Navy:** \`#0F2A4A\` (Primary Brand, CTAs & Legal Authority)
- **Editorial Dark Ink:** \`#0F1E36\` (High-Contrast Headlines & Body Copy)
- **Archival Paper:** \`#FAF8F4\` (Primary Document Canvas)
- **Warm Stone:** \`#F2EFE9\` (Secondary Section Bands & Surfaces)
- **Antique Seal Bronze:** \`#9A6B2F\` (Restrained Legal Badges & Accents)
- **Crisp Document White:** \`#FFFFFF\` (Elevated Transcript Sheets & Cards)

---

## 3. Official Typography
- **Editorial Serif Display:** Playfair Display
- **Primary UI & Body:** Plus Jakarta Sans
- **Timecodes & Tabular Figures:** JetBrains Mono (\`tabular-nums\`)

---

## 4. Social Media Launch Copy (LinkedIn / X)
\`\`\`text
Need court-grade, timestamped legal or corporate transcripts delivered with 99.8% precision? 

Scriptify Transcripts provides US-standard verbatim audio-to-text with guaranteed zero-retention privacy and same-day turnaround options.

30 N Gould St, STE R, Sheridan, WY 82801
https://scriptifytranscripts.com
contact@scriptifytranscripts.com
#Transcription #LegalTech #Depositions #CourtReporting #AudioToText
\`\`\`
`;
}
