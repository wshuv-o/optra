'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { FaRegHandshake } from 'react-icons/fa';
import ChatCard from '@/components/Chat/ChatCard';
import { RiRepeatLine, RiShareForwardLine } from 'react-icons/ri';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import remarkGfm from 'remark-gfm'; // Import remark-gfm for GitHub Flavored Markdown
import rehypeRaw from 'rehype-raw'; // Optional: If your markdown contains raw HTML

const Community = () => {
  const [postText, setPostText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<any[]>([]); // Store pitch decks as posts

  // Fetch pitch deck data
  useEffect(() => {
    const fetchPitchDecks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ab/1/pitchdecks');
        const pitchDecks = response.data.map((deck: any) => ({
          id: deck.id,
          user: 'Pan Feng Shui', // Default user name
          time: deck.pitch_date || 'Unknown',
          content: deck.valuation, // Can use valuation or any other data for content
          markup: deck.markup, // Markdown content from the pitch deck
          funding: deck.funding, // Extract funding amount to highlight
          images: [], // Add any images if necessary
          comments: [],
          likes: 0,
        }));
        setPosts(pitchDecks); // Store the fetched pitch decks
      } catch (error) {
        console.error('Error fetching pitch decks:', error);
      }
    };

    fetchPitchDecks();
  }, []);

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add comment to a post
  const addComment = (postId: any, commentText: any) => {
    if (commentText.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, { id: Date.now(), user: 'Current User', content: commentText, likes: 0 }],
          };
        }
        return post;
      }));
    }
  };

  const handlePostSubmit = () => {
    if (postText.trim() !== '') {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          user: 'New User',
          time: 'Just Now',
          content: postText,
          images: [],
          comments: [],
          likes: 0,
        },
      ]);
      setPostText('');
    }
  };

  // Function to highlight funding amount
  const highlightFunding = (markdown: string) => {
    const fundingPattern = /(\$[0-9,]+(?:\.\d{1,2})?)/g; // Simple regex to find funding amount
    return markdown.replace(fundingPattern, '<span class="highlight-funding">$1</span>'); // Wrap funding in span for styling
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-2">
      {/* Main Content */}
      <div className="col-span-9  max-h-screen">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <input
            type="text"
            placeholder="Search posts or pitch decks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Post Something */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <textarea
            placeholder="What’s on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-300"
          ></textarea>
          <button
            onClick={handlePostSubmit}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
        </div>

        {/* Posts */}
        <div className="">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-1 rounded-lg shadow-md mb-6">
              <div className="flex items-start gap-3">
                <Image src="/images/user/user-03.png" width={40} height={40} className="rounded-full" alt="user" />
                <div>
                  <p className="text-sm font-medium">{post.user}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                  <p className="text-sm mt-2">{post.content}</p>
                  
                  {/* Render pitch deck content as markdown */}
                  {post.markup && (
                    <div className="mt-4">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]} // Allow raw HTML if needed
                      >
                        {highlightFunding(post.markup)} 
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>

              {/* Post Action Buttons */}
              <div className="flex justify-between items-center mt-4 text-gray-600 border-t pt-3">
                <button className="flex items-center gap-1">
                  <AiOutlineLike /> Like
                </button>
                <button className="flex items-center gap-1">
                  <AiOutlineComment /> Comment
                </button>
                <button className="flex items-center gap-1">
                  <RiRepeatLine /> Interested
                </button>
              </div>

              {/* Comments Section */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Comments</h4>
                {post.comments.map(comment => (
                  <div key={comment.id} className="flex items-start gap-3 mb-2">
                    <Image src="/images/user/user-02.png" width={30} height={30} className="rounded-full" alt="comment-user" />
                    <div>
                      <p className="text-sm font-medium">{comment.user}</p>
                      <p className="text-xs text-gray-500">{comment.content}</p>
                      <button className="text-xs text-blue-500 hover:underline">
                        Like ({comment.likes})
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3 mt-3">
                  <Image src="/images/user/user-01.png" width={30} height={30} className="rounded-full" alt="user" />
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-grow border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                    onKeyDown={(e: any) => {
                      if (e.key === 'Enter') {
                        addComment(post.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-span-3  max-h-screen hidden lg:block">
        {/* Chat List */}
        <ChatCard />

        <div className="bg-white p-4 my-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4">Lobby</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Image src="/images/user/user-03.png" width={40} height={40} className="rounded-full" alt="user" />
              <div>
                <p className="text-sm font-medium">Pan Feng Shui</p>
                <p className="text-xs text-gray-500">12 April at 02:12 PM</p>
                <p className="text-sm">One of the perks of working...</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Image src="/images/user/user-02.png" width={40} height={40} className="rounded-full" alt="user" />
              <div>
                <p className="text-sm font-medium">Another User</p>
                <p className="text-xs text-gray-500">12 April at 01:00 PM</p>
                <p className="text-sm">Shared a new update...</p>
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Write your messages"
            className="mt-4 w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Community;
