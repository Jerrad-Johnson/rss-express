const cors = require('cors');
const corsSettings = require('../common/corsSettings');

exports.corsDecorated = cors(corsSettings);
