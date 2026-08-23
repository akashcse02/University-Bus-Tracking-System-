import { useMemo, useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/skeleton";

interface Location {
  lat: number;
  lng: number;
}

interface BusMarker {
  id: string;
  busNumber: string;
  location: Location;
  occupancy?: "low" | "medium" | "high";
  status?: string;
}

interface GoogleLiveMapProps {
  apiKey?: string;
  center?: Location;
  zoom?: number;
  buses?: BusMarker[];
  path?: Location[];
  showTraffic?: boolean;
}

const defaultCenter = {
  lat: 24.8949, // Pundra University coordinates
  lng: 89.3758,
};

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1.5rem',
};

export function GoogleLiveMap({ 
  apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", 
  center = defaultCenter, 
  zoom = 15,
  buses = [],
  path = []
}: GoogleLiveMapProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey
  });

  const [selectedBus, setSelectedBus] = useState<BusMarker | null>(null);

  const options = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: false,
    scrollwheel: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  }), []);

  if (!isLoaded) {
    return <Skeleton className="w-full h-full rounded-[1.5rem]" />;
  }

  if (!apiKey) {
    return (
      <div className="w-full h-full rounded-[1.5rem] bg-slate-100 flex items-center justify-center p-8 text-center border-2 border-dashed border-slate-200">
        <div className="max-w-xs">
          <p className="font-bold text-slate-400 mb-2">Google Maps API Key Required</p>
          <p className="text-sm text-slate-400">Please provide a valid API key to enable live GPS tracking on the map.</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={options}
    >
      {/* Route Polyline */}
      {path.length > 0 && (
        <Polyline
          path={path}
          options={{
            strokeColor: "#3B82F6",
            strokeOpacity: 0.8,
            strokeWeight: 4,
          }}
        />
      )}

      {/* Bus Markers */}
      {buses.map((bus) => (
        <Marker
          key={bus.id}
          position={bus.location}
          onClick={() => setSelectedBus(bus)}
          icon={{
            url: "https://maps.google.com/mapfiles/kml/shapes/bus.png",
            scaledSize: new window.google.maps.Size(32, 32),
          }}
        />
      ))}

      {selectedBus && (
        <InfoWindow
          position={selectedBus.location}
          onCloseClick={() => setSelectedBus(null)}
        >
          <div className="p-2 min-w-[120px]">
            <h4 className="font-bold text-ink mb-1">Bus {selectedBus.busNumber}</h4>
            <p className="text-xs text-slate-500 mb-2">Occupancy: <span className="capitalize font-bold text-primary">{selectedBus.occupancy || 'Unknown'}</span></p>
            <div className="h-px bg-slate-100 my-2" />
            <button className="text-xs font-bold text-blue-600 hover:underline">Track this bus</button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
