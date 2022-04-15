import { default as React, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import List from '@editorjs/list';
import LinkTool from '@editorjs/link';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';

const DEFAULT_INITIAL_DATA = () => {
  return {
    time: new Date().getTime(),
    blocks: [
      {
        type: 'header',
        data: {
          text: 'Write your note here...',
          level: 1,
        },
      },
    ],
  };
};
const EDITTOR_HOLDER_ID = 'editorjs';

const Editor = ({ id, value, onChange }) => {
  const ejInstance = useRef();
  // const [editorData, setEditorData] = useState(
  //   JSON.parse(localStorage.blocks) || DEFAULT_INITIAL_DATA
  // );

  // useEffect(() => {
  //   localStorage.setItem('blocks', JSON.stringify(editorData));
  // }, [editorData]);

  // This will run only once
  useEffect(() => {
    if (ejInstance.current) {
      ejInstance.current.destroy();
      ejInstance.current = null;
    }
    initEditor();

    return () => {
      ejInstance.current.destroy();
      ejInstance.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  console.log({ value });
  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: 'ERROR',
      data: { blocks: value },
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        let content = await editor.saver.save();
        // Put your logic here to save this data to your DB
        // setEditorData(content);
        onChange(content.blocks);
        // console.log(content);
      },
      autofocus: true,
      tools: {
        header: Header,
        embed: Embed,
        table: Table,
        list: List,
        linkTool: LinkTool,
        quote: Quote,
        marker: Marker,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
      },
    });
  };

  return (
    <React.Fragment>
      <div id={EDITTOR_HOLDER_ID}></div>
    </React.Fragment>
  );
};

export default Editor;
