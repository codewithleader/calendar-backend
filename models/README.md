# Mongoose
[Documentation](https://mongoosejs.com/docs/index.html)

How create a Schema?
```
const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { collection: 'users'}
);

model.exports = mongoose.model('Name', nameSchema);
```

- Or destructuring like this:
```
const { Schema, model } = require('mongoose');

const nameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  { collection: 'users'}
);

model.exports = model('Name', nameSchema);
```

# Collection Name:
[Option: collection](https://mongoosejs.com/docs/guide.html#collection)

- Mongoose by default produces a collection name by passing the model name to the utils.toCollectionName method. This method pluralizes the name. Set this option if you need a different name for your collection.
```
const nameSchema = new Schema({..}, { collection: 'myCustomCollectionName' });
```