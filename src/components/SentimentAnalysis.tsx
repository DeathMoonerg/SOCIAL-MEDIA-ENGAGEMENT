import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface SentimentAnalysisProps {
  data: any[]
}

const SentimentAnalysis = ({ data }: SentimentAnalysisProps) => {
  // Calculate sentiment distribution
  const sentimentCounts = data.reduce((acc: any, item) => {
    const sentiment = item.sentiment_label
    acc[sentiment] = (acc[sentiment] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(sentimentCounts).map(([name, value]) => ({
    name,
    value
  }))

  const COLORS = ['#4CAF50', '#FFC107', '#F44336']

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Sentiment Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SentimentAnalysis 