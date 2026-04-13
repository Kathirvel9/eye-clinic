const RouteDetails = require("../models/RouteDetail");

// ── READ ALL ─────────────────────────────────────────────────────────────
exports.getRouteDetails = async (req, res) => {
  try {
    const routes = await RouteDetails.findAll();
    
    // ✅ Frontend expect பண்ற format-க்கு map பண்ணு
    const mapped = routes.map(r => ({
      id: r.RouteID,
      place: r.RoutePlace,
    }));
    
    return res.status(200).json(mapped);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch route details.", error: error.message });
  }
};

// ── CREATE ───────────────────────────────────────────────────────────────
exports.createRouteDetail = async (req, res) => {
  try {
    const { place } = req.body;

    if (!place || !place.trim()) {
      return res.status(400).json({ message: "Route place is required." });
    }

    const newRoute = await RouteDetails.create({
      RoutePlace: place.trim(),
    });

    // ✅ id, place format-ல return பண்ணு
    return res.status(201).json({
      id: newRoute.RouteID,
      place: newRoute.RoutePlace,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create route detail.", error: error.message });
  }
};

// ── READ SINGLE ──────────────────────────────────────────────────────────
exports.getRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await RouteDetails.findByPk(id);

    if (!route) return res.status(404).json({ message: "Route not found." });

    // ✅ map பண்ணு
    return res.status(200).json({
      id: route.RouteID,
      place: route.RoutePlace,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch route detail.", error: error.message });
  }
};

// ── UPDATE ───────────────────────────────────────────────────────────────
exports.updateRouteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { place } = req.body;

    const route = await RouteDetails.findByPk(id);
    if (!route) return res.status(404).json({ message: "Route not found." });

    await route.update({ RoutePlace: place.trim() });

    // ✅ map பண்ணு
    return res.status(200).json({
      id: route.RouteID,
      place: route.RoutePlace,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update route.", error: error.message });
  }
};

// ── DELETE ───────────────────────────────────────────────────────────────
exports.deleteRouteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await RouteDetails.findByPk(id);

    if (!route) return res.status(404).json({ message: "Route not found." });

    await route.destroy();
    return res.status(200).json({ message: "Route deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete route.", error: error.message });
  }
};