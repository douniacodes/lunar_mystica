# ![Lunar Mystica](./preview-lunarmystica.png)

# Lunar Mystica

Lunar Mystica est une application moderne développée avec **React**, **TypeScript** et **Vite**, conçue pour les passionnés d'astrologie et des cycles lunaires. Elle permet de calculer les influences astrologiques et de suivre les phases de la lune pour harmoniser son quotidien. Ce projet est inspiré de l'application "Moon" sur ios et a été amélioré. 

## Fonctionnalités

L'application s'appuie sur un moteur de calcul astrologique complet (`ZodiacCalculator`) offrant :

- **Calcul du Signe du Zodiaque :** Informations détaillées sur les 12 signes (élément, couleur, symbolique).
- **Suivi des Phases Lunaires :** Analyse des 8 phases de la lune (de la Nouvelle Lune à la Lune Balsamique).
- **Influences Astrologiques :** Conseils personnalisés basés sur la position de la lune dans les signes.
- **Recommandations Quotidiennes :** Suggestions de rituels, méditations et actions à privilégier (ex: rituels de manifestation, libération émotionnelle).
- **Signes Influencés :** Identification des signes partageant le même élément que la lune actuelle pour une analyse plus fine.

## Technologies utilisées

- **React 18** - Bibliothèque UI.
- **TypeScript** - Pour un typage robuste et une meilleure maintenabilité.
- **Vite** - Pour un environnement de développement ultra-rapide.
- **ESLint** - Configuration stricte pour la qualité du code.

## Installation

1. **Cloner le projet**
   ```bash
   git clone "https://github.com/douniacodes/lunar_mystica"
   cd lunar-mystica-app
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application en mode développement**
   ```bash
   npm run dev
   ```

4. **Builder pour la production**
   ```bash
   npm run build
   ```

## Structure du projet

- `/src/services` : Contient la logique métier, notamment `zodiacCalculator.ts`.
- `/src/types` : Définitions TypeScript pour les objets astronomiques.
- `/src/components` : Composants UI de l'application.

## Configuration de Qualité

Le projet est configuré avec des règles de linting avancées (Type-aware linting) pour garantir la sécurité du typage et la qualité du code React.

---

Développé avec passion par Dounia Boukrim (@douniacodes)

