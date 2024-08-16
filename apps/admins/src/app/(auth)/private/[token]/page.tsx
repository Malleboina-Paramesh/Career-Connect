import React from "react";
import LoginForm from "../../_components/LoginForm";

// now i am not using this component, so i will remove this

const page = ({ params }: { params: { token: string } }) => {
  if (!params.token) {
    return <h1>Token not found</h1>;
  }

  if (params.token !== process.env.VERY_SECRET_KEY) {
    return <h1>Accha bhai, nice try but ...........</h1>;
  }
  return (
    <LoginForm
      title="Login for master admins"
      description="If you are a master admin you can login with your credintails that you have created or were sent to your registered email."
    />
  );
};

export default page;
