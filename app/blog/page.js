'use client';
import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Calendar, Tag, Search, ArrowRight, Heart, MessageCircle, Share2, TrendingUp, X, Send, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState(null);
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [likes, setLikes] = useState({});
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [shareMessage, setShareMessage] = useState('');
    const { theme } = useTheme();

    // Fetch blog posts from JSON
    useEffect(() => {
        fetch('/blogs/blogs.json')
            .then(res => res.json())
            .then(data => {
                setBlogPosts(data);
                // Initialize likes from localStorage
                const savedLikes = localStorage.getItem('blogLikes');
                if (savedLikes) {
                    setLikes(JSON.parse(savedLikes));
                }
                // Initialize comments from localStorage
                const savedComments = localStorage.getItem('blogComments');
                if (savedComments) {
                    setComments(JSON.parse(savedComments));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load blogs:', err);
                setLoading(false);
            });
    }, []);

    // Save likes to localStorage
    const handleLike = (blogId) => {
        const newLikes = { ...likes, [blogId]: !likes[blogId] };
        setLikes(newLikes);
        localStorage.setItem('blogLikes', JSON.stringify(newLikes));
    };

    // Add comment
    const handleAddComment = (blogId) => {
        if (!newComment.trim()) return;
        
        const newComments = { ...comments };
        if (!newComments[blogId]) {
            newComments[blogId] = [];
        }
        newComments[blogId].push({
            id: Date.now(),
            text: newComment,
            date: new Date().toLocaleDateString()
        });
        setComments(newComments);
        localStorage.setItem('blogComments', JSON.stringify(newComments));
        setNewComment('');
    };

    // Share to social media
    const handleShare = (platform) => {
        if (!selectedBlog) return;
        
        const url = `${window.location.origin}/blog/${selectedBlog.slug}`;
        const text = `Check out this blog: ${selectedBlog.title}`;
        
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };
        
        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            setShareMessage('Link copied to clipboard!');
            setTimeout(() => setShareMessage(''), 2000);
        } else if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    };

    // Get all unique tags
    const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags))).sort();

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesTag = !selectedTag || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
    });

    if (loading) {
        return (
            <div className={`min-h-screen pt-24 pb-16 px-6 transition-colors duration-500 ${theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
                    : 'bg-gradient-to-br from-slate-50 via-rose-50 to-indigo-50'
                }`}>
                <div className="max-w-6xl mx-auto text-center">
                    <p className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>Loading blogs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-24 pb-16 px-6 transition-colors duration-500 ${theme === 'dark'
                ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
                : 'bg-gradient-to-br from-slate-50 via-rose-50 to-indigo-50'
            }`}>
            {/* Background */}
            <div className={`fixed inset-0 pointer-events-none ${theme === 'dark'
                    ? 'bg-[linear-gradient(rgba(236,72,153,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.02)_1px,transparent_1px)]'
                    : 'bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)]'
                } bg-[size:60px_60px]`} />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fadeInDown ${theme === 'dark'
                            ? 'bg-pink-500/10 border border-pink-500/30 text-pink-400'
                            : 'bg-pink-100 border border-pink-300 text-pink-700'
                        }`}>
                        <BookOpen size={16} />
                        <span>Blog</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp">
                        <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Thoughts & </span>
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Insights
                        </span>
                    </h1>
                    <p className={`text-xl max-w-3xl mx-auto animate-fadeInUp ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`} style={{ animationDelay: '0.2s' }}>
                        Exploring web development, design, and the intersection of technology with real-world impact
                    </p>
                </div>

                {/* Search */}
                <div className="mb-12">
                    <div className={`relative ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-full p-2 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`} size={20} />
                        <input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-12 pr-4 py-3 rounded-full outline-none bg-transparent ${theme === 'dark' ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`}
                        />
                    </div>
                </div>

                {/* All Tags */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedTag
                                    ? `${theme === 'dark' ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`
                                    : `${theme === 'dark' ? 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                                }`}
                        >
                            All Tags
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTag === tag
                                        ? `${theme === 'dark' ? 'bg-pink-500 text-white' : 'bg-pink-500 text-white'}`
                                        : `${theme === 'dark' ? 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Blog Grid */}
                {!selectedBlog ? (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className={`group rounded-2xl overflow-hidden transition-all duration-500 animate-revealUp cursor-pointer ${theme === 'dark'
                                            ? 'bg-slate-800/30 border border-slate-700/50 hover:border-pink-500/50'
                                            : 'bg-white border border-slate-200 hover:border-pink-400 shadow-lg'
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                    onClick={() => setSelectedBlog(post)}
                                >
                                    {/* Featured Image or Gradient */}
                                    <div className={`h-48 bg-gradient-to-br relative overflow-hidden ${post.image ? '' : 'from-pink-500 to-purple-600'}`}>
                                        {post.image ? (
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BookOpen size={48} className="text-white/50" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                                            {post.tags.slice(0, 2).map(tag => (
                                                <span key={tag} className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700'}`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className={`text-lg font-bold mb-2 group-hover:text-pink-500 transition-colors line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                            {post.title}
                                        </h3>
                                        <p className={`text-sm mb-4 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {post.excerpt}
                                        </p>

                                        {/* Meta */}
                                        <div className={`flex items-center gap-4 text-xs mb-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock size={14} />
                                                {Math.ceil(post.content.length * 1.5)} min
                                            </div>
                                        </div>

                                        {/* Engagement */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
                                            <div className="flex gap-2 text-xs">
                                                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>❤️ {likes[post.id] ? 1 : 0}</span>
                                                <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}>💬 {(comments[post.id] || []).length}</span>
                                            </div>
                                            <ArrowRight size={16} className={`${theme === 'dark' ? 'text-pink-400' : 'text-pink-600'} group-hover:translate-x-1 transition-transform`} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20">
                                <BookOpen size={64} className={theme === 'dark' ? 'text-slate-700 mx-auto mb-4' : 'text-slate-300 mx-auto mb-4'} />
                                <p className={theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}>No blogs found. Try a different search.</p>
                            </div>
                        )}
                    </>
                ) : (
                    /* Full Blog View */
                    <div className={`rounded-3xl overflow-hidden animate-scaleIn max-w-4xl mx-auto ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
                        {/* Featured Image */}
                        {selectedBlog.image && (
                            <div className="h-96 bg-slate-700 overflow-hidden">
                                <img
                                    src={selectedBlog.image}
                                    alt={selectedBlog.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-8 md:p-12">
                            {/* Header */}
                            <button
                                onClick={() => setSelectedBlog(null)}
                                className={`mb-6 px-4 py-2 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                ← Back to All Posts
                            </button>

                            {/* Title and Meta */}
                            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {selectedBlog.title}
                            </h1>

                            <div className={`flex flex-wrap items-center gap-4 mb-8 pb-8 border-b ${theme === 'dark' ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {selectedBlog.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={16} />
                                    {Math.ceil(selectedBlog.content.length * 1.5)} min read
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>{selectedBlog.author}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedBlog.tags.map(tag => (
                                    <span key={tag} className={`text-xs px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700'}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Blog Content */}
                            <div className={`prose prose-invert max-w-none mb-12 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                {selectedBlog.content.map((paragraph, idx) => (
                                    <p key={idx} className="mb-6 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            {/* Engagement Section */}
                            <div className={`border-t border-b py-8 mb-8 ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <button
                                        onClick={() => handleLike(selectedBlog.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${likes[selectedBlog.id]
                                                ? 'bg-pink-500 text-white'
                                                : theme === 'dark'
                                                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        <Heart size={18} fill={likes[selectedBlog.id] ? 'currentColor' : 'none'} />
                                        Like
                                    </button>
                                    <button
                                        onClick={() => handleShare('copy')}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${theme === 'dark'
                                                ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        <Copy size={18} />
                                        Copy Link
                                    </button>
                                </div>

                                {/* Social Share */}
                                <div className="mb-6">
                                    <p className={`text-sm font-medium mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                                        Share on Social Media
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleShare('facebook')}
                                            className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-slate-800 text-blue-400 hover:bg-blue-500/20' : 'bg-slate-100 text-blue-600 hover:bg-blue-50'}`}
                                        >
                                            <Facebook size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleShare('twitter')}
                                            className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-slate-800 text-sky-400 hover:bg-sky-500/20' : 'bg-slate-100 text-sky-600 hover:bg-sky-50'}`}
                                        >
                                            <Twitter size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleShare('linkedin')}
                                            className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-slate-800 text-blue-500 hover:bg-blue-500/20' : 'bg-slate-100 text-blue-700 hover:bg-blue-50'}`}
                                        >
                                            <Linkedin size={20} />
                                        </button>
                                    </div>
                                    {shareMessage && (
                                        <p className="text-sm text-green-500 mt-2">{shareMessage}</p>
                                    )}
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="mb-8">
                                <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    Comments ({(comments[selectedBlog.id] || []).length})
                                </h3>

                                {/* Add Comment */}
                                <div className="mb-8">
                                    <div className={`flex gap-3 mb-4 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'} p-4 rounded-lg`}>
                                        <input
                                            type="text"
                                            placeholder="Add a comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddComment(selectedBlog.id)}
                                            className={`flex-1 outline-none rounded px-3 py-2 text-sm ${theme === 'dark' ? 'bg-slate-700 text-white placeholder-slate-500' : 'bg-white text-slate-900 placeholder-slate-400'}`}
                                        />
                                        <button
                                            onClick={() => handleAddComment(selectedBlog.id)}
                                            className="p-2 rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg transition-shadow"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Display Comments */}
                                <div className="space-y-4">
                                    {(comments[selectedBlog.id] || []).map(comment => (
                                        <div key={comment.id} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                                            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                                                {comment.text}
                                            </p>
                                            <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                                                {comment.date}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
