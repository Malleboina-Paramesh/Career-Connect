"use client";
import { AddNewAdmin } from "@/actions/demo";
import { Button } from "@local/ui/components/ui/button";
import React from "react";

const DemoForm = () => {
  return (
    <div>
      <Button onClick={() => AddNewAdmin()}>Add</Button>
    </div>
  );
};

export default DemoForm;
