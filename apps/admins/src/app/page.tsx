import DemoForm from "@/components/DemoForm";
import { db } from "@/utils/db";
import { IUser } from "@local/types";
import { Button } from "@local/ui/components/ui/button";
import { Switch } from "@local/ui/components/ui/switch";

export default async function Home() {
  const users: IUser = {
    id: 1,
    name: "test",
  };
  const user = await db.user.findMany();
  return (
    <div className="flex justify-center items-center flex-col">
      this is for the admins {JSON.stringify(users)}
      {JSON.stringify(user)}
      <Switch />
      {process.env.BACKEND_BASE_URL}
      <DemoForm />
    </div>
  );
}
