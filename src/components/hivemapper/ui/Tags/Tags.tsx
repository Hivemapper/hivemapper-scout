import React, { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@components/shadcn/ToggleGroup";

export interface TagsProps {
  tags: string[];
  onChange?: (tags: string[]) => void;
}

const Tags: React.FC<TagsProps> = ({ tags, onChange }) => {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const uniques = [...new Set(tags)];

  useEffect(() => {
    onChange(activeTags);
  }, [activeTags]);

  return (
    <ToggleGroup type="multiple">
      {uniques.map((tag) => (
        <ToggleGroupItem
          value={tag}
          aria-label="Toggle tag"
          onClick={() =>
            setActiveTags((activeTags) => {
              if (activeTags.includes(tag)) {
                return activeTags.filter((activeTag) => activeTag !== tag);
              } else {
                return [...activeTags, tag];
              }
            })
          }
        >
          {tag}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default Tags;
