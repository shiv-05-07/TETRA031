import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

export async function searchSimilarChunks({
  embedding,
  matchThreshold = 0.3,
  matchCount = 5,
}) {
  const { data, error } = await supabase.rpc("match_video_chunks", {
    query_embedding: embedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
  });

  if (error) {
    throw new Error(`Vector search failed: ${error.message}`);
  }

  return data;
}
