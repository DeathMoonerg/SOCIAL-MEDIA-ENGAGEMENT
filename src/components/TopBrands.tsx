import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface TopBrandsProps {
  data: any[]
}

const TopBrands = ({ data }: TopBrandsProps) => {
  // Calculate brand performance
  const brandMetrics = data.reduce((acc: any, item) => {
    const brand = item.brand_name
    if (!acc[brand]) {
      acc[brand] = {
        brand,
        engagement: 0,
        count: 0
      }
    }
    acc[brand].engagement += parseFloat(item.engagement_rate) || 0
    acc[brand].count++
    return acc
  }, {})

  const chartData = Object.values(brandMetrics)
    .map((brand: any) => ({
      brand: brand.brand,
      engagement: (brand.engagement / brand.count).toFixed(2)
    }))
    .sort((a: any, b: any) => b.engagement - a.engagement)
    .slice(0, 10)

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Top 10 Brands by Engagement Rate</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="brand" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="engagement" name="Average Engagement Rate (%)" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TopBrands 