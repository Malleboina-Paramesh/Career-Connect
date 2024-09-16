"use client";

import { useEffect, useState } from "react";
import { DataTableWithFilters } from "../DataTableWithFilters";
import { MentorsColumn } from "../columns/MentorsColumn";
import { getStudents, StudentTableDataType } from "../../action";
import Loading from "@/components/Loading";
import { StudentsColumn } from "../columns/StudentsColumn";

const StudentsDataSection = () => {
  const [data, setData] = useState<StudentTableDataType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await getStudents();

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

  return <DataTableWithFilters columns={StudentsColumn} data={data} />;
};

export default StudentsDataSection;
