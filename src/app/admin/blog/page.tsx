'use client'

import { useEffect, useState } from 'react'
import { Plus, RefreshCw, Edit2, Trash2, Eye, EyeOff, X, CheckCircle } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  category: string
  published: boolean
  created_at: string
}

const categories = ['Finance', 'Marketing', 'Design', 'VFX', 'Strategy']

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Finance',
    published: false,
  })

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/blog', {
        headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''}` },
      })
      const data = await res.json()
      setPosts(data.data ?? [])
    } catch {
      //
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  const autoSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 60)

  const handleTitleChange = (v: string) => {
    setForm((f) => ({ ...f, title: v, slug: autoSlug(v) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''}`,
        },
        body: JSON.stringify(form),
      })
      setSaved(true)
      setTimeout(() => { setSaved(false); setShowForm(false); fetchPosts() }, 1500)
    } catch {
      //
    }
  }

  const togglePublish = async (post: Post) => {
    await fetch('/api/blog', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''}`,
      },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    })
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, published: !p.published } : p)))
  }

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    await fetch(`/api/blog?id=${id}`, {
      method: 'DELETE',
      headers: { authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_SECRET || ''}` },
    })
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading font-bold text-white text-2xl mb-1">Blog Posts</h1>
          <p className="text-white/40 text-sm">{posts.length} posts</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchPosts}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.08] text-white/50 text-sm hover:text-white hover:border-white/20 transition-all"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary text-sm py-2 px-4"
          >
            <Plus size={15} />
            New Post
          </button>
        </div>
      </div>

      {/* New post form */}
      {showForm && (
        <div className="rounded-xl border border-white/[0.10] bg-white/[0.03] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-semibold text-white text-lg">New Post</h2>
            <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Title *</label>
                <input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="input-premium"
                  placeholder="Post title"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  className="input-premium font-mono text-sm"
                  placeholder="url-slug"
                />
              </div>
              <div>
                <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="input-premium"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#030712]">{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setForm((f) => ({ ...f, published: !f.published }))}
                    className={`w-10 h-5 rounded-full transition-colors ${form.published ? 'bg-orange-500' : 'bg-white/10'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${form.published ? 'translate-x-5 ml-0.5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-white/50 text-sm">Publish immediately</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Excerpt *</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="input-premium resize-none"
                rows={2}
                placeholder="Short description shown in listings..."
                required
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Content *</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                className="input-premium resize-none font-mono text-sm"
                rows={10}
                placeholder="Write your post content here. Use **bold** for bold and ## for headings..."
                required
              />
            </div>

            <div className="flex items-center gap-3">
              <button type="submit" className="btn-primary text-sm py-2.5 px-6">
                {saved ? <><CheckCircle size={15} /> Saved!</> : 'Create Post'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm py-2.5 px-5">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Posts list */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/30 text-sm mb-4">No blog posts yet</p>
            <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2 px-5">
              <Plus size={14} /> Write First Post
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {posts.map((post) => (
              <div key={post.id} className="px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white/80 text-sm font-medium truncate">{post.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs bg-white/[0.05] text-white/40">{post.category}</span>
                    <span className="text-white/25 text-xs font-mono">/{post.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={post.published ? 'badge-confirmed' : 'badge-pending'}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <button
                    onClick={() => togglePublish(post)}
                    className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
                    title={post.published ? 'Unpublish' : 'Publish'}
                  >
                    {post.published ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-red-400 hover:border-red-500/20 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
