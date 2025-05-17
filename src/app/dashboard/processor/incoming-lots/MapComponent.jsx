import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ lat, lng, lotId }) {
  useEffect(() => {
    // Remove any existing map instance
    if (window._leafletMap) {
      window._leafletMap.remove();
      window._leafletMap = null;
    }
    const map = L.map("lot-map-container", {
      center: [lat, lng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      touchZoom: false,
    });
    window._leafletMap = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`Lot ${lotId}`)
      .openPopup();
    return () => {
      map.remove();
      window._leafletMap = null;
    };
  }, [lat, lng, lotId]);

  return (
    <div id="lot-map-container" style={{ width: "100%", height: "100%", borderRadius: "0.75rem" }} />
  );
}