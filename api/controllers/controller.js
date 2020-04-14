'use strict';

const devicesController = require('./devices.controller');

var exports = {};

exports.v1DeviceCreate = devicesController.create;
exports.v1DeviceList = devicesController.index;
exports.v1DeviceShow = devicesController.show;
exports.v1DeviceDestroy = devicesController.destroy;
exports.v1DeviceUpdate = devicesController.update;

module.exports = exports;