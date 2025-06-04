import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface EngagementOverviewProps {
  data: any[]
}

const EngagementOverview = ({ data }: EngagementOverviewProps) => {
  // Calculate average engagement metrics by platform
  const platformMetrics = data.reduce((acc: any, item) => {
    const platform = item.platform
    if (!acc[platform]) {
      acc[platform] = {
        platform,
        likes: 0,
        comments: 0,
        shares: 0,
        count: 0
      }
    }
    acc[platform].likes += parseInt(item.likes_count) || 0
    acc[platform].comments += parseInt(item.comments_count) || 0
    acc[platform].shares += parseInt(item.shares_count) || 0
    acc[platform].count++
    return acc
  }, {})

  const chartData = Object.values(platformMetrics).map((platform: any) => ({
    platform: platform.platform,
    likes: Math.round(platform.likes / platform.count),
    comments: Math.round(platform.comments / platform.count),
    shares: Math.round(platform.shares / platform.count)
  }))

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Average Engagement by Platform</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="platform" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="likes" name="Likes" fill="#8884d8" />
            <Bar dataKey="comments" name="Comments" fill="#82ca9d" />
            <Bar dataKey="shares" name="Shares" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default EngagementOverview 