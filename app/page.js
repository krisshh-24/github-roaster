'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from 'next/link';


export default function Home() {
  const [userGithub, setUserGithub] = useState('');
  const [influencer, setInfluencer] = useState('torvalds');
  const [customInfluencer, setCustomInfluencer] = useState('');
  const [roast, setRoast] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to handle the roasting process
  const handleRoast = async () => {
    setLoading(true);
    try {
     
      const userUsername = userGithub.split('/').pop(); // Extracts 'username' from 'https://github.com/username'
      const compareUsername = influencer === 'custom' ? customInfluencer : influencer; // Use custom or pre-defined influencer

      // Send request to backend API with just the usernames (not full URLs)
      const res = await fetch('/api/roast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: userUsername,   // Ensure the user is only the username
          compare: compareUsername,  // Ensure the compare influencer is only the username
        }),
      });

      const data = await res.json();
      setRoast(data.roast);
    } catch (err) {
      setRoast("Error roasting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <div className="max-w-2xl mx-auto p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1
            className="text-5xl font-bold bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent mt-[100px]"
            style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif' }}
          >
            GITHUB UNFILTERED
          </h1>
          <p className="text-gray-400 text-lg">
            Compare your GitHub profile with other people but with a twist....
          </p>
        </div>

        <div className="space-y-6 bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700">
          {/* User GitHub Profile Input */}
          <div className="space-y-2">
            <Label className="text-gray-300">Your GitHub Profile Link</Label>
            <Input
              placeholder="https://github.com/yourusername"
              value={userGithub}
              onChange={(e) => setUserGithub(e.target.value)}
              className="bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500"
            />
          </div>

          {/* Influencer Selection */}
          <div className="space-y-2">
            <Label className="text-gray-300">Select Opponent</Label>
            <Select value={influencer} onValueChange={setInfluencer}>
              <SelectTrigger className="w-full bg-gray-900 border-gray-700 text-gray-100">
                <SelectValue placeholder="Influencer" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="torvalds" className="text-gray-100 hover:bg-gray-800">Linus Torvalds</SelectItem>
                <SelectItem value="richard-stallman" className="text-gray-100 hover:bg-gray-800">Richard Stallman</SelectItem>
                <SelectItem value="custom" className="text-gray-100 hover:bg-gray-800">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Custom Influencer Input */}
          {influencer === 'custom' && (
            <div className="space-y-2">
              <Label className="text-gray-300">Enter Custom GitHub Username</Label>
              <Input
                placeholder="influencer-username"
                value={customInfluencer}
                onChange={(e) => setCustomInfluencer(e.target.value)}
                className="bg-gray-900 border-gray-700 text-gray-100 placeholder:text-gray-500"
              />
            </div>
          )}

          {/* Roast Button */}
          <Button 
            onClick={handleRoast} 
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 via-red-400 to-red-500 hover:scale-105  from-red-600 hover:to-red-600 text-white font-semibold py-3"
          >
            {loading ? 'Comparing...' : 'Compare '}
          </Button>
        </div>

        {/* Display Roast Response */}
        {roast && (
          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-red-500 bg-clip-text text-transparent">
                🔥 The Roast
              </h2>
              <p className="text-gray-300 leading-relaxed">{roast}</p>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="ml-10 mt-8">
        <HoverCard>
          <HoverCardTrigger className="text-gray-400 hover:text-gray-200 transition-colors duration-200 cursor-pointer inline-block">
            Made with ❤️ by <br />
            <span>Krish</span>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-gray-800/90 border-gray-700 backdrop-blur-sm" side="top" align="start">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-200">GitHub Repository</h4>
              <a 
                href="https://github.com/krishsagar24/github-roaster" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                github.com/krishsagar24/github-roaster
              </a>
              <div className="pt-2 border-t border-gray-700">
                <p className="text-xs text-gray-400">
                  Warning: May cause existential crisis for your code
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </main>
  );
}
