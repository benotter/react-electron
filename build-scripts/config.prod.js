const nodeExternals = require('webpack-node-externals');

function prodConfig(conf)
{
    conf.externals = [nodeExternals()];
    return conf;
}

module.exports = prodConfig;