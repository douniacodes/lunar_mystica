import { useState } from 'react';
import { useAstronomy } from '../hooks/useAstronomy';
import { LocationInput } from '../components/LocationInput';
import { MoonDataDisplay } from '../components/MoonDataDisplay';
import { DetailedAstronomicalData } from '../components/DetailedAstronomicalData';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { AstrologicalInfluences } from '../components/AstrologicalInfluences';
import type { Location } from '../types/astronomy';

export default function Home() {
  const { moonData, loading, error, calculateMoonData, calculateMoonDataForCity, resetData } = useAstronomy();
  
  const handleLocationSubmit = async (cityName: string) => {
    await calculateMoonDataForCity(cityName);
  };

  const handleCurrentLocation = async (location: Location) => {
    await calculateMoonData(location);
  };

  // Celestial particles component
  const CelestialParticles = () => {
    const particles = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      left: `${10 + i * 10}%`,
      delay: `${i * 0.5}s`,
      duration: `${8 + (i % 5)}s`,
      size: i % 3 === 0 ? 'w-2 h-2' : 'w-1 h-1'
    }));

    return (
      <div className="celestial-particles">
        {particles.map(particle => (
          <div 
            key={particle.id}
            className={`particle ${particle.size}`}
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="celestial-bg">
      <CelestialParticles />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center space-x-4 mb-6">
            <div className="w-20 h-20">
              <img src="/luna-logo.png" alt="Logo Luna Mystica" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-white to-yellow-600 bg-clip-text text-transparent">
                Luna Mystica
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">
                Astrologie Lunaire & Influences Célestes
              </p>
            </div>
          </div>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto"></div>
        </header>

        {/* Location Input */}
        <LocationInput 
          onLocationSubmit={handleLocationSubmit}
          onCurrentLocation={handleCurrentLocation}
          loading={loading}
          error={error?.message || null}
        />

        {/* Moon Data Results */}
        {moonData && (
          <>
            <div className="mb-8 text-center">
              <button 
                onClick={resetData}
                className="glass-card inline-flex items-center px-6 py-3 rounded-xl font-semibold text-foreground hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <i className="fas fa-arrow-left mr-3 text-lg"></i>
                <span>Nouvelle Recherche</span>
              </button>
            </div>
            <MoonDataDisplay moonData={moonData} />
            <DetailedAstronomicalData moonData={moonData} />
            <UpcomingEvents moonData={moonData} />
            <AstrologicalInfluences moonData={moonData} />
          </>
        )}

        {/* Welcome Message */}
        {!moonData && !error && !loading && (
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="welcome-content">
              <div className="text-6xl mb-6">🔮</div>
              <h2 className="text-3xl font-serif font-semibold mb-4">Découvrez la Magie Lunaire</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explorez l'influence de la Lune selon votre position et son signe astrologique
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="data-card p-6 rounded-xl">
                  <div className="text-3xl mb-3">♋</div>
                  <h4 className="font-semibold mb-2">Signe Lunaire</h4>
                  <p className="text-sm text-muted-foreground">
                    Découvrez dans quel signe zodiacal se trouve la Lune
                  </p>
                </div>
                <div className="data-card p-6 rounded-xl">
                  <div className="text-3xl mb-3">📐</div>
                  <h4 className="font-semibold mb-2">Position Exacte</h4>
                  <p className="text-sm text-muted-foreground">
                    Altitude, azimuth et distance précise de la Lune
                  </p>
                </div>
                <div className="data-card p-6 rounded-xl">
                  <div className="text-3xl mb-3">✨</div>
                  <h4 className="font-semibold mb-2">Influences</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprenez les énergies et influences du moment
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-xl font-serif font-semibold mb-4">Guide Rapide des Signes Lunaires</h3>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
                  {Object.entries({
                    'Bélier': '♈', 'Taureau': '♉', 'Gémeaux': '♊', 'Cancer': '♋',
                    'Lion': '♌', 'Vierge': '♍', 'Balance': '♎', 'Scorpion': '♏',
                    'Sagittaire': '♐', 'Capricorne': '♑', 'Verseau': '♒', 'Poissons': '♓'
                  }).map(([name, emoji]) => (
                    <div key={name} className="text-center">
                      <div className="text-2xl zodiac-glow mb-1">{emoji}</div>
                      <div className="text-xs text-muted-foreground">{name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 pb-8">
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mb-6"></div>
          <p className="text-sm text-muted-foreground">
            Données astronomiques calculées avec Astronomy Engine • 
            Calculs astrologiques traditionnels français
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2025 Luna Mystica, Tous Droits Réservés - Développé par Dounia Boukrim avec passion
          </p>
        </footer>
      </div>
    </div>
  );
}
