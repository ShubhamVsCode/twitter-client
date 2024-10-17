"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateTweet } from "@/lib/apis";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export function TweetForm() {
  const [tweet, setTweet] = useState("");
  const { mutateAsync: createTweet } = useCreateTweet();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTweet(tweet);
    setTweet("");
    toast.success("Tweeted successfully!");
    queryClient.invalidateQueries({ queryKey: ["tweets"] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex space-x-4">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <Textarea
          placeholder="What's happening?"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          className="flex-grow"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Tweet</Button>
      </div>
    </form>
  );
}
