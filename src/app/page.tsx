import DashboardLayout from '@/components/DashBoardLayout';
import NewsFeed from '@/components/NewsFeeds';
import StockWidget from '@/components/StockWidget';
import WeatherCard from '@/components/WeatherCart';

export default function Home() {
  return (
    <DashboardLayout>
      <WeatherCard />
      <NewsFeed />
      <StockWidget />
    </DashboardLayout>
  );
}
