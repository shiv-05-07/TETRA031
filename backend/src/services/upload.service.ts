import { Express } from "express";
import { supabase } from "../config/supabase";
import { extractText } from "./pdf.service";

export async function uploadService(file: Express.Multer.File, userId: string | null = null) {
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

    let fullText = "";
    try {
        fullText = await extractText(file.buffer);

        await supabase
            .from("documents")
            .update({ status: "PARSED" })
            .eq("id", dbData.id);

    } catch (parseErr: any) {
        await supabase
            .from("documents")
            .update({ status: "PARSE_FAILED" })
            .eq("id", dbData.id);

        throw new Error(`PDF Parsing Failed: ${parseErr.message}`);
    }

    const textPreview = fullText.slice(0, 1000);

    return {
        success: true,
        documentId: dbData?.id,
        filename: fileName,
        fileUrl: fileUrl,
        textPreview: textPreview,
    };
}

