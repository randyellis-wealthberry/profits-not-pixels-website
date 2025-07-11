import * as React from "react";
import { Hash } from "lucide-react";

interface TagProps {
  slug: string;
  name: string;
  asChild?: boolean;
  children?: React.ReactNode;
}

export const Tag = ({ slug, name, asChild, children }: TagProps) => {
  if (asChild && children) return children;
  return (
    <a
      href={`/s/${slug}`}
      className="inline-flex px-[4px] py-[2px] gap-[2px] items-center border rounded-md transition-colors duration-200 hover:border-primary group"
    >
      <span className="bg-muted p-[2px] text-foreground/90 rounded group-hover:bg-border">
        <Hash size={12} />
      </span>
      <span>{name}</span>
    </a>
  );
};
