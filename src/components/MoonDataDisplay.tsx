import { AstronomyEngineService } from '../services/astronomyEngine';
import { ZODIAC_SIGNS, MOON_PHASES } from '../services/zodiacCalculator';
import type { MoonData } from '../types/astronomy';

interface MoonDataDisplayProps {
  moonData: MoonData;
}

export function MoonDataDisplay({ moonData }: MoonDataDisplayProps) {
  const zodiacInfo = ZODIAC_SIGNS[moonData.zodiacSign];
  const phaseInfo = MOON_PHASES[moonData.phase.phaseIndex as keyof typeof MOON_PHASES];
  const angularSize = AstronomyEngineService.getMoonAngularSize(moonData.position.distance);
  const magnitude = AstronomyEngineService.getMoonMagnitude(moonData.phase.angle, moonData.position.distance);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Current Moon Phase Card */}
      <div className="data-card rounded-2xl p-6 backdrop-blur-sm" data-testid="card-moon-phase">
        <div className="text-center">
          <div className="text-6xl mb-4 zodiac-glow">{phaseInfo.emoji}</div>
          <h3 className="text-xl font-serif font-semibold mb-2">{phaseInfo.name}</h3>
          <div className="text-2xl font-bold text-secondary mb-1" data-testid="text-illumination">
            {Math.round(moonData.phase.illumination)}%
          </div>
          <p className="text-sm text-muted-foreground">illuminée</p>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-card-foreground" data-testid="text-phase-influence">
              {phaseInfo.influence}
            </p>
          </div>
        </div>
      </div>

      {/* Zodiac Position Card */}
      <div className="data-card rounded-2xl p-6 backdrop-blur-sm" data-testid="card-zodiac">
        <div className="text-center">
          <div 
            className="text-5xl mb-3 zodiac-glow" 
            style={{ color: 'var(--secondary)' }}
            data-testid="emoji-zodiac"
          >
            {zodiacInfo?.emoji || '♈'}
          </div>
          <h3 className="text-xl font-serif font-semibold mb-2">
            Lune en <span data-testid="text-zodiac-name">{moonData.zodiacSign}</span>
          </h3>
          <div className="inline-flex items-center bg-accent/20 rounded-full px-3 py-1 mb-3">
            <span 
              className="w-3 h-3 rounded-full bg-secondary mr-2"
              style={{ backgroundColor: zodiacInfo?.color || 'var(--secondary)' }}
            ></span>
            <span className="text-sm font-medium" data-testid="text-zodiac-element">
              {zodiacInfo?.element || 'Feu'}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Longitude:</span>
              <span className="font-mono" data-testid="text-ecliptic-longitude">
                {moonData.position.eclipticLongitude.toFixed(1)}°
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Position:</span>
              <span data-testid="text-zodiac-degrees">
                {moonData.zodiacDegrees.toFixed(1)}° {moonData.zodiacSign}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Location & Time Card */}
      <div className="data-card rounded-2xl p-6 backdrop-blur-sm md:col-span-2 lg:col-span-1" data-testid="card-location">
        <div className="text-center">
          <i className="fas fa-map-marker-alt text-3xl text-primary-foreground mb-3"></i>
          <h3 className="text-lg font-serif font-semibold mb-3" data-testid="text-location-city">
            {moonData.location.city}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Latitude:</span>
              <span className="font-mono" data-testid="text-latitude">
                {moonData.location.latitude.toFixed(4)}°{moonData.location.latitude >= 0 ? 'N' : 'S'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Longitude:</span>
              <span className="font-mono" data-testid="text-longitude">
                {Math.abs(moonData.location.longitude).toFixed(4)}°{moonData.location.longitude >= 0 ? 'E' : 'W'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Heure locale:</span>
              <span data-testid="text-current-time">
                {moonData.date.toLocaleTimeString('fr-FR', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
