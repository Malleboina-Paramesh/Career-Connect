import { getSessionUserDetails } from "@/utils/helpers";

const page = async () => {
  const user = await getSessionUserDetails();
  return (
    <div className=" w-full text-center">
      <h1 className="font-bold text-2xl">Dashboard</h1>
      <p className="text-lg">Welcome {user.role}</p>
    </div>
  );
};

export default page;
