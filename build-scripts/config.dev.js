const nodeExternals = require('webpack-node-externals');

function devConfig(conf)
{
    conf.externals = [nodeExternals()];
    return conf;
}

module.exports = devConfig;