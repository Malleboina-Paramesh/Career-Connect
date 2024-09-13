"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@local/ui/components/breadcrumb";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const OpportunitiesHistory = () => {
  let appendingPath = "";
  const path = usePathname().split("/");
  path.shift();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((item, i) => {
          appendingPath += "/" + item;
          return (
            <BreadcrumbItem key={i}>
              {path.length !== i + 1 ? (
                <>
                  <BreadcrumbLink>
                    <Link href={appendingPath}>{item}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </>
              ) : (
                <BreadcrumbPage>{item}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default OpportunitiesHistory;
