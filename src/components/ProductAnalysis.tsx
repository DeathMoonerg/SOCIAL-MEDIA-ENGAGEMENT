import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface ProductAnalysisProps {
  data: any[]
}

const ProductAnalysis = ({ data }: ProductAnalysisProps) => {
  // Calculate product performance metrics
  const productMetrics = data.reduce((acc: any, item) => {
    const product = item.product_name
    if (!acc[product]) {
      acc[product] = {
        product,
        engagement: 0,
        impressions: 0,
        likes: 0,
        comments: 0,
        shares: 0,
        count: 0
      }
    }
    acc[product].engagement += parseFloat(item.engagement_rate) || 0
    acc[product].impressions += parseInt(item.impressions) || 0
    acc[product].likes += parseInt(item.likes_count) || 0
    acc[product].comments += parseInt(item.comments_count) || 0
    acc[product].shares += parseInt(item.shares_count) || 0
    acc[product].count++
    return acc
  }, {})

  const productData = Object.values(productMetrics)
    .map((product: any) => ({
      product: product.product,
      averageEngagement: (product.engagement / product.count).toFixed(2),
      totalImpressions: product.impressions,
      averageLikes: Math.round(product.likes / product.count),
      averageComments: Math.round(product.comments / product.count),
      averageShares: Math.round(product.shares / product.count)
    }))
    .sort((a: any, b: any) => b.averageEngagement - a.averageEngagement)
    .slice(0, 10)

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Top 10 Products by Engagement</h2>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" angle={-45} textAnchor="end" height={100} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="averageEngagement" name="Average Engagement Rate (%)" fill="#8884d8" />
            <Bar yAxisId="left" dataKey="averageLikes" name="Average Likes" fill="#82ca9d" />
            <Bar yAxisId="left" dataKey="averageComments" name="Average Comments" fill="#ffc658" />
            <Bar yAxisId="left" dataKey="averageShares" name="Average Shares" fill="#ff8042" />
            <Bar yAxisId="right" dataKey="totalImpressions" name="Total Impressions" fill="#0088fe" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProductAnalysis 