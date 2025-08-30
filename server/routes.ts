import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Geocoding endpoint for city lookup
  app.get("/api/geocode/:cityName", async (req, res) => {
    try {
      const { cityName } = req.params;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1&addressdetails=1&accept-language=fr`
      );
      
      if (!response.ok) {
        return res.status(500).json({ error: 'Erreur lors de la géolocalisation' });
      }
      
      const data = await response.json();
      
      if (!data || data.length === 0) {
        return res.status(404).json({ error: 'Ville non trouvée' });
      }

      const result = data[0];
      res.json({
        city: result.display_name.split(',')[0],
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        fullName: result.display_name
      });
    } catch (error) {
      console.error('Geocoding error:', error);
      res.status(500).json({ error: 'Erreur lors de la géolocalisation' });
    }
  });

  // Reverse geocoding endpoint for coordinates to city name
  app.get("/api/reverse-geocode/:lat/:lon", async (req, res) => {
    try {
      const { lat, lon } = req.params;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=fr`
      );
      
      if (!response.ok) {
        return res.status(500).json({ error: 'Erreur lors de la géolocalisation inverse' });
      }
      
      const data = await response.json();
      
      const city = data.address?.city || 
                  data.address?.town || 
                  data.address?.village || 
                  data.display_name?.split(',')[0] || 
                  'Position inconnue';

      res.json({
        city,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        fullName: data.display_name
      });
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      res.status(500).json({ error: 'Erreur lors de la géolocalisation inverse' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
