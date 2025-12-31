import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useOffscreenIndicator } from "@/hooks/useOffScreenIndicator";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import Map, { Marker, type MapRef } from "react-map-gl/maplibre";
import { Maximize, Minimize, Minus, Plus, RotateCcw } from "lucide-react";

import MapPinIcon from "@/assets/icons/map-pin.svg";
import ArrowIndicatorIcon from "@/assets/icons/arrow-indicator.svg";
import type { Location } from "@/types/game.type";

export default function GuessingMap({
  expanded = false,
  setExpanded,
  selected,
  onSelected,
}: {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  selected: Location | null | undefined;
  onSelected: (location: Location) => void;
}) {
  const [interacting, setInteracting] = useState(false);

  const mapRef = useRef<MapRef | null>(null);
  const containerRef = useRef(null);

  const indicator = useOffscreenIndicator({
    map: mapRef.current,
    longitude: selected?.longitude ?? null,
    latitude: selected?.latitude ?? null,
    containerRef,
    expanded,
    padding: expanded ? 32 : 24,
  });

  const zoomBy = (delta: number) => {
    const map = mapRef.current?.getMap?.();
    if (!map) return;

    map.easeTo({
      zoom: map.getZoom() + delta,
      duration: 200,
    });
  };

  const goTo = (
    longitude: number,
    latitude: number,
    targetZoom: number = 14,
    padding: number = 64
  ) => {
    const map = mapRef.current?.getMap?.();

    if (!map) return;

    const currentZoom = map.getZoom();

    const finalZoom = currentZoom > targetZoom ? currentZoom : targetZoom;

    map.flyTo({
      center: [longitude, latitude],
      zoom: finalZoom,
      essential: true,
      duration: 1000,
      padding: { top: padding },
    });
  };

  useEffect(() => {
    const stopInteracting = () => setInteracting(false);

    window.addEventListener("pointerup", stopInteracting);
    window.addEventListener("pointercancel", stopInteracting);

    return () => {
      window.removeEventListener("pointerup", stopInteracting);
      window.removeEventListener("pointercancel", stopInteracting);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className={cn(
          "overflow-hidden rounded-xl border border-white/10 backdrop-blur-sm",
          "transition-opacity duration-200",
          expanded || interacting ? "opacity-100" : "opacity-80"
        )}
      >
        {selected && (
          <AnimatePresence>
            {indicator && (
              <motion.div
                key="indicator"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                  position: "absolute",
                  left: indicator.x,
                  top: indicator.y,
                  zIndex: 20,
                }}
              >
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <img
                    src={ArrowIndicatorIcon}
                    alt="Map direction"
                    className={cn(
                      expanded ? "min-w-10 min-h-10" : "min-w-6 min-h-6",
                      "drop-shadow cursor-pointer"
                    )}
                    style={{
                      transform: `rotate(${indicator.angle + 90}deg)`,
                      transformOrigin: "50% 50%",
                    }}
                    onClick={() =>
                      goTo(selected.longitude, selected.latitude, 15, expanded ? 54 : 100)
                    }
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <Map
          ref={mapRef}
          mapStyle="http://localhost:8090/styles/bright/style.json"
          style={{
            width: "100%",
            aspectRatio: 5/3
          }}
          onClick={(e) => {
            const { lng: longitude, lat: latitude } = e.lngLat;
            onSelected({ latitude, longitude });
          }}
          onMoveStart={() => setInteracting(true)}
          onMoveEnd={() => setInteracting(false)}
        >
          {selected && (
            <Marker longitude={selected.longitude} latitude={selected.latitude}>
              <div className="flex flex-col gap-0.5 items-center justify-center mb-14 drop-shadow">
                <span className="bg-primary-500 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  Your Guess
                </span>
                <img
                  src={MapPinIcon}
                  alt="Map pin"
                  className="w-10 h-10 text-primary-500"
                />
              </div>
            </Marker>
          )}
        </Map>
      </div>

      <button
        onClick={() => setExpanded((v: boolean) => !v)}
        aria-label={expanded ? "Collapse map" : "Expand map"}
        className={cn(
          "absolute top-3 left-3 z-30",
          "w-8 h-8 flex items-center justify-center",
          "rounded-lg",
          "bg-black/30 text-white backdrop-blur-sm",
          "hover:bg-black/50 transition-colors cursor-pointer"
        )}
      >
        {expanded ? (
          <Minimize className="w-4 h-4" />
        ) : (
          <Maximize className="w-4 h-4" />
        )}
      </button>

      <div className="absolute top-3 right-3 z-30 flex flex-col gap-px">
        <button
          onClick={() => zoomBy(+1)}
          aria-label="Zoom in"
          className="w-8 h-8 flex items-center justify-center rounded-t-lg bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors cursor-zoom-in"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={() => zoomBy(-1)}
          aria-label="Zoom out"
          className="w-8 h-8 flex items-center justify-center bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors cursor-zoom-out"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            const map = mapRef.current?.getMap?.();
            if (!map) return;

            map.easeTo({
              bearing: 0,
              pitch: 0,
              duration: 300,
            });
          }}
          aria-label="Reset map orientation"
          className="w-8 h-8 flex items-center justify-center rounded-b-lg bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}