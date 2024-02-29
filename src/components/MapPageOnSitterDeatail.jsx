"use client";
import React, { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import supabase from "@/lib/utils/db";
import { useToast } from "@chakra-ui/react";
const containerStyle = {
  width: "100%",
  height: "250px",
};

import { useParams } from "next/navigation";
const MapPageOnSitterDeatail = ({ props, petsitterid }) => {
  const toast = useToast();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
  });
  const params = useParams();
  useEffect(() => {
    fetchMarkersFromSupabase();
  }, [petsitterid]);
  const [markers, setMarkers] = useState([]);
  // const [petSitterId, setPetSitterId] = useState(null);


  const fetchMarkersFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from("markers")
        .select("*")
        .eq("pet_sitter_id", petsitterid);
      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setMarkers(data);
      }
    } catch (error) {
     
    }
  };
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
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* แสดง Marker บนแผนที่ */}
        {markers.map((marker, index) => (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
        ))}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default MapPageOnSitterDeatail;
