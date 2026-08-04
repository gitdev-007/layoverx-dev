import * as rawPdfParse from 'pdf-parse';
import Tesseract from 'tesseract.js';

const pdfParse = typeof rawPdfParse === 'function' 
  ? rawPdfParse 
  : (rawPdfParse && typeof (rawPdfParse as any).default === 'function' ? (rawPdfParse as any).default : null);

export async function extractTextFromFile(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    if (mimeType === 'application/pdf') {
      if (typeof pdfParse === 'function') {
        const parsed = await pdfParse(buffer);
        return parsed.text || '';
      }
    } else if (mimeType.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(buffer, 'eng');
      return text || '';
    }
  } catch (error: any) {
    console.warn('⚠️ Text extraction warning (proceeding with fallback):', error.message || error);
    return '';
  }
  return '';
}

export interface Telemetry {
  pnr: string | null;
  flights: string[];
}

export function parseTicketTelemetry(rawText: string): Telemetry {
  const pnrRegex = /\b([A-Z0-9]{6})\b/;
  const flightRegex = /\b([A-Z0-9]{2}\s?\d{3,4})\b/g;

  const pnrMatch = rawText.match(pnrRegex);
  const flightMatches = rawText.match(flightRegex);

  return {
    pnr: pnrMatch ? pnrMatch[1] : null,
    flights: flightMatches ? Array.from(new Set(flightMatches)) : [],
  };
}
