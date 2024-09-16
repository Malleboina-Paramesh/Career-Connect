import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session) return null;
  const { user } = session;
  return (
    <div className="w-full ">
      <h1 className="font-bold text-2xl">
        Dashboard{" "}
        <span className="text-sm text-gray-500">under construction...</span>
      </h1>
      <div className="w-full h-full ">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default page;
