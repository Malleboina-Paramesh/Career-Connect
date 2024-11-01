"use client";
import React from "react";
import { Button } from "@local/ui/components/button";
import { HeartIcon } from "lucide-react";
import { BsHeartFill, BsInfoCircle } from "react-icons/bs";
import { toast } from "sonner";
import { faviorateToCompany } from "../../action";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@local/ui/components/tooltip";

interface FaviorateButtonProps {
  id: string;
  isFaviorate: boolean;
}

const FaviorateButton = ({ id, isFaviorate }: FaviorateButtonProps) => {
  const subscribe = async () => {
    try {
      toast.loading(
        isFaviorate
          ? "removing from your favorites list"
          : "adding to your favorites list",
        {
          id: "faviorate",
        }
      );
      const response = await faviorateToCompany(id);
      if (response.error) {
        toast.error(response.error, {
          id: "faviorate",
        });
        return;
      }
      toast.success(
        isFaviorate
          ? "removed from your favorites list"
          : "added to your favorites list",
        {
          id: "faviorate",
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", {
        id: "faviorate",
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Button
            variant="outline"
            size="sm"
            onClick={subscribe}
            className="relative flex items-center"
          >
            {!isFaviorate ? (
              <HeartIcon className="mr-2" />
            ) : (
              <BsHeartFill className="mr-2" />
            )}
            {isFaviorate ? "Favorited" : "Favorite"}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isFaviorate ? (
            <p>you have already favorited this company</p>
          ) : (
            <p>subscribe to get notifications or opportunities.</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FaviorateButton;
