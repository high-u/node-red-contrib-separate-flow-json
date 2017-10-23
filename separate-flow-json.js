module.exports = function (RED) {
  function sepfunctempNode(config) {
    RED.nodes.createNode(this, config);
    this.target = config.target;
    var node = this;
    this.on('input', function (msg) {
      msg[node.target] = Number(msg[node.target]) + 1;
      node.send(msg);
    });
  }
  RED.nodes.registerType('separate-flow-json', sepfunctempNode);
};