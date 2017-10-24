"use strict";
var fs = require("fs");
var mkdirp = require('mkdirp');


module.exports = function (RED) {
  function sepfunctempNode(config) {
    RED.nodes.createNode(this, config);
    this.target = config.target;
    var node = this;
    this.on('input', function (msg) {

      var dirname = RED.settings.userDir + "/" + RED.settings.flowFile.replace(/\./g, "-") + "-codes";
      console.log(dirname);

      mkdirp(dirname, function (err) {
        if (err) {
          console.log(err);
        } 
        var flowfilename = RED.settings.userDir + "/" + RED.settings.flowFile;
        var flow = fs.readFileSync(flowfilename, 'utf-8');

        //var json = JSON.stringify(divisioner(flow, dirname, "flow.json"));
        //fs.writeFileSync(dirname + "/test.txt", json);
        divisioner(flow, RED.settings.flowFile, dirname);
        
        return;
      });

      

      /*
      RED.settings.flowFile

      flows.json
      */

      /*
      RED.settings.userDir

      /Users/higuchi/Projects/Node-RED/node-red/.node-red
      */

      /*
      RED.settings

      { get: [Function: get],
      set: [Function: set],
      delete: [Function: delete],
      available: [Function: available],
      registerNodeSettings: [Function: registerNodeSettings],
      exportNodeSettings: [Function: exportNodeSettings],
      enableNodeSettings: [Function: enableNodeSettings],
      disableNodeSettings: [Function: disableNodeSettings],
      uiPort: [Getter/Setter],
      mqttReconnectTime: [Getter/Setter],
      serialReconnectTime: [Getter/Setter],
      debugMaxLength: [Getter/Setter],
      flowFile: [Getter/Setter],
      functionGlobalContext: [Getter/Setter],
      logging: [Getter/Setter],
      settingsFile: [Getter/Setter],
      httpRoot: [Getter/Setter],
      disableEditor: [Getter/Setter],
      httpAdminRoot: [Getter/Setter],
      httpAdminAuth: [Getter/Setter],
      httpNodeRoot: [Getter/Setter],
      httpNodeAuth: [Getter/Setter],
      uiHost: [Getter/Setter],
      userDir: [Getter/Setter],
      coreNodesDir: [Getter/Setter],
      version: [Getter/Setter] }
      */

      

      msg[node.target] = Number(msg[node.target]) + 1;
      node.send(msg);
    });
  }
  RED.nodes.registerType('separate-flow-json', sepfunctempNode);
};



var divisioner = function (json, outputname, outputdir) {
  
  var specialKeys = { func: ".js", template: ".txt" };
  var arrObj = [];

  var jsonObject = JSON.parse(json);
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

    //arrObj.push({ id: noderedNode.id, type: noderedNode.type, key: "_node", value: JSON.stringify(noderedNode, null, "  "), ext: ".json" });
  });

  
  mkdirp(outputdir + "/codes", function (err) {
    if (err) {
      console.log(err);
    } else {
      // write flow.json
      fs.writeFile(outputdir + "/" + outputname, JSON.stringify(jsonObject, undefined, "  "), function (err) {
        if (err) {
          console.log(err);
        }
      });
      // write children node
      arrObj.forEach(function (obj) {
        var nodefilepath = outputdir + "/codes/" + obj.type + "-" + obj.key + "-" + obj.id + obj.ext;
        
        fs.writeFile(nodefilepath, obj.value, function (err) {
          if (err) {
            console.log(err);
          }
        });
      
      });
    }
  }); 
};
