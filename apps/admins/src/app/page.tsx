import { auth } from "@/auth";
import Logout from "@/components/Logout";
import { Button } from "@local/ui/components/button";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  if (!session?.user) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-4">
        <h1>Landing Page</h1>
        <p>Not logged in</p>
        <Link href="/login">
          <Button>Login for admins/mentors</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col">
      <h1>Landing Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Logout />
      <Link href="/access-management">
        <Button>Go to Access management</Button>
      </Link>
    </div>
  );
}
