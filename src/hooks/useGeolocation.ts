import { useState } from 'react';

interface GeolocationState {
  location: { city: string; latitude: number; longitude: number } | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    loading: false,
    error: null,
  });

  const getCurrentLocation = async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    if (!navigator.geolocation) {
      setState({
        location: null,
        loading: false,
        error: 'La géolocalisation n\'est pas supportée par ce navigateur',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Reverse geocoding to get city name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=fr`
          );
          
          if (!response.ok) {
            throw new Error('Erreur lors de la géolocalisation inverse');
          }
          
          const data = await response.json();
          const city = data.address?.city || data.address?.town || data.address?.village || 'Position actuelle';
          
          setState({
            location: { city, latitude, longitude },
            loading: false,
            error: null,
          });
        } catch (error) {
          setState({
            location: null,
            loading: false,
            error: 'Erreur lors de la récupération du nom de la ville',
          });
        }
      },
      (error) => {
        let errorMessage = 'Erreur de géolocalisation';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Accès à la géolocalisation refusé';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Position non disponible';
            break;
          case error.TIMEOUT:
            errorMessage = 'Délai de géolocalisation dépassé';
            break;
        }
        setState({
          location: null,
          loading: false,
          error: errorMessage,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  return {
    ...state,
    getCurrentLocation,
  };
}
