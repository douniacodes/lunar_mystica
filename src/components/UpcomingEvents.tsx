import { ZODIAC_SIGNS } from '../services/zodiacCalculator';
import type { MoonData } from '../types/astronomy';

interface UpcomingEventsProps {
  moonData: MoonData;
}

export function UpcomingEvents({ moonData }: UpcomingEventsProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getZodiacForDate = (date: Date): string => {
    // Simplified zodiac calculation for upcoming phases
    // In a real implementation, this would calculate the actual zodiac position
    const zodiacKeys = Object.keys(ZODIAC_SIGNS);
    const monthIndex = date.getMonth();
    return zodiacKeys[monthIndex % zodiacKeys.length];
  };

  const upcomingEvents = [
    {
      emoji: '🌕',
      name: 'Pleine Lune',
      date: moonData.nextPhases.fullMoon,
      key: 'full-moon'
    },
    {
      emoji: '🌑',
      name: 'Nouvelle Lune',
      date: moonData.nextPhases.newMoon,
      key: 'new-moon'
    },
    {
      emoji: '🌗',
      name: 'Dernier Quartier',
      date: moonData.nextPhases.lastQuarter,
      key: 'last-quarter'
    },
    {
      emoji: '🌓',
      name: 'Premier Quartier',
      date: moonData.nextPhases.firstQuarter,
      key: 'first-quarter'
    }
  ];

  return (
    <div className="glass-card rounded-2xl p-6 mb-8" data-testid="card-upcoming-events">
      <h3 className="text-2xl font-serif font-semibold mb-6 flex items-center">
        <i className="fas fa-calendar-alt text-accent mr-3"></i>
        Prochains Événements Lunaires
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {upcomingEvents.map((event) => {
          const zodiacSign = getZodiacForDate(event.date);
          
          return (
            <div 
              key={event.key}
              className="data-card rounded-xl p-4 text-center"
              data-testid={`card-${event.key}`}
            >
              <div className="text-3xl mb-2">{event.emoji}</div>
              <p className="font-semibold mb-1">{event.name}</p>
              <p 
                className="text-sm text-muted-foreground" 
                data-testid={`text-${event.key}-date`}
              >
                {formatDate(event.date)}
              </p>
              <p 
                className="text-xs text-accent mt-1"
                data-testid={`text-${event.key}-sign`}
              >
                en {zodiacSign}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
