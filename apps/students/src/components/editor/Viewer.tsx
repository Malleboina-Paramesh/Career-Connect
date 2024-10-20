"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

interface ViewerProps {
  content: any;
}

export default function Viewer({ content }: ViewerProps) {
  const editor = useCreateBlockNote({
    initialContent: content,
  });

  const { theme } = useTheme();

  return (
    <BlockNoteView
      editor={editor}
      editable={false}
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}
