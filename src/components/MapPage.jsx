"use client";
import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import supabase from "@/lib/utils/db";
import { useToast } from "@chakra-ui/react";
const containerStyle = {
  width: "100%",
  height: "250px",
};

const MapPage = ({ petSitterId, getMarkers, setGetMarkers, user_id }) => {
  const toast = useToast();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  });

  useEffect(() => {
    setMarkers(getMarkers);
  }, [getMarkers]);
  const [markers, setMarkers] = useState([]);

  const addMarker = useCallback(
    async (event) => {
      const newMarker = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        pet_sitter_id: petSitterId,
        user_id: user_id,
      };

      // Use upsert to either insert a new marker or update an existing one
      try {
        const { data, error } = await supabase
          .from("markers")
          .upsert([newMarker], { onConflict: "user_id" });
        if (error) {
          throw error;
        }

        toast({
          title: "success",
          position: "top",
          description: `Your location has been updated.`,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setMarkers((prevMarkers) => {
          // Remove the old marker for the current pet_sitter_id
          const updatedMarkers = prevMarkers.filter(
            (marker) => marker.user_id !== user_id
          );
          // Add the new marker
          updatedMarkers.push(newMarker);
          return updatedMarkers;
        });
      } catch (error) {
        toast({
          title: "Error",
          position: "top",
          description: "Failed to update your location.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
    [setMarkers, petSitterId]
  );

  let latcenter;
  let lngcenter;
  if (markers.length === 0) {
    latcenter = 13.736717;
    lngcenter = 100.523186;
  } else {
    latcenter = markers[0].lat;
    lngcenter = markers[0].lng;
  }

  const center = {
    lat: parseFloat(latcenter),
    lng: parseFloat(lngcenter),
  };
  const onLoad = useCallback((map) => {}, []);

  const onUnmount = useCallback((map) => {}, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={addMarker}
      >
        {/* แสดง Marker บนแผนที่ */}
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default MapPage;
