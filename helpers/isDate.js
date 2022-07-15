const dayjs = require('dayjs'); // Read more about dayjs in README.md

const isDate = value => {
  if (!value) {
    return false;
  }

  const date = dayjs(value);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
