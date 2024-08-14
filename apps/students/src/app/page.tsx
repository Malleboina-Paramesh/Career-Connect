import { db } from "@/utils/db";

export default async function Home() {
  const users = await db.user.findMany();
  return <div>this is for the students {JSON.stringify(users)}</div>;
}
