"use client";
import { useGeneralStore } from "@/Providers/ContextProvider";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@local/ui/components/tabs";

const JobTabs = () => {
  const { setTab, tab } = useGeneralStore();

  return (
    <Tabs defaultValue={tab}>
      <TabsList>
        <TabsTrigger value="active" onClick={() => setTab("active")}>
          Active Jobs
        </TabsTrigger>
        <TabsTrigger value="applied" onClick={() => setTab("applied")}>
          Applied
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default JobTabs;
