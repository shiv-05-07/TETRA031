import { PDFParse } from "pdf-parse";
import * as pdfParseModule from "pdf-parse";

export async function extractText(buffer: Buffer): Promise<string> {
    if (!buffer || buffer.length === 0) {
        throw new Error("Invalid PDF buffer: buffer is empty.");
    }

    try {
        if (typeof (pdfParseModule as any) === "function") {
            const data = await (pdfParseModule as any)(buffer);
            return data.text || "";
        } else if (typeof (pdfParseModule as any).default === "function") {
            const data = await (pdfParseModule as any).default(buffer);
            return data.text || "";
        } else if (PDFParse) {
            const parser = new PDFParse({ data: buffer });
            const result = await parser.getText();
            const text = typeof result === "string" ? result : result?.text || "";
            return text;
        } else {
            throw new Error("pdf-parse library not properly initialized.");
        }
    } catch (err: any) {
        throw new Error(`PDF Parsing Error: ${err.message || err}`);
    }
}

