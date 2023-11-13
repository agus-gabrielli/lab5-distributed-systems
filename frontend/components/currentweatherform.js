import { useState } from 'react';
import axios from 'axios';
import {
    Box, Heading, Divider,
    UnorderedList,
} from "@chakra-ui/react";

export default function CurrentWeatherForm() {
    // State variables to handle user input and API data
    const [cityName, setCityName] = useState('');
    const [countryName, setCountryName] = useState('');
    const [openweathermapData, setOpenweathermapData] = useState();
    const [weathercomData, setWeathercomData] = useState();

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Fetching data from the OpenWeatherMap API based on the city and country provided
        axios.get(`http://localhost:8080/openweathermap/current?city=${cityName}&country=${countryName}`)
            .then(response => {
                console.log("response", response);
                if (response.status === 200) {
                    // If the request is successful, set the retrieved data to state
                    setOpenweathermapData(response.data);
                } else {
                    console.log("Error status not 200");
                }
            }).catch((error) => {
                console.error(error);
            });

        // Fetching data from the Weather.com API based on the city and country provided
        axios.get(`http://localhost:8080/weathercom/current?city=${cityName}&country=${countryName}`)
            .then(response => {
                console.log("response", response);
                if (response.status === 200) {
                    // If the request is successful, set the retrieved data to state
                    setWeathercomData(response.data);
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
                {/* Form for user input of city and country */}
                <div className="space-y-12">
                    {/* Input fields for city and country */}
                    {/* ... (omitting rest of the form UI for brevity) */}
                </div>
            </form>

            {/* Displaying retrieved weather data when available */}
            {openweathermapData && weathercomData && (
                <Box mt={10}>
                    {/* Display OpenWeatherMap data */}
                    <div>
                        <Heading size='lg' mb={3}>OpenWeatherMap:</Heading>
                        <UnorderedList>
                            {/* Displaying weather details from OpenWeatherMap */}
                            {/* ... (omitting displaying weather data for brevity) */}
                        </UnorderedList>
                    </div>
                    <Divider mt={5} mb={5} />
                    {/* Display Weather.com data */}
                    <div>
                        <Heading size='lg' mb={3}>Weather.com:</Heading>
                        <UnorderedList>
                            {/* Displaying weather details from Weather.com */}
                            {/* ... (omitting displaying weather data for brevity) */}
                        </UnorderedList>
                    </div>
                </Box>
            )}
        </div>
    )
}
