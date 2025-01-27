'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiOutlineSave } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import ChatCard from '@/components/Chat/ChatCard';

const Community = () => {
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Pan Feng Shui',
      time: '12 April at 02:12 PM',
      content: "One of the perks of working in an international company is sharing knowledge with your colleagues.",
      images: ['/images/workspace1.jpg', '/images/workspace2.jpg'],
      comments: 25,
      likes: 120000,
      shares: 231,
      saves: 12,
    },
    {
      id: 1,
      user: 'Pan Feng Shui',
      time: '12 April at 02:12 PM',
      content: "One of the perks of working in an international company is sharing knowledge with your colleagues.",
      images: ['/images/cards/cards-02.png', '/images/cards/cards-01.png'],
      comments: 25,
      likes: 120000,
      shares: 231,
      saves: 12,
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
          comments: 0,
          likes: 0,
          shares: 0,
          saves: 0,
        },
      ]);
      setPostText('');
    }
  };

  return (
    <DefaultLayout>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">

      {/* Main Content */}
      <div className="col-span-9">
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
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md mb-6">
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
            <div className="flex items-center gap-4 mt-4 text-gray-600">
              <button className="flex items-center gap-1">
                <AiOutlineComment /> {post.comments} Comments
              </button>
              <button className="flex items-center gap-1">
                <AiOutlineLike /> {post.likes} Likes
              </button>
              <button className="flex items-center gap-1">
                <AiOutlineShareAlt /> {post.shares} Shares
              </button>
              <button className="flex items-center gap-1">
                <AiOutlineSave /> {post.saves} Saved
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="col-span-3 hidden lg:block">
        {/* Profile Preview */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center gap-3">
            <Image src="/images/user/user-01.png" width={50} height={50} className="rounded-full" alt="profile" />
            <div>
              <p className="font-medium">Amma Yoga Prosetya</p>
              <p className="text-sm text-gray-500">UI/UX Designer</p>
            </div>
          </div>
        </div>

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
