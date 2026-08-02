import "dotenv/config";

console.log("TEST VECTOR FILE STARTED");

import { processTextForVectorSearch } from "./services/vectorPipeline.js";

async function test() {
    console.log("TEST FUNCTION STARTED");

    try {
        const result = await processTextForVectorSearch({
            videoId: "test-video-001",
            content:
                "Artificial intelligence allows computers to learn patterns from data and make predictions.",
        });

        console.log("Vector stored successfully:");
        console.log(result);
    } catch (error) {
        console.error("Vector test failed:");
        console.error(error);
    }
}

test();