"use strict";
//var fs = require("fs");
const fse = require('fs-extra');
//var mkdirp = require('mkdirp');

module.exports = function (RED) {
  function sepfunctempNode(config) {
    RED.nodes.createNode(this, config);
    this.target = config.target;
    var node = this;
    this.on('input', function (msg) {
      var dirname = RED.settings.userDir + "/" + RED.settings.flowFile.replace(/\./g, "-") + "-codes";

      fse.removeSync(dirname);
      fse.ensureDirSync(dirname);
      //mkdirp(dirname, function (err) {
      //  if (err) {
      //    console.log(err);
      //  } 
        var flowfilename = RED.settings.userDir + "/" + RED.settings.flowFile;
        //var flow = fs.readFileSync(flowfilename, 'utf-8');
        var flow = fse.readJsonSync(flowfilename);
        divisioner(flow, RED.settings.flowFile, dirname);
      //  return;
      //});
      msg.payload = dirname;
      node.send(msg);
    });
  }
  RED.nodes.registerType('separate-flow-json', sepfunctempNode);
};

var divisioner = function (json, outputname, outputdir) {
  
  var specialKeys = { func: ".js", template: ".txt" };
  var arrObj = [];
  //var jsonObject = JSON.parse(json);
  var jsonObject = json;

  // node loop
  jsonObject.forEach(function (noderedNode) {
    console.log("01");
    // key loop
    Object.keys(noderedNode).forEach(function (key) {
      console.log("02");
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
    //arrObj.push({ id: noderedNode.id, type: noderedNode.type, key: "_node", value: JSON.stringify(noderedNode, null, "  "), ext: ".json" });
  });
  console.log("03");
  fse.ensureDirSync(outputdir + "/codes");
  //mkdirp(outputdir + "/codes", function (err) {
  //  if (err) {
  //    console.log(err);
  //  } else {
      // write flow.json
      //fs.writeFile(outputdir + "/" + outputname, JSON.stringify(jsonObject, undefined, "  "), function (err) {
      //  if (err) {
      //    console.log(err);
      //  }
      //});
      fse.outputFileSync(outputdir + "/" + outputname, JSON.stringify(jsonObject, undefined, "  "));
  console.log("04");
      // write children node
      arrObj.forEach(function (obj) {
        var nodefilepath = outputdir + "/codes/" + obj.type + "-" + obj.key + "-" + obj.id + obj.ext;
        
        //fs.writeFile(nodefilepath, obj.value, function (err) {
        //  if (err) {
        //    console.log(err);
        //  }
        //});
        fse.outputFileSync(nodefilepath, obj.value);

      });
  //  }
  //}); 
      return;
};
