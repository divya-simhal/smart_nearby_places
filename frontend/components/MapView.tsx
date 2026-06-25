"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import { PlaceResult } from "@/types";

const userIcon = L.divIcon({
  className: "",
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#ece8e1;border:2px solid #121215;"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const placeIcon = (highlighted: boolean) =>
  L.divIcon({
    className: "",
    html: `<div style="
      width:${highlighted ? 16 : 12}px;
      height:${highlighted ? 16 : 12}px;
      border-radius:50%;
      background:#f2a93b;
      border:2px solid #121215;
      box-shadow:0 0 0 ${highlighted ? 4 : 0}px rgba(242,169,59,0.25);
      transition: all 0.15s ease;
    "></div>`,
    iconSize: [highlighted ? 16 : 12, highlighted ? 16 : 12],
    iconAnchor: [highlighted ? 8 : 6, highlighted ? 8 : 6],
  });

function Recenter({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);

  return null;
}

interface Props {
  userLat: number;
  userLng: number;
  places: PlaceResult[];
  hoveredId: number | null;
}

export default function MapView({ userLat, userLng, places, hoveredId }: Props) {
  return (
    <MapContainer
      center={[userLat, userLng]}
      zoom={14}
      scrollWheelZoom
      className="h-full w-full"
    >
      <Recenter lat={userLat} lng={userLng} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; OpenStreetMap contributors'
      />

      <Marker position={[userLat, userLng]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {places
        .filter((p) => p.lat !== null && p.lng !== null)
        .map((p) => (
          <Marker
            key={p.id}
            position={[p.lat as number, p.lng as number]}
            icon={placeIcon(hoveredId === p.id)}
          >
            <Popup>
              <strong>{p.name}</strong>
              <br />
              {p.distance_km} km · score {Math.round(p.score)}
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
