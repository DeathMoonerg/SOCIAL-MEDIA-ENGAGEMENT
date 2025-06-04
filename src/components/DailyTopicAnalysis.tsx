import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

interface DailyTopicAnalysisProps {
  data: any[]
}

const DailyTopicAnalysis = ({ data }: DailyTopicAnalysisProps) => {
  // Calculate daily trends
  const dailyTrends = data.reduce((acc: any, item) => {
    const day = item.day_of_week
    if (!acc[day]) {
      acc[day] = {
        day,
        posts: 0,
        engagement: 0,
        impressions: 0
      }
    }
    acc[day].posts++
    acc[day].engagement += parseFloat(item.engagement_rate) || 0
    acc[day].impressions += parseInt(item.impressions) || 0
    return acc
  }, {})

  const dailyData = Object.values(dailyTrends)
    .map((day: any) => ({
      day: day.day,
      posts: day.posts,
      averageEngagement: (day.engagement / day.posts).toFixed(2),
      totalImpressions: day.impressions
    }))
    .sort((a: any, b: any) => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      return days.indexOf(a.day) - days.indexOf(b.day)
    })

  // Calculate topic category distribution
  const topicCounts = data.reduce((acc: any, item) => {
    const topic = item.topic_category
    if (!acc[topic]) {
      acc[topic] = {
        topic,
        count: 0,
        engagement: 0
      }
    }
    acc[topic].count++
    acc[topic].engagement += parseFloat(item.engagement_rate) || 0
    return acc
  }, {})

  const topicData = Object.values(topicCounts)
    .map((topic: any) => ({
      topic: topic.topic,
      count: topic.count,
      averageEngagement: (topic.engagement / topic.count).toFixed(2)
    }))
    .sort((a: any, b: any) => b.count - a.count)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Daily Trends */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Daily Engagement Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="posts" name="Number of Posts" stroke="#8884d8" />
              <Line yAxisId="left" type="monotone" dataKey="averageEngagement" name="Average Engagement Rate (%)" stroke="#82ca9d" />
              <Line yAxisId="right" type="monotone" dataKey="totalImpressions" name="Total Impressions" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Topic Category Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Topic Category Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Number of Posts" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="averageEngagement" name="Average Engagement Rate (%)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DailyTopicAnalysis 