import { Box, Heading, Text, UnorderedList, ListItem, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { EMPTY_PHOTO_SRC } from "../lib/utils";

const OfferDetails = ({ offerData }) => {

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        {title}
      </Heading>
      {userProfile && (
        <Box mt={4}>
          <Image src={userProfile.photo || EMPTY_PHOTO_SRC} alt={userProfile.full_name} boxSize="200px" objectFit="cover" />
          <strong>Offered by:</strong> {userProfile.full_name}
        </Box>
      )}
      <br/>
      <Text>
        <strong>Date From:</strong> {date_from}
      </Text>
      <Text>
        <strong>Date To:</strong> {date_to}
      </Text>
      <Text>
        <strong>City:</strong> {city}
      </Text>
      <Text>
        <strong>Country:</strong> {country}
      </Text>
      <Box mt={4}>
        <Heading as="h2" size="md" mb={2}>
          Introduction
        </Heading>
        <Text>{introduction}</Text>
      </Box>

      <Box mt={4}>
        <Heading as="h2" size="md" mb={2}>
          Home info
        </Heading>
        <Text>{home_info}</Text>
      </Box>
      <Box mt={4}>
        <Heading as="h2" size="md" mb={2}>
          Amenities
        </Heading>
        <UnorderedList>
          {amenities.map((amenity, index) => (
            <ListItem key={index}>{amenity}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box mt={4}>
        <Heading as="h2" size="md" mb={2}>
          Pets
        </Heading>
        <UnorderedList>
          {pets.map((pet, index) => (
            <ListItem key={index}>
              {pet.type} - {pet.name} (Age: {pet.age})
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default OfferDetails;
