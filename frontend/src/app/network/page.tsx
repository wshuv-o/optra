'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineLike, AiOutlineComment } from 'react-icons/ai';
import { MdOutlineMeetingRoom } from 'react-icons/md';
import { FaRegHandshake } from 'react-icons/fa';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import ChatCard from '@/components/Chat/ChatCard';
import { RiRepeatLine, RiShareForwardLine } from 'react-icons/ri';

const Community = () => {
  const [postText, setPostText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Pan Feng Shui',
      time: '12 April at 02:12 PM',
      content: "One of the perks of working in an international company is sharing knowledge with your colleagues.",
      images: ['/images/workspace1.jpg', '/images/workspace2.jpg'],
      comments: [
        { id: 1, user: 'John Doe', content: 'This is amazing!', likes: 5 },
      ],
      likes: 120000,
    },
    {
      id: 2,
      user: 'Pan Feng Shui',
      time: '12 April at 02:12 PM',
      content: "One of the perks of working in an international company is sharing knowledge with your colleagues.",
      images: ['/images/cards/cards-02.png', '/images/cards/cards-01.png'],
      comments: [],
      likes: 120000,
    },
  ]);

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

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-2 ">

        {/* Main Content */}
        <div className="col-span-9 overflow-y-auto max-h-screen">
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
              <div key={post.id} className="bg-white p-1 rounded-lg shadow-md mb-6 ">
                <div className="flex items-start gap-3">
                  <Image src="/images/user/user-03.png" width={40} height={40} className="rounded-full" alt="user" />
                  <div>
                    <p className="text-sm font-medium">{post.user}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                    <p className="text-sm mt-2">{post.content}</p>
                    {post.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        {post.images.map((image, idx) => (
                          <Image key={idx} src={image} width={200} height={150} className="rounded-lg" alt="workspace" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
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
        <div className="col-span-3 overflow-y-auto max-h-screen hidden lg:block">

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
    </DefaultLayout>
  );
};

export default Community;
