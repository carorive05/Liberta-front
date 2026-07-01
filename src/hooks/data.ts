import { useState, useEffect } from "react";

interface formattedPlace {
    imageSrc: string,
    title: string,
    category: string,
    distance: number,
    price: number,
    rating: number,
    //horizontal: false,
    ubication: string,
    description: string,
    schedule: string,
    reservation: string,
    maxGroup: number,
    accesibility: { visual: "high", motor: "medium", auditory: "low" }
}

interface PlacesData {
    formattedPlace: formattedPlace[];
}

interface UsePlacesDataResult {
    placesData: PlacesData | null;
    loading: boolean;
    error: string | null;
}

export function usePlacesData(): UsePlacesDataResult {

    const [placesData, setPlacesData] = useState<PlacesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchPlaces() {
            try {
                const response = await fetch('INSERTE ACA EL ENDPOINT', { signal: controller.signal });

                if (!response.ok) {
                    throw new Error(`Failed to load weather data (HTTP ${response.status})`);
                }

                const data: PlacesData = await response.json();


            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return;
                setError(err instanceof Error ? err.message : 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }

        }

        fetchPlaces();

        return () => controller.abort();
     }, []);

    return {placesData, loading, error};
}