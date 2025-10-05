"use client";
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function QuillEditor({ value, onChange }: Props) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'clean']
    ]
  }), []);

  return <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} />;
}
