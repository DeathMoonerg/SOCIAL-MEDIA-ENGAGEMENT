import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface CampaignAnalysisProps {
  data: any[]
}

const CampaignAnalysis = ({ data }: CampaignAnalysisProps) => {
  // Calculate campaign performance
  const campaignMetrics = data.reduce((acc: any, item) => {
    const campaign = item.campaign_name
    if (!acc[campaign]) {
      acc[campaign] = {
        campaign,
        engagement: 0,
        impressions: 0,
        count: 0
      }
    }
    acc[campaign].engagement += parseFloat(item.engagement_rate) || 0
    acc[campaign].impressions += parseInt(item.impressions) || 0
    acc[campaign].count++
    return acc
  }, {})

  const campaignData = Object.values(campaignMetrics)
    .map((campaign: any) => ({
      campaign: campaign.campaign,
      averageEngagement: (campaign.engagement / campaign.count).toFixed(2),
      totalImpressions: campaign.impressions
    }))
    .sort((a: any, b: any) => b.averageEngagement - a.averageEngagement)
    .slice(0, 10)

  // Calculate campaign phase distribution
  const phaseCounts = data.reduce((acc: any, item) => {
    const phase = item.campaign_phase
    acc[phase] = (acc[phase] || 0) + 1
    return acc
  }, {})

  const phaseData = Object.entries(phaseCounts)
    .map(([phase, count]) => ({
      phase,
      count
    }))
    .sort((a, b) => b.count - a.count)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Campaign Performance */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top 10 Campaigns by Engagement</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campaign" angle={-45} textAnchor="end" height={100} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="averageEngagement" name="Average Engagement Rate (%)" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="totalImpressions" name="Total Impressions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Phase Distribution */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Campaign Phase Distribution</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={phaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="phase" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Number of Posts" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default CampaignAnalysis 