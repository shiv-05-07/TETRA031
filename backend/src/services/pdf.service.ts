import { PDFParse } from "pdf-parse";

export async function extractText(buffer: Buffer): Promise<string> {
  if (!buffer || buffer.length === 0) {
    throw new Error("Invalid PDF buffer: buffer is empty.");
  }

  try {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const text = typeof result === "string" ? result : result?.text || "";
    return text;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`PDF Parsing Error: ${message}`);
  }
}
