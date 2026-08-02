import pdfParse from "pdf-parse";

/**
 * Extracts raw text from a PDF buffer.
 * @param buffer The file buffer containing the PDF data
 * @returns The extracted text string
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const data = await pdfParse(buffer);
    return data.text || "";
  } catch (error) {
    console.error("PDF Parsing Error:", error);
    throw new Error("Failed to parse the provided PDF file.");
  }
}
