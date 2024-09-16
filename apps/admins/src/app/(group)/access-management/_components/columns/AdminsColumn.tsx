"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RiArrowUpDownFill } from "react-icons/ri";
import { AdminTableDataType } from "../../action";
export const AdminsColumn: ColumnDef<AdminTableDataType[0]>[] = [
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
    accessorKey: "adminType",
    header: "Admin Role",
    cell: ({ row: { original } }) => {
      return original.adminType;
    },
  },
  {
    accessorKey: "adminName",
    header: "Admin Name",
    cell: ({ row: { original } }) => {
      return original.createdByName;
    },
  },
  {
    accessorKey: "adminEmail",
    header: "Admin Email",
    cell: ({ row: { original } }) => {
      return original.createdByEmail;
    },
  },

  {
    id: "actions",
    cell: ({ row: { original } }) => {
      return "actions";
    },
  },
];
