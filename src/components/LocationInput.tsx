import { useState } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';

interface LocationInputProps {
  onLocationSubmit: (cityName: string) => void;
  onCurrentLocation: (location: { city: string; latitude: number; longitude: number }) => void;
  loading: boolean;
  error: string | null;
}

export function LocationInput({ onLocationSubmit, onCurrentLocation, loading, error }: LocationInputProps) {
  const [city, setCity] = useState('');
  const { location: geoLocation, loading: geoLoading, error: geoError, getCurrentLocation } = useGeolocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onLocationSubmit(city.trim());
    }
  };

  const handleCurrentLocation = async () => {
    await getCurrentLocation();
  };

  // Pass geolocation result to parent
  if (geoLocation && !geoLoading) {
    onCurrentLocation(geoLocation);
  }

  return (
    <div className="glass-card rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-serif font-semibold mb-6 text-center text-card-foreground">
        <i className="fas fa-map-marker-alt text-primary mr-3"></i>
        Découvrez Votre Position Lunaire
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Entrez votre ville (ex: Paris, Lyon, Marseille...)"
            className="glass-input w-full px-6 py-4 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none text-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            data-testid="input-city"
            disabled={loading || geoLoading}
          />
          <i className="fas fa-search absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
        </div>
        
        <div className="flex space-x-4">
          <button 
            type="submit"
            className="flex-1 bg-gradient-to-r from-white to-yellow-500 hover:from-yellow-500 hover:to-white text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            data-testid="button-calculate"
            disabled={loading || geoLoading || !city.trim()}
          >
            {loading ? (
              <>
                <div className="loading-spinner mr-2 inline-block"></div>
                Calcul en cours...
              </>
            ) : (
              <>
                <i className="fas fa-moon mr-2"></i>
                Calculer Position
              </>
            )}
          </button>
          
          <button 
            type="button"
            className="flex-1 bg-gradient-to-r from-muted to-border hover:from-border hover:to-muted text-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-geolocation"
            onClick={handleCurrentLocation}
            disabled={loading || geoLoading}
          >
            {geoLoading ? (
              <>
                <div className="loading-spinner mr-2 inline-block"></div>
                Localisation...
              </>
            ) : (
              <>
                <i className="fas fa-location-crosshairs mr-2"></i>
                Ma Position
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error States */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mt-4" data-testid="error-astronomy">
          <div className="flex items-center">
            <i className="fas fa-exclamation-triangle text-destructive mr-3"></i>
            <span className="text-destructive">{error}</span>
          </div>
        </div>
      )}

      {geoError && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mt-4" data-testid="error-geolocation">
          <div className="flex items-center">
            <i className="fas fa-location-arrow text-destructive mr-3"></i>
            <span className="text-destructive">{geoError}</span>
          </div>
        </div>
      )}
    </div>
  );
}
