import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts'

interface GrowthAnalysisProps {
  data: any[]
}

const GrowthAnalysis = ({ data }: GrowthAnalysisProps) => {
  // Calculate engagement growth distribution
  const growthRanges = {
    'High Growth': { min: 50, max: Infinity },
    'Moderate Growth': { min: 20, max: 50 },
    'Stable': { min: -20, max: 20 },
    'Moderate Decline': { min: -50, max: -20 },
    'High Decline': { min: -Infinity, max: -50 }
  }

  const growthDistribution = data.reduce((acc: any, item) => {
    const growth = parseFloat(item.user_engagement_growth)
    for (const [range, { min, max }] of Object.entries(growthRanges)) {
      if (growth >= min && growth < max) {
        acc[range] = (acc[range] || 0) + 1
        break
      }
    }
    return acc
  }, {})

  const growthData = Object.entries(growthDistribution)
    .map(([range, count]) => ({
      range,
      count
    }))
    .sort((a, b) => {
      const ranges = ['High Decline', 'Moderate Decline', 'Stable', 'Moderate Growth', 'High Growth']
      return ranges.indexOf(a.range) - ranges.indexOf(b.range)
    })

  // Calculate buzz change vs engagement growth correlation
  const buzzEngagementData = data.map(item => ({
    buzzChange: parseFloat(item.buzz_change_rate),
    engagementGrowth: parseFloat(item.user_engagement_growth),
    impressions: parseInt(item.impressions)
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Engagement Growth Distribution */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4 font-sans">Engagement Growth Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" name="Number of Users" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Buzz Change vs Engagement Growth Correlation */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4 font-sans">Buzz Change vs Engagement Growth</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="buzzChange" name="Buzz Change Rate (%)" />
              <YAxis dataKey="engagementGrowth" name="Engagement Growth (%)" />
              <ZAxis dataKey="impressions" name="Impressions" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Users" data={buzzEngagementData} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default GrowthAnalysis 