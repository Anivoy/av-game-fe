import type { Location } from "@/types/game.type";
import { useEffect, useRef } from "react";
import Map, { Marker, Source, Layer, type MapRef } from "react-map-gl/maplibre";

import MapPinIcon from "@/assets/icons/map-pin.svg";
import FlagPinIcon from "@/assets/icons/flag-pin.svg";

interface RevealMapProps {
  guessedLocation?: Location | null;
  revealedLocation?: Location | null;
  isAsideExpanded?: boolean;
}

const BASE_PADDING = 160;
const ASIDE_WIDTH = 360;
const BOTTOM_BAR_HEIGHT = 90;

export default function RevealMap({
  guessedLocation,
  revealedLocation,
  isAsideExpanded = true,
}: RevealMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const fittedRef = useRef(false);

  const hasBoth =
    guessedLocation &&
    revealedLocation &&
    !Number.isNaN(guessedLocation.latitude) &&
    !Number.isNaN(revealedLocation.latitude);

  const lineGeoJson: GeoJSON.FeatureCollection<
    GeoJSON.LineString | GeoJSON.Point,
    GeoJSON.GeoJsonProperties
  > | null = hasBoth
    ? {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [guessedLocation.longitude, guessedLocation.latitude],
                [revealedLocation.longitude, revealedLocation.latitude],
              ],
            },
            properties: {},
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                guessedLocation.longitude,
                guessedLocation.latitude,
              ],
            },
            properties: { role: "start" },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                revealedLocation.longitude,
                revealedLocation.latitude,
              ],
            },
            properties: { role: "end" },
          },
        ],
      }
    : null;

  useEffect(() => {
    fittedRef.current = false;
  }, [guessedLocation, revealedLocation, isAsideExpanded]);

  return (
    <Map
      ref={mapRef}
      mapStyle="http://localhost:8090/styles/bright/style.json"
      style={{ width: "100%", height: "100%" }}
      interactive={false}
      onIdle={() => {
        if (!mapRef.current || !hasBoth || fittedRef.current) return;

        fittedRef.current = true;

        const cameraPadding = {
          top: BASE_PADDING,
          left: BASE_PADDING,
          right: BASE_PADDING + (isAsideExpanded ? ASIDE_WIDTH : 0),
          bottom: BASE_PADDING + BOTTOM_BAR_HEIGHT,
        };

        mapRef.current.fitBounds(
          [
            [
              Math.min(guessedLocation.longitude, revealedLocation.longitude),
              Math.min(guessedLocation.latitude, revealedLocation.latitude),
            ],
            [
              Math.max(guessedLocation.longitude, revealedLocation.longitude),
              Math.max(guessedLocation.latitude, revealedLocation.latitude),
            ],
          ],
          {
            padding: cameraPadding,
            maxZoom: 19,
            duration: 900,
          }
        );
      }}
    >
      {guessedLocation && (
        <Marker
          longitude={guessedLocation.longitude}
          latitude={guessedLocation.latitude}
          anchor="bottom"
        >
          <div className="flex flex-col gap-0.5 items-center justify-center mb-1 drop-shadow">
            <span className="bg-primary-950 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Your Guess
            </span>
            <img
              src={MapPinIcon}
              alt="Guessed Location"
              className="w-10 h-10"
            />
          </div>
        </Marker>
      )}

      {revealedLocation && (
        <Marker
          longitude={revealedLocation.longitude}
          latitude={revealedLocation.latitude}
          anchor="bottom"
        >
          <div className="flex flex-col gap-0.5 items-center justify-center mb-[3px] drop-shadow">
            <span className="bg-warning text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              Actual Location
            </span>
            <img
              src={FlagPinIcon}
              alt="Actual location"
              className="w-10 h-10 ml-1 "
            />
          </div>
        </Marker>
      )}

      {lineGeoJson && (
        <Source type="geojson" data={lineGeoJson}>
          <Layer
            id="reveal-line"
            type="line"
            filter={["==", ["geometry-type"], "LineString"]}
            paint={{
              "line-color": "#10121c",
              "line-width": 3,
              "line-dasharray": [4, 2],
            }}
          />
          <Layer
            id="reveal-line-dots"
            type="circle"
            filter={["==", ["geometry-type"], "Point"]}
            paint={{
              "circle-radius": 4,
              "circle-color": "#10121c",
            }}
          />
        </Source>
      )}
    </Map>
  );
}
