import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface EngagementTrendsProps {
  data: any[]
}

const EngagementTrends = ({ data }: EngagementTrendsProps) => {
  // Calculate engagement trends by day of week
  const dayMetrics = data.reduce((acc: any, item) => {
    const day = item.day_of_week
    if (!acc[day]) {
      acc[day] = {
        day,
        likes: 0,
        comments: 0,
        shares: 0,
        count: 0
      }
    }
    acc[day].likes += parseInt(item.likes_count) || 0
    acc[day].comments += parseInt(item.comments_count) || 0
    acc[day].shares += parseInt(item.shares_count) || 0
    acc[day].count++
    return acc
  }, {})

  const chartData = Object.values(dayMetrics)
    .map((day: any) => ({
      day: day.day,
      likes: Math.round(day.likes / day.count),
      comments: Math.round(day.comments / day.count),
      shares: Math.round(day.shares / day.count)
    }))
    .sort((a: any, b: any) => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      return days.indexOf(a.day) - days.indexOf(b.day)
    })

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Engagement Trends by Day</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="likes" name="Likes" stroke="#8884d8" />
            <Line type="monotone" dataKey="comments" name="Comments" stroke="#82ca9d" />
            <Line type="monotone" dataKey="shares" name="Shares" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default EngagementTrends 