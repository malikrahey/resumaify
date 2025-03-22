import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  console.log(JSON.stringify(data))
  if (error) {
    return new Response(JSON.stringify(error), { status: 401 });
  }

  if (data) {
    return new Response(JSON.stringify(data.session?.user), { status: 200 });
  }

}