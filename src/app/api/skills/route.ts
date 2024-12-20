import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const supabase = createClient();
  const{ data: authData} = await supabase.auth.getUser();
  const user = authData?.user;
  
  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }
  
  const {data: responseData, error} = await supabase.from("skills").select("*").eq("id", user.id).single();
  
  if (error) {
    return new NextResponse("Failed to get personal info", {status: 500});
  }
  if (!responseData) {
    return new NextResponse("No skills found", {status: 404});
  }
  const response = {
    content: {
      skills: JSON.parse(responseData?.skills as string)
    }
  }

  return new NextResponse(JSON.stringify(response), {status: 200});
}

export async function PUT(request: NextRequest) {

  const supabase = createClient();
  const{ data: authData} = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }

  const { skills } = await request.json();

  const {data: skillsData, error} = await supabase.from("skills").upsert({
    id: user.id,
    skills
  });

  if (error) {

    console.log(error);
    return new NextResponse("Failed to save skills", {status: 500});
  }

  const response = {
    content: skillsData,
    message: "Skills saved successfully"
  };

  return new NextResponse(JSON.stringify(response), {status: 200});
}