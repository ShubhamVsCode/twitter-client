"use client";

import { Tweet } from "@/components/tweet/tweet";
import { useTweets } from "@/lib/apis";
import { useState } from "react";

export function TweetFeed() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: tweets, isLoading } = useTweets(page, pageSize);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </div>
  );
}
