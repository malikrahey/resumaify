import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.getUser();
  const user = authData?.user;
  const { id } = params;
  if (!user) {
    return new NextResponse("No user logged in", {status: 400});
  }

  const {data: deleteData} = await supabase.from("education").delete().eq("id", id).select();

  if (!deleteData) {
    return new NextResponse("No experience found with that id", {status: 404});
  }

  const response = {
    content: deleteData,
    message: "Experience deleted successfully",
  }

  return new NextResponse(JSON.stringify(response), { status: 200 });
}