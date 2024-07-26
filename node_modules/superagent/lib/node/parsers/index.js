'use strict';

exports['application/x-www-form-urlencoded'] = require('superagent/lib/node/parsers/urlencoded');
exports['application/json'] = require('superagent/lib/node/parsers/json');
exports.text = require('superagent/lib/node/parsers/text');

const binary = require('superagent/lib/node/parsers/image');
exports['application/octet-stream'] = binary;
exports['application/pdf'] = binary;
exports.image = binary;
