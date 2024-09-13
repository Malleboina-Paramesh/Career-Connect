import { auth } from "@/auth";
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
          <Button>Login for students</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col">
      <h1>Landing Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/* <Logout /> */}
    </div>
  );
}
