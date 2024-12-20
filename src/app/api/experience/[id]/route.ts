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

  const {data: deleteData} = await supabase.from("experiences").delete().eq("id", id).select();

  console.log(deleteData, id);
  if (!deleteData) {
    return new NextResponse("No experience found with that id", {status: 404});
  }

  return new NextResponse("Deleted experience with id " + id, { status: 200 });
}