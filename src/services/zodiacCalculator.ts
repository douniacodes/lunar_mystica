import type { ZodiacSign } from '../types/astronomy';

export const ZODIAC_SIGNS: Record<string, ZodiacSign> = {
  'Bélier': {
    emoji: '♈',
    name: 'Bélier',
    element: 'Feu',
    color: '#ff6b6b'
  },
  'Taureau': {
    emoji: '♉',
    name: 'Taureau',
    element: 'Terre',
    color: '#a5d6a7'
  },
  'Gémeaux': {
    emoji: '♊',
    name: 'Gémeaux',
    element: 'Air',
    color: '#90caf9'
  },
  'Cancer': {
    emoji: '♋',
    name: 'Cancer',
    element: 'Eau',
    color: '#81d4fa'
  },
  'Lion': {
    emoji: '♌',
    name: 'Lion',
    element: 'Feu',
    color: '#ff6b6b'
  },
  'Vierge': {
    emoji: '♍',
    name: 'Vierge',
    element: 'Terre',
    color: '#a5d6a7'
  },
  'Balance': {
    emoji: '♎',
    name: 'Balance',
    element: 'Air',
    color: '#90caf9'
  },
  'Scorpion': {
    emoji: '♏',
    name: 'Scorpion',
    element: 'Eau',
    color: '#81d4fa'
  },
  'Sagittaire': {
    emoji: '♐',
    name: 'Sagittaire',
    element: 'Feu',
    color: '#ff6b6b'
  },
  'Capricorne': {
    emoji: '♑',
    name: 'Capricorne',
    element: 'Terre',
    color: '#a5d6a7'
  },
  'Verseau': {
    emoji: '♒',
    name: 'Verseau',
    element: 'Air',
    color: '#90caf9'
  },
  'Poissons': {
    emoji: '♓',
    name: 'Poissons',
    element: 'Eau',
    color: '#81d4fa'
  }
};

export const MOON_PHASES = {
  0: { emoji: '🌑', name: 'Nouvelle Lune', influence: 'Nouveaux départs, introspection profonde' },
  1: { emoji: '🌒', name: 'Premier Croissant', influence: 'Croissance, intentions positives' },
  2: { emoji: '🌓', name: 'Premier Quartier', influence: 'Action, décisions importantes' },
  3: { emoji: '🌔', name: 'Lune Gibbeuse', influence: 'Affinement, ajustements nécessaires' },
  4: { emoji: '🌕', name: 'Pleine Lune', influence: 'Épanouissement, révélations' },
  5: { emoji: '🌖', name: 'Lune Disséminante', influence: 'Gratitude, partage des connaissances' },
  6: { emoji: '🌗', name: 'Dernier Quartier', influence: 'Lâcher-prise, pardon' },
  7: { emoji: '🌘', name: 'Dernier Croissant', influence: 'Repos, préparation au renouveau' }
};

export class ZodiacCalculator {
  /**
   * Get zodiac sign information from sign name
   */
  static getZodiacInfo(signName: string): ZodiacSign | null {
    return ZODIAC_SIGNS[signName] || null;
  }

  /**
   * Get astrological influences for moon in specific zodiac sign
   */
  static getAstrologicalInfluences(zodiacSign: string): string[] {
    const influences: Record<string, string[]> = {
      'Bélier': [
        'Période favorable pour initier de nouveaux projets avec courage',
        'Énergie de feu qui stimule l\'action directe et l\'indépendance',
        'Moment idéal pour les décisions rapides et les nouveaux départs'
      ],
      'Taureau': [
        'Favorise la stabilité financière et les investissements durables',
        'Énergie de terre qui renforce la patience et la détermination',
        'Période propice aux plaisirs sensoriels et à l\'art culinaire'
      ],
      'Gémeaux': [
        'Stimule la communication et les échanges intellectuels',
        'Énergie d\'air qui favorise la curiosité et l\'apprentissage',
        'Moment favorable pour les négociations et les contrats'
      ],
      'Cancer': [
        'Renforce l\'intuition et les liens familiaux profonds',
        'Énergie d\'eau qui amplifie l\'empathie et la sensibilité',
        'Période idéale pour les soins à domicile et l\'introspection'
      ],
      'Lion': [
        'Période favorable pour exprimer sa créativité et son charisme naturel',
        'Énergie de feu qui stimule la confiance en soi et l\'expression personnelle',
        'Moment idéal pour les performances artistiques et les projets créatifs'
      ],
      'Vierge': [
        'Favorise l\'organisation minutieuse et les analyses détaillées',
        'Énergie de terre qui renforce la précision et l\'efficacité',
        'Période propice aux soins de santé et à la purification'
      ],
      'Balance': [
        'Stimule l\'harmonie relationnelle et la recherche d\'équilibre',
        'Énergie d\'air qui favorise la diplomatie et l\'esthétique',
        'Moment favorable pour la médiation et les partenariats'
      ],
      'Scorpion': [
        'Intensifie les transformations profondes et la régénération',
        'Énergie d\'eau qui révèle les mystères et les vérités cachées',
        'Période propice à la guérison émotionnelle et aux rituels'
      ],
      'Sagittaire': [
        'Encourage l\'exploration philosophique et les voyages lointains',
        'Énergie de feu qui inspire l\'optimisme et la quête de sens',
        'Moment idéal pour l\'enseignement et l\'expansion spirituelle'
      ],
      'Capricorne': [
        'Renforce l\'ambition professionnelle et la structure hiérarchique',
        'Énergie de terre qui favorise la persévérance et la réussite',
        'Période propice aux engagements à long terme et aux responsabilités'
      ],
      'Verseau': [
        'Stimule l\'innovation technologique et les idées révolutionnaires',
        'Énergie d\'air qui favorise l\'individualité et l\'humanitarisme',
        'Moment favorable pour les projets communautaires et alternatifs'
      ],
      'Poissons': [
        'Amplifie l\'imagination créatrice et la compassion universelle',
        'Énergie d\'eau qui renforce l\'intuition et la spiritualité',
        'Période idéale pour la méditation et l\'expression artistique'
      ]
    };

    return influences[zodiacSign] || [];
  }

  /**
   * Get signs particularly influenced by the current moon position
   */
  static getInfluencedSigns(currentMoonSign: string): string[] {
    const element = ZODIAC_SIGNS[currentMoonSign]?.element;
    if (!element) return [];

    return Object.entries(ZODIAC_SIGNS)
      .filter(([_, sign]) => sign.element === element)
      .map(([name, _]) => name);
  }

  /**
   * Get recommendations based on current moon position and phase
   */
  static getRecommendations(moonSign: string, phaseIndex: number, moonriseTime?: Date): string[] {
    const baseRecommendations = [
      `Méditation au lever de Lune${moonriseTime ? ` (${moonriseTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })})` : ''} pour canaliser l'énergie lunaire`,
      'Rituels de purification et de protection énergétique favorisés',
      'Éviter les décisions impulsives, privilégier la réflexion profonde'
    ];

    const phaseRecommendations: Record<number, string[]> = {
      0: ['Planification de nouveaux projets', 'Rituels de manifestation', 'Méditation introspective'],
      1: ['Passage à l\'action sur les intentions', 'Début de nouveaux cycles', 'Cultiver l\'optimisme'],
      2: ['Prendre des décisions importantes', 'Surmonter les obstacles', 'Affirmer sa volonté'],
      3: ['Ajuster et affiner ses projets', 'Patience et persévérance', 'Préparation à l\'aboutissement'],
      4: ['Célébration et gratitude', 'Rituels de pleine conscience', 'Libération émotionnelle'],
      5: ['Partage des connaissances acquises', 'Enseignement et guidance', 'Générosité spirituelle'],
      6: ['Lâcher prise sur l\'inutile', 'Pardon et réconciliation', 'Nettoyage énergétique'],
      7: ['Repos et récupération', 'Préparation au renouveau', 'Bilan et introspection']
    };

    return [...baseRecommendations, ...(phaseRecommendations[phaseIndex] || [])];
  }
}
