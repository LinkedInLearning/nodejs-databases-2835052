const express = require("express");

module.exports = () => {
  const router = express.Router();

  router.get("/:itemId?", async (req, res) => {
    return res.render("admin/item", {});

    /*
    try {
      const items = await ItemService.getAll();
      let item = null;

      // The optional param itemId is present
      if (req.params.itemId) {
        item = await ItemService.getOne(req.params.itemId);
      }

      return res.render("admin/item", {
        items,
        item,
      });
    } catch (err) {
      return next(err);
    }
    */
  });

  // Save or update item
  router.post("/", async (req, res, next) => {
    return next("Not implemented");

    /*
    // Massage the passed in form data a bit
    const sku = req.body.sku.trim();
    const name = req.body.name.trim();
    const price = req.body.price.trim();

    // Make sure that the passed data is complete
    if (!sku || !name || !price) {
      req.session.messages.push({
        type: "warning",
        text: "Please enter SKU, name and price!",
      });
      return res.redirect("/admin/item");
    }

    try {
      // If there was no existing item we now want to create a new item object
      if (!req.body.itemId) {
        await ItemService.create({ sku, name, price });
      } else {
        const itemData = {
          sku,
          name,
          price,
        };
        await ItemService.update(req.body.itemId, itemData);
      }
      req.session.messages.push({
        type: "success",
        text: `The item was ${
          req.body.itemId ? "updated" : "created"
        } successfully!`,
      });
      return res.redirect("/admin/item");
    } catch (err) {
      req.session.messages.push({
        type: "danger",
        text: "There was an error while saving the item!",
      });
      console.error(err);
      return res.redirect("/admin/item");
    }
    */
  });

  // Delete item
  router.get("/delete/:itemId", async (req, res, next) => {
    return next("Not implemented");

    /*
    try {
      await ItemService.remove(req.params.itemId);
    } catch (err) {
      // Error handling
      req.session.messages.push({
        type: "danger",
        text: "There was an error while deleting the item!",
      });
      console.error(err);
      return res.redirect("/admin/item");
    }
    // Let the item knows that everything went fine
    req.session.messages.push({
      type: "success",
      text: "The item was successfully deleted!",
    });
    return res.redirect("/admin/item");
    */
  });
  return router;
};
