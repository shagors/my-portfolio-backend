const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one item
router.get("/:id", getItem, (req, res) => {
  res.json(res.item);
});

// CREATE an item
router.post("/", async (req, res) => {
  const item = new Item({
    image: req.body.image,
    category: req.body.category,
    name: req.body.name,
    description: req.body.description,
    link: req.body.link,
    github: req.body.github,
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an item
router.patch("/:id", getItem, async (req, res) => {
  if (req.body.image != null) {
    res.item.image = req.body.image;
  }
  if (req.body.category != null) {
    res.item.category = req.body.category;
  }
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.description != null) {
    res.item.description = req.body.description;
  }
  if (req.body.link != null) {
    res.item.link = req.body.link;
  }
  if (req.body.github != null) {
    res.item.github = req.body.github;
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an item
router.delete("/:id", getItem, async (req, res) => {
  try {
    await res.item.remove();
    res.json({ message: "Deleted Item" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item == null) {
      return res.status(404).json({ message: "Cannot find item" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.item = item;
  next();
}

module.exports = router;
