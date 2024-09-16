"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownFill } from "react-icons/ri";
import { StudentTableDataType } from "../../action";
export const StudentsColumn: ColumnDef<StudentTableDataType[0]>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <RiArrowUpDownFill className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },

  {
    accessorKey: "adminName",
    header: "Admin Name",
    cell: ({ row: { original } }) => {
      return original.adminName;
    },
  },
  {
    accessorKey: "adminEmail",
    header: "Admin Email",
    cell: ({ row: { original } }) => {
      return original.adminEmail;
    },
  },

  {
    id: "actions",
    cell: ({ row: { original } }) => {
      return "actions";
    },
  },
];
