import { AstronomyEngineService } from '../services/astronomyEngine';
import type { MoonData } from '../types/astronomy';

interface DetailedAstronomicalDataProps {
  moonData: MoonData;
}

export function DetailedAstronomicalData({ moonData }: DetailedAstronomicalDataProps) {
  const angularSize = AstronomyEngineService.getMoonAngularSize(moonData.position.distance);
  const magnitude = AstronomyEngineService.getMoonMagnitude(moonData.phase.angle, moonData.position.distance);

  const formatTime = (date: Date | null) => {
    if (!date) return '-:-';
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const calculateVisibilityDuration = () => {
    if (!moonData.times.rise || !moonData.times.set) return 'N/A';
    
    const duration = moonData.times.set.getTime() - moonData.times.rise.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Astronomical Parameters */}
      <div className="glass-card rounded-2xl p-6" data-testid="card-astronomical-data">
        <h3 className="text-2xl font-serif font-semibold mb-6 flex items-center">
          <i className="fas fa-satellite text-primary mr-3"></i>
          Données Astronomiques
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-muted-foreground">Azimut</span>
            <span className="font-mono text-lg" data-testid="text-azimuth">
              {moonData.position.azimuth.toFixed(1)}°
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-muted-foreground">Altitude</span>
            <span className="font-mono text-lg" data-testid="text-altitude">
              {moonData.position.altitude.toFixed(1)}°
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-muted-foreground">Distance</span>
            <span className="font-mono text-lg" data-testid="text-distance">
              {Math.round(moonData.position.distance).toLocaleString('fr-FR')} km
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border/50">
            <span className="text-muted-foreground">Diamètre apparent</span>
            <span className="font-mono text-lg" data-testid="text-angular-size">
              {angularSize.toFixed(1)}'
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Magnitude</span>
            <span className="font-mono text-lg" data-testid="text-magnitude">
              {magnitude.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Rise & Set Times */}
      <div className="glass-card rounded-2xl p-6" data-testid="card-moon-times">
        <h3 className="text-2xl font-serif font-semibold mb-6 flex items-center">
          <i className="fas fa-clock text-accent mr-3"></i>
          Horaires Lunaires
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-arrow-up text-secondary mr-3"></i>
              <span>Lever de Lune</span>
            </div>
            <span className="font-mono text-xl" data-testid="text-moonrise">
              {formatTime(moonData.times.rise)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-circle text-primary mr-3"></i>
              <span>Culmination</span>
            </div>
            <span className="font-mono text-xl" data-testid="text-moon-transit">
              {formatTime(moonData.times.transit)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-arrow-down text-muted-foreground mr-3"></i>
              <span>Coucher de Lune</span>
            </div>
            <span className="font-mono text-xl" data-testid="text-moonset">
              {formatTime(moonData.times.set)}
            </span>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Durée de visibilité</p>
              <p className="text-lg font-semibold" data-testid="text-visibility-duration">
                {calculateVisibilityDuration()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
