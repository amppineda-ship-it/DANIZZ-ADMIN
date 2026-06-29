export interface PdfTable {
  readonly headers: readonly string[];
  readonly rows: readonly (readonly (string | number)[])[];
}

export interface PdfSection {
  readonly heading?: string;
  readonly lines?: readonly string[];
  readonly table?: PdfTable;
}

export interface PdfDocument {
  readonly title: string;
  readonly subtitle?: string;
  readonly sections: readonly PdfSection[];
}

const pageWidth = 595;
const pageHeight = 842;
const margin = 48;

export function downloadPdf(documentRef: Document, filename: string, content: PdfDocument): void {
  const blob = new Blob([buildPdf(content)], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const anchor = documentRef.createElement('a');
  anchor.href = url;
  anchor.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function buildPdf(content: PdfDocument): string {
  const pages = paginate(content);
  const objects: string[] = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ];
  const pageIds: number[] = [];

  for (const page of pages) {
    const stream = page.join('\n');
    const contentId = objects.length + 1;
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    const pageId = objects.length + 1;
    pageIds.push(pageId);
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
  }

  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return pdf;
}

function paginate(content: PdfDocument): string[][] {
  const pages: string[][] = [];
  let current: string[] = [];
  let y = pageHeight - margin;

  const newPage = (): void => {
    if (current.length) pages.push(current);
    current = [];
    y = pageHeight - margin;
  };
  const ensureSpace = (height: number): void => {
    if (y - height < margin) newPage();
  };
  const text = (value: string, x: number, size = 10, bold = false): void => {
    current.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapeText(value)}) Tj ET`);
    y -= size + 7;
  };

  text(content.title, margin, 18, true);
  if (content.subtitle) text(content.subtitle, margin, 10);
  y -= 10;

  for (const section of content.sections) {
    ensureSpace(48);
    if (section.heading) {
      text(section.heading, margin, 13, true);
      y -= 3;
    }
    section.lines?.forEach((line) => wrap(line, 96).forEach((part) => text(part, margin, 10)));
    if (section.table) {
      y -= 4;
      const widths = Array.from({ length: section.table.headers.length }, () => (pageWidth - margin * 2) / Math.max(section.table!.headers.length, 1));
      const row = (cells: readonly (string | number)[], bold = false): void => {
        ensureSpace(22);
        let x = margin;
        cells.forEach((cell, index) => {
          const value = truncate(String(cell), Math.max(12, Math.floor(widths[index] / 5.2)));
          current.push(`BT /${bold ? 'F2' : 'F1'} 8 Tf 1 0 0 1 ${x} ${y} Tm (${escapeText(value)}) Tj ET`);
          x += widths[index];
        });
        y -= 17;
      };
      row(section.table.headers, true);
      section.table.rows.forEach((cells) => row(cells));
    }
    y -= 12;
  }

  if (current.length) pages.push(current);
  return pages.length ? pages : [[]];
}

function wrap(value: string, max: number): string[] {
  const words = normalize(value).split(' ');
  const lines: string[] = [];
  let line = '';
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines;
}

function truncate(value: string, max: number): string {
  const normalized = normalize(value);
  return normalized.length > max ? `${normalized.slice(0, Math.max(0, max - 3))}...` : normalized;
}

function normalize(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\x20-\x7E]/g, '');
}

function escapeText(value: string): string {
  return normalize(value).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}
