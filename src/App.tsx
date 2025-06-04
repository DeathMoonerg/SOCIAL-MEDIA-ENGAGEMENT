import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  ShareIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import EngagementOverview from './components/EngagementOverview'
import SentimentAnalysis from './components/SentimentAnalysis'
import PlatformDistribution from './components/PlatformDistribution'
import TopBrands from './components/TopBrands'
import EngagementTrends from './components/EngagementTrends'
import Filter from './components/Filter'
import LocationLanguageAnalysis from './components/LocationLanguageAnalysis'
import ContentAnalysis from './components/ContentAnalysis'
import EmotionToxicityAnalysis from './components/EmotionToxicityAnalysis'
import CampaignAnalysis from './components/CampaignAnalysis'
import DailyTopicAnalysis from './components/DailyTopicAnalysis'
import DetailedSentimentAnalysis from './components/DetailedSentimentAnalysis'
import ProductAnalysis from './components/ProductAnalysis'
import GrowthAnalysis from './components/GrowthAnalysis'

function App() {
  const [data, setData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('')

  useEffect(() => {
    fetch('/Social_Media_Engagement_Dataset.json')
      .then(response => response.json())
      .then(data => {
        setData(data)
        setFilteredData(data)
      })
      .catch(error => console.error('Error loading data:', error))
  }, [])

  // Get unique platforms and brands for filter options
  const platforms = Array.from(new Set(data.map(item => item.platform)))
  const brands = Array.from(new Set(data.map(item => item.brand_name)))

  // Apply filters when selections change
  useEffect(() => {
    let filtered = data

    if (selectedPlatform) {
      filtered = filtered.filter(item => item.platform === selectedPlatform)
    }

    if (selectedBrand) {
      filtered = filtered.filter(item => item.brand_name === selectedBrand)
    }

    setFilteredData(filtered)
  }, [data, selectedPlatform, selectedBrand])

  const stats = [
    { name: 'Total Posts', value: filteredData.length, icon: ChartBarIcon },
    { name: 'Total Likes', value: filteredData.reduce((sum, item) => sum + (parseInt(item.likes_count) || 0), 0), icon: HeartIcon },
    { name: 'Total Comments', value: filteredData.reduce((sum, item) => sum + (parseInt(item.comments_count) || 0), 0), icon: ChatBubbleLeftIcon },
    { name: 'Total Shares', value: filteredData.reduce((sum, item) => sum + (parseInt(item.shares_count) || 0), 0), icon: ShareIcon },
    { name: 'Total Impressions', value: filteredData.reduce((sum, item) => sum + (parseInt(item.impressions) || 0), 0), icon: UserGroupIcon },
    { name: 'Average Engagement Rate', value: (filteredData.reduce((sum, item) => sum + (parseFloat(item.engagement_rate) || 0), 0) / filteredData.length).toFixed(2) + '%', icon: FireIcon },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Social Media Engagement Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Filters */}
          <Filter
            platforms={platforms}
            brands={brands}
            selectedPlatform={selectedPlatform}
            selectedBrand={selectedBrand}
            onPlatformChange={setSelectedPlatform}
            onBrandChange={setSelectedBrand}
          />

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.name} className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                <dt>
                  <div className="absolute rounded-md bg-indigo-500 p-3">
                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                </dt>
                <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value.toLocaleString()}</p>
                </dd>
              </div>
            ))}
          </div>

          {/* Daily Trends and Topic Analysis */}
          <div className="mt-8">
            <DailyTopicAnalysis data={filteredData} />
          </div>

          {/* Detailed Sentiment Analysis */}
          <div className="mt-8">
            <DetailedSentimentAnalysis data={filteredData} />
          </div>

          {/* Product Analysis */}
          <div className="mt-8">
            <ProductAnalysis data={filteredData} />
          </div>

          {/* Growth Analysis */}
          <div className="mt-8">
            <GrowthAnalysis data={filteredData} />
          </div>

          {/* Engagement Overview */}
          <div className="mt-8">
            <EngagementOverview data={filteredData} />
          </div>

          {/* Location and Language Analysis */}
          <div className="mt-8">
            <LocationLanguageAnalysis data={filteredData} />
          </div>

          {/* Content Analysis */}
          <div className="mt-8">
            <ContentAnalysis data={filteredData} />
          </div>

          {/* Emotion and Toxicity Analysis */}
          <div className="mt-8">
            <EmotionToxicityAnalysis data={filteredData} />
          </div>

          {/* Campaign Analysis */}
          <div className="mt-8">
            <CampaignAnalysis data={filteredData} />
          </div>

          {/* Sentiment and Platform Distribution */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <SentimentAnalysis data={filteredData} />
            <PlatformDistribution data={filteredData} />
          </div>

          {/* Top Brands and Engagement Trends */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <TopBrands data={filteredData} />
            <EngagementTrends data={filteredData} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
