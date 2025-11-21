
'use client';
import { useState } from 'react';

export default function AddForm() {
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        body: JSON.stringify({ url, code }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg(data.error || 'Error');
      } else {
        setMsg('Created: ' + data.code);
        setUrl('');
        setCode('');
        setTimeout(() => location.reload(), 800);
      }
    } catch (err) {
      setMsg('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="mb-6 space-y-3">
      <div>
        <label className="block text-sm font-medium">Long URL</label>
        <input required value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com/very/long/url" className="mt-1 p-2 border w-full rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Custom code (optional)</label>
        <input value={code} onChange={e=>setCode(e.target.value)} placeholder="abc123" className="mt-1 p-2 border w-full rounded" />
        <p className="text-xs text-gray-500 mt-1">6–8 chars, letters and numbers only.</p>
      </div>
      {msg && <div className="text-sm">{msg}</div>}
      <div>
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
          {loading ? 'Creating...' : 'Create short link'}
        </button>
      </div>
    </form>
  );
}
