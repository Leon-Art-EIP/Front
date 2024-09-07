"use client";

import React, { useCallback, useMemo, useState } from "react";
import Fetcher from "../../components/fetch/Fetcher";
import SimpleMdeReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button } from "../../components/lib";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface IAboutWrapperProps {
  title: string;
  description: string;
  myProfile: boolean;
}

export default function AboutWrapper(props: IAboutWrapperProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>(props.description || "");
  const [nbFetchs, setNbFetchs] = useState(0);
  const [ok, setOk] = useState(0);
  const [editAboutText, setEditAboutText] = useState(false);

  // Generate safe HTML to display the bio using Markdown
  const safeHtml = useMemo(() => {
    const rawHtml = marked(inputValue || "");
    const sanitizedHtml = typeof rawHtml === "string" ? DOMPurify.sanitize(rawHtml) : "";
    return sanitizedHtml;
  }, [inputValue]);

  const handleOnModify = async () => {
    setNbFetchs(nbFetchs + 1);
    setEditAboutText(false);
    setInputValue(inputValue);
  };

  const handleOk = () => {
    setOk(ok + 1);
  };

  const handleEditAboutText = () => {
    setEditAboutText(!editAboutText);
  };

  const onChangeAboutText = useCallback((value: string) => {
    setInputValue(value);
  }, []);

  // Options for the Markdown editor
  const options = useMemo(
    () => ({
      spellChecker: true,
      toolbar: [
        "bold",
        "italic",
        "strikethrough",
        "|",
        "heading",
        "|",
        "quote",
        "|",
        "unordered-list",
        "ordered-list",
        "|",
        "code",
        "horizontal-rule",
        "|",
        "preview",
        "|",
        "guide",
      ] as const,
    }),
    []
  );

  return (
    <>
      <Fetcher
        nbFetchs={nbFetchs}
        handleOk={handleOk}
        method="POST"
        route="/api/user/profile/bio"
        successStr="La description a été modifiée avec succès"
        body={JSON.stringify({ biography: inputValue })}
      />

      {/* Display safe HTML when not editing */}
      {!editAboutText && (
        <div className="prose prose-sm">
          <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
        </div>
      )}

      {/* Show the edit button if it's the user's profile and not in edit mode */}
      {props.myProfile && !editAboutText && (
        <Button color="danger" type="button" className="self-start" onClick={handleEditAboutText}>
          Modifier
        </Button>
      )}

      {/* Show the Markdown editor if in edit mode */}
      {props.myProfile && editAboutText && (
        <>
          <SimpleMdeReact options={options} value={inputValue} onChange={onChangeAboutText} />
          <Button color="primary" type="button" onClick={handleOnModify} className="self-start">
            Enregistrer les modifications
          </Button>
        </>
      )}
    </>
  );
}
