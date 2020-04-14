'use strict';

const mongoose = require('mongoose');
const definition = require('../schemas/devices.definition').definition;
const SMCrud = require('@appveen/swagger-mongoose-crud');
const utils = require('@appveen/utils');
const schema = new mongoose.Schema(definition);

var options = {
	logger: logger,
	collectionName: 'devices'
};
schema.pre('save', utils.counter.getIdGenerator('DVC', 'smart.devices', null, null, 1000));


var crudder = new SMCrud(schema, 'devices', options);


module.exports = {
	create: crudder.create,
	index: crudder.index,
	show: crudder.show,
	destroy: crudder.destroy,
	update: crudder.update
};