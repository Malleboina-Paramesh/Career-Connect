import { signOut } from "@/auth";
import { Button } from "@local/ui/components/button";
import React from "react";

const Logout = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant={"destructive"}>Logout</Button>
    </form>
  );
};

export default Logout;
