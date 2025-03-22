import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = createClient();
  const{ data: authData} = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }

  const {data: responseData, error} = await supabase.from("personal").select("*").eq("user_id", user.id).single();
  const personalInfo = {...responseData, links: JSON.parse(responseData.links)};
  if (error) {
    console.log(error);
    return new NextResponse("Failed to get personal info", {status: 500});
  }

  const response = {
    content: personalInfo,
    message: "Personal info fetched successfully"
  };

  return new NextResponse(JSON.stringify(response), {status: 200});
}

export async function PUT(request: NextRequest) {

  const supabase = createClient();
  const{ data: authData} = await supabase.auth.getUser();
  const user = authData?.user;

  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }

  const { name, phone, city, email, links } = await request.json();

  const {data: responseData, error} = await supabase.from("personal").upsert({
    id: user.id,
    name,
    phone,
    location:city,
    email,
    links,
    user_id: user.id
  });

  if (error) {

    console.log(error);
    return new NextResponse("Failed to save personal info", {status: 500});
  }

  const response = {
    content: responseData,
    message: "Personal info saved successfully"
  };

  return new NextResponse(JSON.stringify(response), {status: 200});
}
