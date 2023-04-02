import React, { useCallback, useEffect, useState, ChangeEvent, FormEvent } from 'react';

interface Props {
  defaultContent: any[];

  onChange: (content: any[]) => void;
}

export function ContentEditor(props: Props) {
  const { defaultContent, onChange } = props;

  const [content, setContent] = useState(JSON.stringify(defaultContent, null, 2));

  useEffect(() => {
    setContent(JSON.stringify(defaultContent, null, 2));
  }, [defaultContent]);

  const contentChangeHandler = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  }, []);

  const contentReadyHandler = useCallback((event: FormEvent) => {
    event.preventDefault();
    const parsedContent = JSON.parse(content);
    onChange(parsedContent);
  }, [content, onChange]);

  return (
    <form onSubmit={contentReadyHandler}>
      <textarea
        style={{ display: 'block', width: 800 }}
        rows={20}
        value={content}
        onChange={contentChangeHandler}
      />
      <button>Ready</button>
    </form>
  );
}
