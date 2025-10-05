"use client";
import { useState } from 'react';
import QuillEditor from '@/components/QuillEditor';

export default function AdminPostForm({ onCreated }: { onCreated?: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>();
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: form });
    if (!res.ok) throw new Error('Upload failed');
    const j = await res.json();
    return j.url as string;
  };

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const url = await uploadFile(f);
      setCoverImageUrl(url);
    } catch (e: any) {
      setError(e.message || 'Upload failed');
    }
  };

  const submit = async () => {
    setSaving(true);
    setError(null);
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, content, coverImageUrl, status })
    });
    setSaving(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || 'Failed to create post');
      return;
    }
    setTitle(""); setDescription(""); setContent(""); setCoverImageUrl(undefined); setStatus('draft');
    onCreated?.();
  };

  return (
    <div className="card">
      <h3>Create Post</h3>
      <label>Title</label>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Post title" />
      <label>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short summary" />
      <label>Content</label>
      <QuillEditor value={content} onChange={setContent} />
      <label>Cover image</label>
      <input type="file" accept="image/*" onChange={onSelectFile} />
      {coverImageUrl && <p>Uploaded: {coverImageUrl}</p>}
      <label>Status</label>
      <select value={status} onChange={e => setStatus(e.target.value as any)}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <button onClick={submit} disabled={saving}>{saving ? 'Saving...' : 'Save Post'}</button>
    </div>
  );
}
