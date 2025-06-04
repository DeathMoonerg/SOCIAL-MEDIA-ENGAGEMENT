import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface EmotionToxicityAnalysisProps {
  data: any[]
}

const EmotionToxicityAnalysis = ({ data }: EmotionToxicityAnalysisProps) => {
  // Calculate emotion distribution
  const emotionCounts = data.reduce((acc: any, item) => {
    const emotion = item.emotion_type
    acc[emotion] = (acc[emotion] || 0) + 1
    return acc
  }, {})

  const emotionData = Object.entries(emotionCounts)
    .map(([emotion, count]) => ({
      emotion,
      count
    }))
    .sort((a, b) => b.count - a.count)

  // Calculate average toxicity by emotion
  const toxicityByEmotion = data.reduce((acc: any, item) => {
    const emotion = item.emotion_type
    if (!acc[emotion]) {
      acc[emotion] = {
        emotion,
        totalToxicity: 0,
        count: 0
      }
    }
    acc[emotion].totalToxicity += parseFloat(item.toxicity_score) || 0
    acc[emotion].count++
    return acc
  }, {})

  const toxicityData = Object.values(toxicityByEmotion)
    .map((item: any) => ({
      emotion: item.emotion,
      averageToxicity: (item.totalToxicity / item.count).toFixed(2)
    }))
    .sort((a: any, b: any) => b.averageToxicity - a.averageToxicity)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Emotion Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Emotion Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={emotionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="emotion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Number of Posts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Toxicity by Emotion */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Average Toxicity by Emotion</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={toxicityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="emotion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="averageToxicity" name="Average Toxicity Score" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default EmotionToxicityAnalysis 