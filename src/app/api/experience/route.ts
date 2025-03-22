
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import { start } from "repl";

export async function GET(request: Request) {
  
  const supabase = createClient();
  
  const {data: authData, error} = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }

  const { data, error: getError } = await supabase.from("experiences").select().eq("user_id", user.id);

  if (getError) {
    return new Response(JSON.stringify(getError), { status: 401 });
  }

  if (data) {

    const response = {
      content: data,
      message: "Experiences fetched successfully"
    };
    return new Response(JSON.stringify(response), { status: 200 });
  }
}

// Create a new experience and return the newly created experience
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user || authError) {
    return new NextResponse("No user logged in", {status: 400});
  }

  const experienceToInsert = {
    user_id: user.id,
  }

  const {data, error} = await supabase.from("experiences").insert(experienceToInsert).select().single();

  if (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }

  const response = {
    content: data,
    message: "Experience created successfully"
  };

  return new NextResponse(JSON.stringify(response), { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient();
  const body = await request.json();
  const {id, startDate, endDate, ...experienceData} = body;
  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user;

  const experience = {
    ...experienceData,
    start_date: startDate,
    end_date: endDate
  }
  
  if (authError) {
    return new NextResponse(JSON.stringify(authError), { status: 401 });
  }

  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }

  if (!id) {
    return new NextResponse("No experience ID provided", { status: 400 });
  }

  const {data, status, error} = await supabase.from("experiences").update(experience).eq("id", id).select();
  
  if (error) {
    console.log(error);
    return new NextResponse("Failed to update experience", {status: 500});
  }
  if (data) {
    const response = {
      content: data,
      message: "Experience updated successfully"
    };
    return new NextResponse(JSON.stringify(response), { status: 200 });
  }
  return new NextResponse("No experience found with that id", {status: 404});
}