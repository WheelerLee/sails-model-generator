const sharp = require('sharp');

sharp('/Users/wheeler/Desktop/16eb0e711b5e45f4.gif', { animated: true })
  .resize(100).toFile('/Users/wheeler/Desktop/xxx.gif');