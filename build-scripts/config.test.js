const nodeExternals = require('webpack-node-externals');

function testConfig(config)
{
    config.externals = [
        nodeExternals()
    ];
    
    return config;
}

module.exports = testConfig;