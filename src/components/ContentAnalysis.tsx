import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ContentAnalysisProps {
  data: any[]
}

const ContentAnalysis = ({ data }: ContentAnalysisProps) => {
  // Calculate hashtag distribution
  const hashtagCounts = data.reduce((acc: any, item) => {
    const hashtags = item.hashtags.split(',').map((tag: string) => tag.trim())
    hashtags.forEach((tag: string) => {
      if (tag) {
        acc[tag] = (acc[tag] || 0) + 1
      }
    })
    return acc
  }, {})

  const hashtagData = Object.entries(hashtagCounts)
    .map(([hashtag, count]) => ({
      hashtag,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Calculate keyword distribution
  const keywordCounts = data.reduce((acc: any, item) => {
    const keywords = item.keywords.split(',').map((keyword: string) => keyword.trim())
    keywords.forEach((keyword: string) => {
      if (keyword) {
        acc[keyword] = (acc[keyword] || 0) + 1
      }
    })
    return acc
  }, {})

  const keywordData = Object.entries(keywordCounts)
    .map(([keyword, count]) => ({
      keyword,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Hashtag Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top 10 Hashtags</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={hashtagData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hashtag" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Usage Count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keyword Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top 10 Keywords</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={keywordData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="keyword" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Usage Count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default ContentAnalysis 