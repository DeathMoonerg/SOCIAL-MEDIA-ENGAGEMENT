interface Post {
  id: number;
  title: string;
  engagement: number;
  date: string;
}

interface TopPostsProps {
  posts: Post[];
}

export default function TopPosts({ posts }: TopPostsProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-medium">{post.title}</h4>
            <p className="text-sm text-secondary">{post.date}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-primary">{post.engagement}</p>
            <p className="text-sm text-secondary">engagements</p>
          </div>
        </div>
      ))}
    </div>
  );
} 