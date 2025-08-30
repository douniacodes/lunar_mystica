import * as Astronomy from 'astronomy-engine';
import type { MoonData, MoonPosition, MoonTimes, Location } from '../types/astronomy';

export class AstronomyEngineService {
  /**
   * Calculate comprehensive moon data for a given location and time
   */
  static calculateMoonData(location: Location, date: Date = new Date()): MoonData {
    const astroTime = new Astronomy.AstroTime(date);
    const observer = new Astronomy.Observer(location.latitude, location.longitude, 0);
    
    // Get moon position
    const moonPosition = this.calculateMoonPosition(observer, astroTime);
    
    // Calculate moon phase
    const phaseData = this.calculateMoonPhase(astroTime);
    
    // Calculate moon times (rise, set, transit)
    const times = this.calculateMoonTimes(observer, astroTime);
    
    // Calculate zodiac position
    const zodiacData = this.calculateZodiacPosition(moonPosition.eclipticLongitude);
    
    // Calculate next phases
    const nextPhases = this.calculateNextPhases(astroTime);
    
    return {
      date,
      location,
      position: moonPosition,
      phase: phaseData,
      zodiacSign: zodiacData.sign,
      zodiacDegrees: zodiacData.degrees,
      times,
      nextPhases,
    };
  }

  /**
   * Calculate precise moon position using Astronomy Engine
   */
  private static calculateMoonPosition(observer: Astronomy.Observer, astroTime: Astronomy.AstroTime): MoonPosition {
    // Get moon geocentric position vector
    const moonVector = Astronomy.GeoVector(Astronomy.Body.Moon, astroTime, false);
    
    // Get moon equatorial coordinates
    const moonEquatorial = Astronomy.Equator(Astronomy.Body.Moon, astroTime, observer, true, true);
    
    // Calculate ecliptic longitude using the built-in function
    const eclipticLongitude = Astronomy.EclipticLongitude(Astronomy.Body.Moon, astroTime);
    
    // Get horizontal coordinates (azimuth/altitude)
    const horizon = Astronomy.Horizon(astroTime, observer, moonEquatorial.ra, moonEquatorial.dec, 'normal');
    
    // Calculate distance from vector length (in AU, convert to km)
    const distance = Math.sqrt(moonVector.x * moonVector.x + moonVector.y * moonVector.y + moonVector.z * moonVector.z) * 149597870.7;
    
    return {
      eclipticLongitude,
      eclipticLatitude: 0, // Simplified for now
      distance,
      azimuth: horizon.azimuth,
      altitude: horizon.altitude,
      rightAscension: moonEquatorial.ra,
      declination: moonEquatorial.dec,
    };
  }

  /**
   * Calculate moon phase data with precise illumination
   */
  private static calculateMoonPhase(astroTime: Astronomy.AstroTime) {
    const phaseAngle = Astronomy.MoonPhase(astroTime);
    const illumination = Astronomy.Illumination(Astronomy.Body.Moon, astroTime);
    
    // Convert phase angle to phase index (0-7)
    const phaseIndex = Math.round((phaseAngle * 8) / 360) % 8;
    
    return {
      illumination: illumination.phase_fraction * 100, // Convert to percentage
      angle: phaseAngle,
      phaseIndex,
    };
  }

  /**
   * Calculate moon rise, set, and transit times
   */
  private static calculateMoonTimes(observer: Astronomy.Observer, astroTime: Astronomy.AstroTime): MoonTimes {
    try {
      const searchDate = astroTime;
      
      // Search for moon rise
      let rise: Date | null = null;
      try {
        const riseEvent = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, 1, searchDate, 1, 10);
        rise = riseEvent ? riseEvent.date : null;
      } catch {
        rise = null;
      }
      
      // Search for moon set
      let set: Date | null = null;
      try {
        const setEvent = Astronomy.SearchRiseSet(Astronomy.Body.Moon, observer, -1, searchDate, 1, 10);
        set = setEvent ? setEvent.date : null;
      } catch {
        set = null;
      }
      
      // Calculate transit (highest point)
      let transit: Date | null = null;
      try {
        const transitEvent = Astronomy.SearchHourAngle(Astronomy.Body.Moon, observer, 0, searchDate, 1);
        transit = transitEvent ? transitEvent.time.date : null;
      } catch {
        transit = null;
      }
      
      return { rise, set, transit };
    } catch {
      return { rise: null, set: null, transit: null };
    }
  }

  /**
   * Calculate zodiac sign and degrees from ecliptic longitude
   */
  private static calculateZodiacPosition(eclipticLongitude: number) {
    const zodiacSigns = [
      'Bélier', 'Taureau', 'Gémeaux', 'Cancer',
      'Lion', 'Vierge', 'Balance', 'Scorpion',
      'Sagittaire', 'Capricorne', 'Verseau', 'Poissons'
    ];
    
    const signIndex = Math.floor(eclipticLongitude / 30);
    const degrees = eclipticLongitude % 30;
    
    return {
      sign: zodiacSigns[signIndex],
      degrees: Math.round(degrees * 10) / 10,
    };
  }

  /**
   * Calculate next moon phases
   */
  private static calculateNextPhases(astroTime: Astronomy.AstroTime) {
    try {
      // Find next quarter phases
      const newMoonEvent = Astronomy.SearchMoonQuarter(astroTime);
      const firstQuarter = Astronomy.NextMoonQuarter(newMoonEvent);
      const fullMoon = Astronomy.NextMoonQuarter(firstQuarter);
      const lastQuarter = Astronomy.NextMoonQuarter(fullMoon);
      
      return {
        newMoon: newMoonEvent.time.date,
        firstQuarter: firstQuarter.time.date,
        fullMoon: fullMoon.time.date,
        lastQuarter: lastQuarter.time.date,
      };
    } catch {
      // Fallback to approximate dates
      const now = astroTime.date;
      return {
        newMoon: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        firstQuarter: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        fullMoon: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000),
        lastQuarter: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000),
      };
    }
  }

  /**
   * Get moon angular size in arcminutes
   */
  static getMoonAngularSize(distance: number): number {
    // Moon's average angular diameter is about 31.1 arcminutes
    // Scale inversely with distance (closer = larger apparent size)
    const averageDistance = 384402; // km
    const averageAngularSize = 31.1; // arcminutes
    
    return (averageAngularSize * averageDistance) / distance;
  }

  /**
   * Get moon magnitude (brightness)
   */
  static getMoonMagnitude(phase: number, distance: number): number {
    // Approximate moon magnitude based on phase and distance
    const fullMoonMagnitude = -12.6;
    const phaseEffect = Math.cos((phase * Math.PI) / 180);
    const distanceEffect = 5 * Math.log10(distance / 384402);
    
    return fullMoonMagnitude - 2.5 * Math.log10(Math.abs(phaseEffect)) + distanceEffect;
  }
}
