export const formatDistance = (km: number | null | undefined): string => {
  if (km === null || km === undefined) return "--";

  if (km < 1) {
    const meters = Math.round(km * 1000);
    return `${meters} M`;
  }

  const formattedKm = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(km);

  return `${formattedKm} KM`;
};