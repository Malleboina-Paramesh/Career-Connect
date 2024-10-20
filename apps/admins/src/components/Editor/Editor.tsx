"use client";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

interface EditorProps {
  content: any;
  setContent: (content: any) => void;
}

export default function Editor({ content, setContent }: EditorProps) {
  const { theme } = useTheme();

  const editor = useCreateBlockNote({
    animations: true,
    initialContent: content,
  });

  return (
    <BlockNoteView
      editor={editor}
      theme={theme === "dark" ? "dark" : "light"}
      onChange={() => setContent(editor.document)}
    />
  );
}
