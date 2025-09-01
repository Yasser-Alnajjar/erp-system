import { getServerAuthSession } from "@auth";
import React from "react";

const page = async () => {
  const session = await getServerAuthSession();
  return (
    <h1 className="text-4xl font-bold capitalize">
      Welcome {session?.user?.first_name} {session?.user?.last_name}
    </h1>
  );
};

export default page;
