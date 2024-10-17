import { TweetForm } from "@/components/tweet/tweet-form";
import { TweetFeed } from "@/components/tweet/tweet-feed";

export default function Home() {
  return (
    <div className="space-y-8 py-8 max-w-xl mx-auto">
      <TweetForm />
      <TweetFeed />
    </div>
  );
}
