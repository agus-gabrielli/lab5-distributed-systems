import { useState } from 'react';
import axios from 'axios';
import {
    Box, Heading, Text, ListItem, Image, Divider, List,
    ListIcon,
    OrderedList,
    UnorderedList,
    Stack, HStack, VStack
} from "@chakra-ui/react";

export default function HourlyForecastForm() {
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [hours, setHours] = useState(12);
    const [openweathermapHourlyData, setOpenweathermapHourlyData] = useState([]);
    const [weathercomHourlyData, setWeathercomHourlyData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        axios.get(`http://localhost:8080/openweathermap/hourly?city=${cityName}&country=${countryName}&max_hours=${hours}`)
            .then(response => {
                console.log("response", response);
                if (response.status === 200) {
                    setOpenweathermapHourlyData(response.data)
                } else {
                    console.log("Error status not 200");
                }
            }).catch((error) => {
                console.error(error);
            });

        axios.get(`http://localhost:8080/weathercom/hourly?city=${cityName}&country=${countryName}&max_hours=${hours}`)
            .then(response => {
                console.log("response", response);
                if (response.status === 200) {
                    setWeathercomHourlyData(response.data)
                } else {
                    console.log("Error status not 200");
                }
            }).catch((error) => {
                console.error(error);
            });
    };

    return (
        <div >
            <form>
                <div className="space-y-12">
                    <div >
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">Find out the weather forecast for the next hours in a given city</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Insert city, country and the number of hours for the forecast
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    City name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="city name"
                                            id="cityname"
                                            autoComplete="cityname"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder={cityName}
                                            value={cityName}
                                            onChange={(e) => setCityName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country name
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="country name"
                                            id="countryname"
                                            autoComplete="countryname"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder={countryName}
                                            value={countryName}
                                            onChange={(e) => setCountryName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Forecast hours
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="forecasthours"
                                            id="forecasthours"
                                            autoComplete="forecasthours"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder={hours}
                                            value={hours}
                                            onChange={(e) => setHours(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="mt-6 flex items-center gap-x-6">

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Find
                        </button>
                    </div>
                </div>
            </form>

            {openweathermapHourlyData.length > 0 && weathercomHourlyData.length > 0 && (
                <div>
                    <Stack spacing={64} direction='row' mt={10}>
                        <Box >
                            <div>
                                <Heading size='lg' mb={3}>OpenWeatherMap:</Heading>
                                {openweathermapHourlyData.map(hour => {
                                    return (
                                        <div key={hour["timestamp"]}>
                                            <UnorderedList >
                                                <Text fontWeight={"extrabold"}>{hour["timestamp"]} </Text>
                                                <ListItem>Temperature: {hour["temperature"]} </ListItem>
                                                <ListItem>Feels like: {hour["feels_like"]}</ListItem>
                                                <ListItem>Description: {hour["weather_description"]}</ListItem>
                                                <ListItem>Humidity: {hour["humidity"]}</ListItem>
                                                <ListItem>Chance of rain: {hour["pop"]}</ListItem>
                                            </UnorderedList>
                                            <br />
                                        </div>
                                    )
                                })}

                            </div>
                        </Box>
                        <Box >
                            <div>
                                <Heading size='lg' mb={3}>Weather.com:</Heading>

                                {weathercomHourlyData.map(hour => {
                                    return (
                                        <div key={hour["timestamp"]}>
                                            <UnorderedList>
                                                <Text fontWeight={"extrabold"}>{hour["timestamp"]} </Text>
                                                <ListItem>Temperature: {hour["temperature"]} </ListItem>
                                                <ListItem>Feels like: {hour["feels_like"]}</ListItem>
                                                <ListItem>Description: {hour["weather_description"]}</ListItem>
                                                <ListItem>Humidity: {hour["humidity"]}</ListItem>
                                                <ListItem>Chance of rain: {hour["pop"]}</ListItem>
                                            </UnorderedList>
                                            <br />
                                        </div>
                                    )
                                })}
                            </div>
                        </Box>
                    </Stack>
                </div>
            )}
        </div>
    )
}