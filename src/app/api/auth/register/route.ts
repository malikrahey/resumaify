import { createClient } from "@/utils/supabase/server";


export async function POST(request: Request) {

  const { email, password } = await request.json();

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({ email, password,
    options: {
      emailRedirectTo: `http://localhost:3000/builder/personal`
    }
   });

  if (error) {
    console.error(JSON.stringify(error))
    return new Response(JSON.stringify(error), { status: 401 });
  }

  if (data) {
    return new Response(JSON.stringify(data), { status: 200 });
  }
}