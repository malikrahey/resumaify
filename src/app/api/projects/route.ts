
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

export async function GET(request: Request) {
  
  const supabase = createClient();
  
  const {data: authData, error} = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }

  const { data, error: getError } = await supabase.from("projects").select().eq("user_id", user.id);

  if (getError) {
    const response = {
      content: getError,
      message: "Failed to get projects"
    }
    return new NextResponse(JSON.stringify(response), { status: 401 });
  }

  const response = {
    content: data,
    message: "Projects fetched successfully"
  }

  return new NextResponse(JSON.stringify(response), { status: 200 });
}

// Create a new project and return the newly created project
export async function POST(request: NextRequest) {
  const supabase = createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user || authError) {
    return new NextResponse("No user logged in", {status: 400});
  }

  const projectToInsert = {
    user_id: user.id,
  }

  const {data, error} = await supabase.from("projects").insert(projectToInsert).select();

  if (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }

  return new NextResponse(JSON.stringify(data[0]), { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient();
  const body = await request.json();
  const {id, ...project} = body as Project;
  const { data: authData, error: authError } = await supabase.auth.getUser();
  const user = authData?.user;

  console.log(id, project)
  if (authError) {
    return new NextResponse(JSON.stringify(authError), { status: 401 });
  }

  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }

  if (!id) {
    return new NextResponse("No project ID provided", { status: 400 });
  }

  const {data, status, error} = await supabase.from("projects").update(project).eq("id", id).select();
  console.log(status, error)
  
  if (data) {
    return new NextResponse(JSON.stringify(data), { status: 200 });
  }
  return new NextResponse("No project found with that id", {status: 404});
}