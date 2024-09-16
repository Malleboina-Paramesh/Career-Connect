"use client";

import { useEffect, useState } from "react";
import { DataTableWithFilters } from "../DataTableWithFilters";
import { AdminTableDataType, getAdmins } from "../../action";
import Loading from "@/components/Loading";
import { AdminsColumn } from "../columns/AdminsColumn";

const AdminsDataSection = () => {
  const [data, setData] = useState<AdminTableDataType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const res = await getAdmins();

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

  return <DataTableWithFilters columns={AdminsColumn} data={data} />;
};

export default AdminsDataSection;
