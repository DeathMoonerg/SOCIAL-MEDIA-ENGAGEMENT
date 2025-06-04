import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'

interface DetailedSentimentAnalysisProps {
  data: any[]
}

const DetailedSentimentAnalysis = ({ data }: DetailedSentimentAnalysisProps) => {
  // Calculate sentiment score distribution
  const sentimentRanges = {
    'Very Negative': { min: -1, max: -0.6 },
    'Negative': { min: -0.6, max: -0.2 },
    'Neutral': { min: -0.2, max: 0.2 },
    'Positive': { min: 0.2, max: 0.6 },
    'Very Positive': { min: 0.6, max: 1 }
  }

  const sentimentDistribution = data.reduce((acc: any, item) => {
    const score = parseFloat(item.sentiment_score)
    for (const [range, { min, max }] of Object.entries(sentimentRanges)) {
      if (score >= min && score < max) {
        acc[range] = (acc[range] || 0) + 1
        break
      }
    }
    return acc
  }, {})

  const sentimentData = Object.entries(sentimentDistribution)
    .map(([range, count]) => ({
      range,
      count
    }))
    .sort((a, b) => {
      const ranges = ['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive']
      return ranges.indexOf(a.range) - ranges.indexOf(b.range)
    })

  // Calculate sentiment vs engagement correlation
  const sentimentEngagementData = data.map(item => ({
    sentiment: parseFloat(item.sentiment_score),
    engagement: parseFloat(item.engagement_rate),
    impressions: parseInt(item.impressions)
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Sentiment Score Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Sentiment Score Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Number of Posts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sentiment vs Engagement Correlation */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Sentiment vs Engagement Correlation</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sentiment" name="Sentiment Score" />
              <YAxis dataKey="engagement" name="Engagement Rate (%)" />
              <ZAxis dataKey="impressions" name="Impressions" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Posts" data={sentimentEngagementData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DetailedSentimentAnalysis 