import { Express } from "express";
import { supabase } from "../config/supabase";
import { extractText } from "./pdf.service";
import { analyzeCurriculum, CourseAnalysis } from "./analysis.service";
import { createKnowledgeGraph } from "./graph.service";
import { analyzeCurriculumGap, GapReport } from "./gapAnalysis.service";

export async function uploadService(file: Express.Multer.File, userId: string | null = null) {
    console.log("[DEBUG] Upload service started");

    if (!file || !file.buffer) {
        throw new Error("Invalid file upload: missing file buffer.");
    }

    const fileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    const { error: storageError } = await supabase.storage
        .from("documents")
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
        });

    if (storageError) {
        throw new Error(`Supabase Storage Error: ${storageError.message}`);
    }

    console.log("[DEBUG] Storage upload complete");

    const { data: publicUrlData } = supabase.storage
        .from("documents")
        .getPublicUrl(fileName);

    const fileUrl = publicUrlData.publicUrl;

    const { data: dbData, error: dbError } = await supabase
        .from("documents")
        .insert({
            title: file.originalname,
            file_url: fileUrl,
            status: "UPLOADED",
            user_id: userId,
        })
        .select()
        .single();

    if (dbError) {
        await supabase.storage.from("documents").remove([fileName]);
        throw new Error(`Database Insert Error: ${dbError.message}`);
    }

    console.log("[DEBUG] Database insert complete");

    let fullText = "";
    try {
        console.log("[DEBUG] PDF parsing started");
        fullText = await extractText(file.buffer);
        console.log("[DEBUG] PDF parsing complete");

        await supabase
            .from("documents")
            .update({ status: "PARSED" })
            .eq("id", dbData.id);

    } catch (parseErr: any) {
        console.error("[DEBUG] PDF parsing error:", parseErr);
        await supabase
            .from("documents")
            .update({ status: "PARSE_FAILED" })
            .eq("id", dbData.id);

        throw new Error(`PDF Parsing Failed: ${parseErr.message}`);
    }

    let analysis: CourseAnalysis;
    try {
        console.log("[DEBUG] Gemini analysis started");
        analysis = await analyzeCurriculum(fullText);

        await supabase
            .from("documents")
            .update({ status: "ANALYZED" })
            .eq("id", dbData.id);

    } catch (analysisErr: any) {
        console.error("[DEBUG] Gemini Analysis Error Details:");
        console.error("Message:", analysisErr.message);
        console.error("Stack:", analysisErr.stack);

        await supabase
            .from("documents")
            .update({ status: "ANALYSIS_FAILED" })
            .eq("id", dbData.id);

        throw new Error(`Curriculum Analysis Failed: ${analysisErr.message}`);
    }

    try {
        console.log("[DEBUG] Neo4j Knowledge Graph generation started");
        await createKnowledgeGraph(dbData.id, analysis);

        await supabase
            .from("documents")
            .update({ status: "GRAPH_CREATED" })
            .eq("id", dbData.id);

        console.log("[DEBUG] Document status updated to GRAPH_CREATED");
    } catch (graphErr: any) {
        console.error("[DEBUG] Neo4j Knowledge Graph Error:", graphErr);
        await supabase
            .from("documents")
            .update({ status: "GRAPH_FAILED" })
            .eq("id", dbData.id);

        throw new Error(`Graph Generation Failed: ${graphErr.message}`);
    }

    let gapReport: GapReport;
    try {
        console.log("[DEBUG] Curriculum Gap Analysis started");
        gapReport = await analyzeCurriculumGap(dbData.id);

        await supabase
            .from("documents")
            .update({ status: "GAP_ANALYZED" })
            .eq("id", dbData.id);

        console.log("[DEBUG] Document status updated to GAP_ANALYZED");
    } catch (gapErr: any) {
        console.error("[DEBUG] Curriculum Gap Analysis Error:", gapErr);
        await supabase
            .from("documents")
            .update({ status: "GAP_ANALYSIS_FAILED" })
            .eq("id", dbData.id);

        throw new Error(`Gap Analysis Failed: ${gapErr.message}`);
    }

    return {
        success: true,
        documentId: dbData?.id,
        filename: fileName,
        fileUrl: fileUrl,
        analysis: analysis,
        gapReport: gapReport,
    };
}






