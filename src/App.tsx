import { useState, useEffect } from 'react'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  ShareIcon,
  FireIcon,
  CalendarIcon,
  ChartPieIcon,
  UserCircleIcon,
  SparklesIcon
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
    { name: 'Total Posts', value: filteredData.length, icon: ChartBarIcon, color: 'bg-blue-500' },
    { name: 'Total Likes', value: filteredData.reduce((sum, item) => sum + (parseInt(item.likes_count) || 0), 0), icon: HeartIcon, color: 'bg-red-500' },
    { name: 'Total Comments', value: filteredData.reduce((sum, item) => sum + (parseInt(item.comments_count) || 0), 0), icon: ChatBubbleLeftIcon, color: 'bg-green-500' },
    { name: 'Total Shares', value: filteredData.reduce((sum, item) => sum + (parseInt(item.shares_count) || 0), 0), icon: ShareIcon, color: 'bg-purple-500' },
    { name: 'Total Impressions', value: filteredData.reduce((sum, item) => sum + (parseInt(item.impressions) || 0), 0), icon: UserGroupIcon, color: 'bg-yellow-500' },
    { name: 'Average Engagement Rate', value: (filteredData.reduce((sum, item) => sum + (parseFloat(item.engagement_rate) || 0), 0) / filteredData.length).toFixed(2) + '%', icon: FireIcon, color: 'bg-orange-500' },
  ]

  const sections = [
    {
      title: 'Daily & Topic Analysis',
      icon: CalendarIcon,
      component: <DailyTopicAnalysis data={filteredData} />
    },
    {
      title: 'Sentiment Analysis',
      icon: ChartPieIcon,
      component: <DetailedSentimentAnalysis data={filteredData} />
    },
    {
      title: 'Product Performance',
      icon: SparklesIcon,
      component: <ProductAnalysis data={filteredData} />
    },
    {
      title: 'Growth & Buzz Analysis',
      icon: UserCircleIcon,
      component: <GrowthAnalysis data={filteredData} />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-white mb-1 font-sans drop-shadow-lg">Social Media Engagement Dashboard</h1>
              <p className="text-lg text-indigo-100 font-sans">Statistik & Analisis Engagement</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-indigo-100">Last updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mb-10">
            <Filter
              platforms={platforms}
              brands={brands}
              selectedPlatform={selectedPlatform}
              selectedBrand={selectedBrand}
              onPlatformChange={setSelectedPlatform}
              onBrandChange={setSelectedBrand}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {stats.map((stat) => (
              <div key={stat.name} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 px-6 pb-12 pt-6 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-200">
                <dt>
                  <div className={`absolute rounded-xl ${stat.color} p-4 shadow-md`}>
                    <stat.icon className="h-7 w-7 text-white" aria-hidden="true" />
                  </div>
                  <p className="ml-20 truncate text-base font-semibold text-gray-500 font-sans">{stat.name}</p>
                </dt>
                <dd className="ml-20 flex items-baseline pb-6 sm:pb-7">
                  <p className="text-3xl font-extrabold text-gray-900 font-sans">{stat.value.toLocaleString()}</p>
                </dd>
              </div>
            ))}
          </div>

          {/* Main Sections */}
          {sections.map((section, index) => (
            <div key={section.title} className="mb-10">
              <div className="flex items-center mb-4">
                <section.icon className="h-7 w-7 text-indigo-400 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800 font-sans">{section.title}</h2>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                {section.component}
              </div>
            </div>
          ))}

          {/* Additional Analysis Sections */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 font-sans">Engagement Overview</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
              <EngagementOverview data={filteredData} />
            </div>

            <div className="flex items-center mb-4">
              <UserGroupIcon className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 font-sans">Location & Language Analysis</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
              <LocationLanguageAnalysis data={filteredData} />
            </div>

            <div className="flex items-center mb-4">
              <ChartPieIcon className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 font-sans">Content Analysis</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
              <ContentAnalysis data={filteredData} />
            </div>

            <div className="flex items-center mb-4">
              <FireIcon className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 font-sans">Emotion & Toxicity Analysis</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
              <EmotionToxicityAnalysis data={filteredData} />
            </div>

            <div className="flex items-center mb-4">
              <SparklesIcon className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 font-sans">Campaign Analysis</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
              <CampaignAnalysis data={filteredData} />
            </div>

            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-indigo-400 mr-2" />
              <h2 className="text-xl font-bold text-gray-800 font-sans">Top Brands & Trends</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 grid grid-cols-1 gap-6">
              <TopBrands data={filteredData} />
              <EngagementTrends data={filteredData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
