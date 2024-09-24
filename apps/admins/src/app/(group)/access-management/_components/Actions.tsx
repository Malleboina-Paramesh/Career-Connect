"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@local/ui/components/dropdown-menu";
import Link from "next/link";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toast } from "sonner";

const Actions = ({ id }: { id: string }) => {
  const pending = () => {
    toast.warning("Edit is not implemented yet");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiDotsVerticalRounded className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={pending}>Edit</DropdownMenuItem>
        <Link href={`/profile/${id}`}>
          {/*TODO: This is a link to the profile page*/}
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <Link href={`/message/${id}`}>
          {/*TODO: This is a link to the profile page*/}
          <DropdownMenuItem>Message</DropdownMenuItem>
        </Link>
        <DropdownMenuItem>Change Role (TODO)</DropdownMenuItem>
        <DropdownMenuItem onClick={pending}>Remove </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
