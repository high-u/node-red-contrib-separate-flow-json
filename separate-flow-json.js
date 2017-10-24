"use strict";
const fse = require('fs-extra');

module.exports = function (RED) {
  function sepfunctempNode(config) {
    RED.nodes.createNode(this, config);
    this.target = config.target;
    var node = this;
    this.on('input', function (msg) {
      var dirname = RED.settings.userDir + "/" + RED.settings.flowFile.replace(/\./g, "-") + "-codes";
      fse.removeSync(dirname);
      fse.ensureDirSync(dirname);
      var flowfilename = RED.settings.userDir + "/" + RED.settings.flowFile;
      var flow = fse.readJsonSync(flowfilename);
      divisioner(flow, RED.settings.flowFile, dirname);
      msg.payload = dirname;
      node.send(msg);
    });
  }
  RED.nodes.registerType('separate-flow-json', sepfunctempNode);
};

var divisioner = function (json, outputname, outputdir) {
  var specialKeys = { func: ".js", template: ".txt" };
  var arrObj = [];
  var jsonObject = json;
  // node loop
  jsonObject.forEach(function (noderedNode) {
    // key loop
    Object.keys(noderedNode).forEach(function (key) {
      if (specialKeys.hasOwnProperty(key)) {
        arrObj.push({
          id: this.id,
          type: this.type,
          key: key,
          value: this[key],
          ext: specialKeys[key]
        });
        this[key] = "";
      }
    }, noderedNode);
  });
  fse.ensureDirSync(outputdir + "/codes");
  fse.outputFileSync(outputdir + "/" + outputname, JSON.stringify(jsonObject, undefined, "  "));
  // write children node
  arrObj.forEach(function (obj) {
    var nodefilepath = outputdir + "/codes/" + obj.type + "-" + obj.key + "-" + obj.id + obj.ext;
    fse.outputFileSync(nodefilepath, obj.value);
  });
  return;
};
