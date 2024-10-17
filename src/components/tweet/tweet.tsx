"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useLikeTweet } from "@/lib/apis";
import { cn } from "@/lib/utils";

interface TweetProps {
  //   author: string;
  id: string;
  username: string;
  content: string;
  likes: number;
  is_liked: boolean;
  retweets: number;
}

export function Tweet({
  //   author,
  id,
  username,
  content,
  likes: initialLikes,
  is_liked: initialIsLiked,
  retweets: initialRetweets,
}: TweetProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [retweets, setRetweets] = useState(initialRetweets);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const { mutateAsync: likeTweet, isPending: isLiking } = useLikeTweet();

  const handleLike = async () => {
    if (isLiked) {
      await likeTweet({ tweetId: id, like: false });
      setLikes(likes - 1);
    } else {
      await likeTweet({ tweetId: id, like: true });
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src={`/placeholder-avatar.jpg`} alt={`@${username}`} />
          <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center space-x-2">
            {/* <span className="font-bold">{author}</span> */}
            <span className="text-gray-500">@{username}</span>
          </div>
          <p className="mt-1">{content}</p>
          <div className="flex space-x-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(isLiked && "text-red-500")}
            >
              <Heart
                className={cn("w-4 h-4 mr-1", isLiked && "fill-current")}
              />
              {likes}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRetweets(retweets + 1)}
            >
              <Repeat2 className="w-4 h-4 mr-1" />
              {retweets}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-1" />
              Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
