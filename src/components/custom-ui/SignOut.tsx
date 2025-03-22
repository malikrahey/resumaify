import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SignOut() {

  const supabase = createClient();
  const router = useRouter();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
  }

  return (
    <Button variant="outline" onClick={handleSignOut}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign out
      <span className="sr-only">Sign out of your account</span>
    </Button>
  )
}