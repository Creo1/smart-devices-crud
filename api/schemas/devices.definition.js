var definition = {
	'_id': {
		'type': 'String',
		'default': null
	},
	'deviceName':{
		'type': 'String',
		'required': true,
		'unique': true
	},
	'status': {
		'type': 'String',
		'enum': [
			'on',
			'off',
			"fault"
		],
		'required': true
	},
	'connectionType': {
		'type': 'String',
		'enum': [
			'wireless',
			'wired'
		],
		'required': true
	},
	'powerSupply': {
		'type': 'String',
		'enum': [
			'battery',
			'externalSource'
		],
		'required': true
	},
	'connectionStatus': {
		'type': 'String',
		'enum': [
			'paired',
			'connected',
			"available"
		],
		'required': true
	},
	'connectedWith':{
		'type': 'String'
	},
	'remainingBattery':{
		'type': Number
	}
};
module.exports.definition=definition;