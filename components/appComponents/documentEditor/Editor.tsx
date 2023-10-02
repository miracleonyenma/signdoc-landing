"use client";
import React from "react";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-documenteditor";

const Editor = () => {
  let editorObj: DocumentEditorContainerComponent | null;
  const handlesave = () => {
    editorObj?.documentEditor.save("Sample","Docx");
  };
  return (
    <div>
      <button onClick={handlesave} className="mb-5 btn">Save</button>
      <DocumentEditorContainerComponent
        ref={(ins) => (editorObj = ins)}
        height="700"
        enableToolbar={true}
      >
        <Inject services={[Toolbar]} />
      </DocumentEditorContainerComponent>
    </div>
  );
};

export default Editor;
