import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface LocationLanguageAnalysisProps {
  data: any[]
}

const LocationLanguageAnalysis = ({ data }: LocationLanguageAnalysisProps) => {
  // Calculate location distribution
  const locationCounts = data.reduce((acc: any, item) => {
    const location = item.location
    acc[location] = (acc[location] || 0) + 1
    return acc
  }, {})

  const locationData = Object.entries(locationCounts)
    .map(([location, count]) => ({
      location,
      count
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // Calculate language distribution
  const languageCounts = data.reduce((acc: any, item) => {
    const language = item.language
    acc[language] = (acc[language] || 0) + 1
    return acc
  }, {})

  const languageData = Object.entries(languageCounts)
    .map(([language, count]) => ({
      language,
      count
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Location Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top 10 Locations</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Number of Posts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Language Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Language Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={languageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="language" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Number of Posts" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default LocationLanguageAnalysis 