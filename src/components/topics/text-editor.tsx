import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { ko } from "@blocknote/core/locales";
import "@blocknote/mantine/style.css";
import type { Block } from "@blocknote/core";

// Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
async function uploadFile(file: File) {
    const body = new FormData();
    body.append("file", file);

    const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: body,
    });
    return (await ret.json()).data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
}

interface Props {
    setContent: (blocks: Block[]) => void; // => New-Topic 페이지 컴포넌트의 content를 재할당하는 useState의 setContent
}

function TextEditor({ setContent }: Props) {
    // Creates a new editor instance.
    const locale = ko;
    const editor = useCreateBlockNote({
        dictionary: {
            ...locale,
            placeholders: {
                ...locale.placeholders,
                emptyDocument: "텍스트를 입력하거나 '/' 를 눌러 명령어를 실행하세요.",
            },
        },
        uploadFile,
    });

    // Renders the editor instance using a React component.
    return (
        <BlockNoteView
            editor={editor}
            onChange={() => {
                // Saves the document JSON to state.
                setContent(editor.document);
            }}
        />
    );
}

export { TextEditor };
