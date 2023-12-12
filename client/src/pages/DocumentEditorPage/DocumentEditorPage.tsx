import Quill, { DeltaOperation, Sources } from "quill";
// import * as Quill from "quill";
import "quill/dist/quill.snow.css";
import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
// import { Header } from "../../components/Header";

type WrapperRefCallback = (
  wrapper: HTMLDivElement | null
) => (() => void) | undefined;

type QuillEditor = Quill | null;
const SAVE_INTERVAL_MS = 5000;
const TOOLBAR_OPTIONS: any = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function DocumentEditorPage() {
  const { id: documentId } = useParams<{ id: string }>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<QuillEditor>(null);
  // const [docName, setDocName] = useState<string>("");
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;
    socket.once("load-document", (document: any) => {
      // setDocName(document.name);
      quill.setContents(document.data);
      quill.enable();
    });
    socket.emit("get-document", documentId, localStorage.getItem("token"));
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler: any = (delta: any) => {
      quill.updateContents(delta);
    };

    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler: any = (
      delta: DeltaOperation,
      _oldDelta: DeltaOperation,
      source: Sources
    ) => {
      if (source !== "user") return;
      socket?.emit("send-changes", delta);
    };

    quill?.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback<WrapperRefCallback>((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
    return () => {
      if (wrapper) {
        wrapper.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      {/* <Header title={`Document | ${docName}`} /> */}
      <div className="container" ref={wrapperRef}>
        TextEditor
      </div>
    </>
  );
}
