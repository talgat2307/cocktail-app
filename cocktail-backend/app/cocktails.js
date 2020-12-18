const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const config = require('../config');
const Cocktail = require('../model/Cocktail');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const cocktails = await Cocktail.find();
    res.send(cocktails);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    res.send(cocktail);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post('/', [auth, permit('user', 'admin'), upload.single('image')], async (req, res) => {

  console.log(req.body);
    const cocktail = new Cocktail({
      ...req.body,
      user: req.user._id,
      ingredients: JSON.parse(req.body.ingredients),
    });
    if (req.file) {
      cocktail.image = req.file.filename;
    }

    try {
      await cocktail.save();
      res.send(cocktail);
    } catch (e) {
      res.status(400).send(e);
    }
  });

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const cocktail = await Cocktail.findByIdAndDelete(req.params.id);
    res.send({ message: 'Success' });
  } catch (e) {
    res.send(e);
  }
});

router.put('/:id', [auth, permit('admin')], async (req, res) => {
  try {
    const cocktail = await Cocktail.updateOne({ _id: req.params.id },
      {
        $set: { published: true },
      },
    );
    res.send({ message: 'Success' });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;