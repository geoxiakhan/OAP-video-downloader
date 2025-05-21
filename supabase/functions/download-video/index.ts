import { createClient } from "npm:@supabase/supabase-js@2.39.0";
import ytdl from "npm:ytdl-core@4.11.5";
import fbvideos from "npm:fb-video-downloader@1.0.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, quality, format } = await req.json();
    
    if (!url) {
      throw new Error("URL is required");
    }

    let videoUrl: string;
    
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const info = await ytdl.getInfo(url);
      const format = ytdl.chooseFormat(info.formats, { quality: quality });
      videoUrl = format.url;
    } 
    else if (url.includes("facebook.com")) {
      const data = await fbvideos(url);
      videoUrl = quality === "high" ? data.hd : data.sd;
    }
    else if (url.includes("instagram.com")) {
      throw new Error("Instagram downloads are temporarily unavailable");
    }
    else {
      throw new Error("Unsupported platform");
    }

    return new Response(
      JSON.stringify({ downloadUrl: videoUrl }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});