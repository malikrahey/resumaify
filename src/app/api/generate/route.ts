import { GENERATE_RESUME_PROMPT, RESUME_CSS, SIMPLE_RESUME_CSS } from "@/lib/constants";
import generatePdf from "@/utils/generatePdf";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const { jobDescription } = await request.json()
  const cookies = request.cookies;
  const supabase = createClient();
  const {data: {user}} = await supabase.auth.getUser();

  if (!user) {
    return new Response("No user logged in", {status: 400});
  }

  const [
    {data: personal},
    {data: skills},
    {data: education},
    {data: experience},
    {data: projects},
  ] = await Promise.all([
    supabase.from("personal").select("*").eq("user_id", user.id).single(),
    supabase.from("skills").select("*").eq("user_id", user.id).single(),
    supabase.from("education").select("*").eq("user_id", user.id).select(),
    supabase.from("experiences").select("*").eq("user_id", user.id).select(),
    supabase.from("projects").select("*").eq("user_id", user.id).select(),
  ]);

  const personalInfo = {...personal, links: JSON.parse(personal.links)};

  const content = {
    personalInfo,
    skills,
    education,
    experience,
    projects
  }

  const openai = new OpenAI();

  const prompt = GENERATE_RESUME_PROMPT;
  const message = `
  <JobDescription>
    ${jobDescription}
  </JobDescription>

  <ResumeInfo>
    ${JSON.stringify(content)}
  </ResumeInfo>
  `;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {role: "system", content: prompt},
      {role: "user", content: message},
    ],
    response_format: {type: "json_object"},
  });

  const result = completion.choices[0].message.content as string;
  const resultObject = JSON.parse(result);
  const htmlBody = resultObject.content;

  const resumeHtml = `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <style>
        ${SIMPLE_RESUME_CSS}
      </style>
    </head>
    <body>
      ${htmlBody}
    </body>
  </html>
  `;

  const pdfBuffer = await generatePdf(resumeHtml);
  
  const response: any = {
    content: {
      text: resumeHtml,
      buffer: pdfBuffer
    },
    message: "success"
  }

  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}