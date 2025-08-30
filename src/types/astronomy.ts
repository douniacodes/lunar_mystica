export interface MoonPhase {
  emoji: string;
  name: string;
  influence: string;
}

export interface ZodiacSign {
  emoji: string;
  name: string;
  element: string;
  color: string;
}

export interface Location {
  city: string;
  latitude: number;
  longitude: number;
}

export interface MoonPosition {
  eclipticLongitude: number;
  eclipticLatitude: number;
  distance: number;
  azimuth: number;
  altitude: number;
  rightAscension: number;
  declination: number;
}

export interface MoonTimes {
  rise: Date | null;
  set: Date | null;
  transit: Date | null;
}

export interface MoonData {
  date: Date;
  location: Location;
  position: MoonPosition;
  phase: {
    illumination: number;
    angle: number;
    phaseIndex: number;
  };
  zodiacSign: string;
  zodiacDegrees: number;
  times: MoonTimes;
  nextPhases: {
    newMoon: Date;
    firstQuarter: Date;
    fullMoon: Date;
    lastQuarter: Date;
  };
}

export interface AstronomyError {
  code: string;
  message: string;
}