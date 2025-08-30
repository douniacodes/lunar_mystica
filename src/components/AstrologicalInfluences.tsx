import { ZodiacCalculator, ZODIAC_SIGNS } from '../services/zodiacCalculator';
import type { MoonData } from '../types/astronomy';

interface AstrologicalInfluencesProps {
  moonData: MoonData;
}

export function AstrologicalInfluences({ moonData }: AstrologicalInfluencesProps) {
  const influences = ZodiacCalculator.getAstrologicalInfluences(moonData.zodiacSign);
  const recommendations = ZodiacCalculator.getRecommendations(
    moonData.zodiacSign, 
    moonData.phase.phaseIndex, 
    moonData.times.rise || undefined
  );
  const influencedSigns = ZodiacCalculator.getInfluencedSigns(moonData.zodiacSign);

  return (
    <div className="glass-card rounded-2xl p-6" data-testid="card-astrological-influences">
      <h3 className="text-2xl font-serif font-semibold mb-6 flex items-center">
        <i className="fas fa-stars text-secondary mr-3"></i>
        Influences Astrologiques Actuelles
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold mb-4 text-accent">
            Influence de la Lune en {moonData.zodiacSign}
          </h4>
          <div className="space-y-3 text-card-foreground">
            {influences.map((influence, index) => (
              <p key={index} className="flex items-start" data-testid={`text-influence-${index}`}>
                <i className="fas fa-chevron-right text-secondary mr-2 mt-1"></i>
                <span>{influence}</span>
              </p>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4 text-accent">Recommandations</h4>
          <div className="space-y-3 text-card-foreground">
            {recommendations.map((recommendation, index) => (
              <p key={index} className="flex items-start" data-testid={`text-recommendation-${index}`}>
                <i className="fas fa-star text-secondary mr-2 mt-1"></i>
                <span>{recommendation}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Signes particulièrement influencés</p>
          <div className="flex justify-center space-x-6" data-testid="influenced-signs">
            {influencedSigns.slice(0, 3).map((signName, index) => {
              const zodiacInfo = ZODIAC_SIGNS[signName];
              const colors = ['var(--secondary)', 'var(--accent)', 'var(--primary)'];
              
              return (
                <div key={signName} className="text-center">
                  <div 
                    className="text-2xl zodiac-glow"
                    style={{ color: colors[index] }}
                    data-testid={`emoji-influenced-sign-${index}`}
                  >
                    {zodiacInfo?.emoji}
                  </div>
                  <p className="text-xs mt-1" data-testid={`text-influenced-sign-${index}`}>
                    {signName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
