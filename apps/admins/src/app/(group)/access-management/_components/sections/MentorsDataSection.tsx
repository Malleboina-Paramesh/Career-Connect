"use client";

import { useEffect, useState } from "react";
import { DataTableWithFilters } from "../DataTableWithFilters";
import { MentorsColumn } from "../columns/MentorsColumn";
import { getMentors, MentorTableDataType } from "../../action";
import Loading from "@/components/Loading";

const MentorsDataSection = () => {
  const [data, setData] = useState<MentorTableDataType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await getMentors();

      setData(res);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  return <DataTableWithFilters columns={MentorsColumn} data={data} />;
};

export default MentorsDataSection;
