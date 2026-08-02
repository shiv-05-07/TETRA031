import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

export async function storeEmbedding({
  videoId,
  content,
  embedding,
}) {
  const { data, error } = await supabase
    .from("video_chunks")
    .insert({
      video_id: videoId,
      content,
      embedding,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to store embedding: ${error.message}`);
  }

  return data;
}
