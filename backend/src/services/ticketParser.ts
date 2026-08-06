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
  isValid: boolean;
  pnr: string | null;
  flights: string[];
  reason: string;
}

export function parseTicketTelemetry(rawText: string): Telemetry {
  if (!rawText || typeof rawText !== 'string' || rawText.trim().length < 30) {
    return { 
      isValid: false, 
      pnr: null,
      flights: [],
      reason: 'Unreadable document or text too short to be an e-ticket.' 
    };
  }

  const cleanText = rawText.replace(/\s+/g, ' ');

  // 1. Strict PNR Pattern Matcher (Looks for 6-character alphanumeric code, optionally preceded by PNR/Booking Ref labels)
  const labeledPnrMatch = cleanText.match(/(?:pnr|booking\s*ref|record\s*locator|reference)[:\s#]*([a-z0-9]{6})/i);
  const fallbackPnrMatch = cleanText.match(/\b([A-Z0-9]{6})\b/);
  const pnr = labeledPnrMatch ? labeledPnrMatch[1].toUpperCase() : (fallbackPnrMatch ? fallbackPnrMatch[1].toUpperCase() : null);

  // 2. Flight Number Pattern Matcher (Standard IATA airline codes + 3/4 digits, e.g., 6E-504, AI-101, EK501, UK955)
  const flightRegex = /\b([A-Z2-9]{2}\s*[-]?\s*\d{3,4})\b/gi;
  const rawFlightMatches = cleanText.match(flightRegex) || [];
  
  // Filter false positives (e.g. date strings like "05 AUG")
  const flights = Array.from(new Set(rawFlightMatches)).filter(item => {
    const upper = item.toUpperCase().trim();
    return !/^\d{2}\s*[A-Z]{3}$/.test(upper) && !/^(202|203)/.test(upper);
  });

  // Mandatory Rule: Must extract PNR and at least 1 Flight Number
  const isValid = Boolean(pnr && flights.length > 0);

  return {
    isValid,
    pnr: pnr || null,
    flights: flights.slice(0, 4),
    reason: isValid 
      ? 'Valid e-ticket detected.' 
      : 'Could not detect a valid 6-character PNR or Flight Number in the uploaded file.'
  };
}
