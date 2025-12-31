import { useEffect, useState, type RefObject } from "react";

export function useOffscreenIndicator({
  map,
  longitude,
  latitude,
  containerRef,
  expanded,
  padding = 32,
}: {
  map: any;
  longitude: number | null;
  latitude: number | null;
  containerRef: RefObject<HTMLElement | null>;
  expanded?: boolean;
  padding?: number;
}): { x: number; y: number; angle: number } | null {
  const [state, setState] = useState<{
    x: number;
    y: number;
    angle: number;
  } | null>(null);

  useEffect(() => {
    if (!map || longitude == null || latitude == null) return;

    const update = () => {
      const bounds = map.getBounds();
      const inView =
        longitude >= bounds.getWest() &&
        longitude <= bounds.getEast() &&
        latitude >= bounds.getSouth() &&
        latitude <= bounds.getNorth();

      if (inView) {
        setState(null);
        return;
      }

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const projected = map.project([longitude, latitude]);

      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const angle =
        Math.atan2(projected.y - cy, projected.x - cx) * (180 / Math.PI);

      const clampedX = Math.min(
        Math.max(projected.x, padding),
        rect.width - padding
      );

      const clampedY = Math.min(
        Math.max(projected.y, padding),
        rect.height - padding
      );

      setState({
        x: clampedX,
        y: clampedY,
        angle,
      });
    };

    update();

    map.on("move", update);
    map.on("zoom", update);
    map.on("resize", update);

    return () => {
      map.off("move", update);
      map.off("zoom", update);
      map.off("resize", update);
    };
  }, [map, longitude, latitude, expanded, padding]);

  return state;
}
