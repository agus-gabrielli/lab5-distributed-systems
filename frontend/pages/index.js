import Link from 'next/link';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrentWeatherForm from '../components/currentweatherform';
import HourlyForecastForm from '../components/hourlyforecastform';
import DailyForecastForm from '../components/dailyforecastform';


export default function Home() {
  return (
    <div className="bg-white">
      <Heading mb={10}>The weather app - by Agustin Gabrielli</Heading>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Current</Tab>
          <Tab>Hourly forecast</Tab>
          <Tab>Daily forecast</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CurrentWeatherForm />
          </TabPanel>
          <TabPanel>
            <HourlyForecastForm />
          </TabPanel>
          <TabPanel>
          <DailyForecastForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}
