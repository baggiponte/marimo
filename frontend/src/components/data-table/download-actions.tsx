/* Copyright 2023 Marimo. All rights reserved. */
import React from "react";
import { Button } from "../ui/button";
import { CaretDownIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "../ui/use-toast";

export interface DownloadActionProps {
  downloadAs: (req: { format: "csv" | "json" }) => Promise<string>;
}

const options = [
  { label: "CSV", format: "csv" },
  { label: "JSON", format: "json" },
] as const;

export const DownloadAs: React.FC<DownloadActionProps> = (props) => {
  const button = (
    <Button size="xs" variant="link">
      Download <CaretDownIcon className="w-3 h-3 ml-1" />
    </Button>
  );

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild={true}>{button}</DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="no-print">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.label}
            onSelect={async () => {
              const downloadUrl = await props
                .downloadAs({
                  format: option.format,
                })
                .catch((error) => {
                  toast({
                    title: "Failed to download",
                    description:
                      "message" in error ? error.message : String(error),
                  });
                });
              if (!downloadUrl) {
                return;
              }
              const link = document.createElement("a");
              link.href = downloadUrl;
              link.setAttribute("download", "download");
              document.body.append(link);
              link.click();
              link.remove();
            }}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
