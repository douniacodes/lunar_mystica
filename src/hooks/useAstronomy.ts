import { useState, useEffect } from 'react';
import { AstronomyEngineService } from '../services/astronomyEngine';
import type { MoonData, Location, AstronomyError } from '../types/astronomy';

interface AstronomyState {
  moonData: MoonData | null;
  loading: boolean;
  error: AstronomyError | null;
}

export function useAstronomy() {
  const [state, setState] = useState<AstronomyState>({
    moonData: null,
    loading: false,
    error: null,
  });

  const calculateMoonData = async (location: Location): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const moonData = AstronomyEngineService.calculateMoonData(location);
      setState({
        moonData,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        moonData: null,
        loading: false,
        error: {
          code: 'CALCULATION_ERROR',
          message: 'Erreur lors du calcul des données astronomiques',
        },
      });
    }
  };

  const geocodeCity = async (cityName: string): Promise<Location> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1&addressdetails=1&accept-language=fr`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors de la géolocalisation');
      }
      
      const data = await response.json();
      
      if (!data || data.length === 0) {
        throw new Error('Ville non trouvée');
      }

      const result = data[0];
      return {
        city: result.display_name.split(',')[0],
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Erreur lors de la géolocalisation');
    }
  };

  const calculateMoonDataForCity = async (cityName: string): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const location = await geocodeCity(cityName);
      await calculateMoonData(location);
    } catch (error) {
      setState({
        moonData: null,
        loading: false,
        error: {
          code: 'GEOCODING_ERROR',
          message: error instanceof Error ? error.message : 'Ville non trouvée',
        },
      });
    }
  };

  // Auto-refresh every minute
  useEffect(() => {
    if (!state.moonData) return;

    const interval = setInterval(() => {
      calculateMoonData(state.moonData!.location);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [state.moonData?.location]);

  const resetData = () => {
    setState({
      moonData: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...state,
    calculateMoonData,
    calculateMoonDataForCity,
    geocodeCity,
    resetData,
  };
}
