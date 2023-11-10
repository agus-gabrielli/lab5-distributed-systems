import { useState } from 'react';
import axios from 'axios';
import {
    Box, Heading, Text, ListItem, Image, Divider, List,
    ListIcon,
    OrderedList,
    UnorderedList,
    Stack, HStack, VStack
} from "@chakra-ui/react";

export default function DailyForecastForm() {
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [days, setDays] = useState(5);
    const [openweathermapDailyData, setOpenweathermapDailyData] = useState([]);
    const [weathercomDailyData, setWeathercomDailyData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();


        axios.get(`http://localhost:8080/openweathermap/days?city=${cityName}&country=${countryName}&max_days=${days}`)
            .then(response => {
                console.log("response", response);
                if (response.status === 200) {
                    setOpenweathermapDailyData(response.data)
                } else {
                    console.log("Error status not 200");
                }
            }).catch((error) => {
                console.error(error);
            });

        axios.get(`http://localhost:8080/weathercom/days?city=${cityName}&country=${countryName}&max_days=${days}`)
            .then(response => {
                console.log("response", response);
                if (response.status === 200) {
                    setWeathercomDailyData(response.data)
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
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">Find out the weather forecast for the next days in a given city</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Insert city, country and the number of days for the forecast
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
                                    Forecast days
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            type="text"
                                            name="forecastdays"
                                            id="forecastdays"
                                            autoComplete="forecastdays"
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder={days}
                                            value={days}
                                            onChange={(e) => setDays(e.target.value)}
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

            {openweathermapDailyData.length > 0 && weathercomDailyData.length > 0 && (
                <div>
                    <Stack spacing={64} direction='row' mt={10}>
                        <Box >
                            <div>
                                <Heading size='lg' mb={3}>OpenWeatherMap:</Heading>
                                {openweathermapDailyData.map(day => {
                                    return (
                                        <div key={day["date"]}>
                                            <UnorderedList >
                                                <Text fontWeight={"extrabold"}>{day["date"]} </Text>
                                                <ListItem>Max Temperature: {day["max_temperature"]} </ListItem>
                                                <ListItem>Min Temperature: {day["min_temperature"]}</ListItem>
                                                <ListItem>Description: {day["weather_description"]}</ListItem>
                                                <ListItem>Chance of rain: {day["pop"]}</ListItem>
                                            </UnorderedList>
                                            <br />
                                        </div>
                                    )
                                })}

                            </div>
                        </Box>
                        <Box mt={10}>
                            <div>
                                <Heading size='lg' mb={3}>Weather.com:</Heading>

                                {weathercomDailyData.map(day => {
                                    return (
                                        <div key={day["timestamp"]}>
                                            <UnorderedList>
                                                <Text fontWeight={"extrabold"}>{day["date"]} </Text>
                                                <ListItem>Max Temperature: {day["max_temperature"]} </ListItem>
                                                <ListItem>Min Temperature: {day["min_temperature"]}</ListItem>
                                                <ListItem>Description: {day["weather_description"]}</ListItem>
                                                <ListItem>Chance of rain: {day["pop"]}</ListItem>
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