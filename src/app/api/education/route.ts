import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const { data: {user} } = await supabase.auth.getUser(); 

  if (!user) return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 401 });

  const {data: education} = await supabase.from("education").select("*").eq("user_id", user?.id);

  if (!education) {
    return new NextResponse(JSON.stringify({ content: [], message: "Education not found" }),{
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const response = {
    content: education,
    message: "success"
  }

  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();
  const { data: {user} } = await supabase.auth.getUser(); 
  if (!user) return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 401 });

  const { education } = await request.json();

  const educationObject = {
    user_id: user?.id,
    ...education,
  };
  console.log("educationObject", educationObject);
  const {data, error} = await supabase.from("education").insert(educationObject).select();

  if (error) {
    console.log("error");
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Failed to create education" }), { status: 500 });
  }

  const response = {
    content: data,
    message: "Education created successfully",
  }
  return new NextResponse(JSON.stringify(response), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  const { data: {user} } = await supabase.auth.getUser(); 

  if (!user) return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 401 });

  const education = await request.json();
  console.log("PATCH education", education);
  const educationObject = {
    id: education.id,
    user_id: user?.id,
    start_date: education.startDate,
    end_date: education.endDate,
    school: education.school,
    grade: education.grade,
    degree: education.degree,
    major: education.major,
  };

  const {data: educationData} = await supabase.from("education").update(educationObject).eq("id", educationObject.id).select();

  if (!educationData) {
    return new NextResponse(JSON.stringify({ message: "Failed to update education" }), { status: 500 });
  }
  return new NextResponse(JSON.stringify(educationData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}