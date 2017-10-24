# node-red-contrib-increment

## Released

|Date|Version|Description|
|:--:|:--:|:--|
|2017-10-24|0.0.1|Released.|

## Feature

- Node For Node-RED.
- Separate Flow-JSON's `function` and `template`.
- function to `js`, template to `txt`.
- May be able to see the diff.

## Install

```bash
npm install --save node-red-contrib-separate-flow-json
```

## Usage

Just put it.

## Example Flow

- Flow

![Flow](./screenshots/separate-flow-json-flow.png)

```json
[
    {
        "id": "54a42e35.ef5ae",
        "type": "function",
        "z": "7f800dfb.bd3784",
        "name": "function",
        "func": "var items = msg.payload.items.filter(function(item){\n  return (item > 20);\n});\nmsg.payload = items;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 480,
        "y": 180,
        "wires": [
            [
                "730a967a.429368",
                "57400b67.6c9ab4"
            ]
        ]
    },
    {
        "id": "d050491e.87fbb8",
        "type": "template",
        "z": "7f800dfb.bd3784",
        "name": "template",
        "field": "payload",
        "fieldType": "msg",
        "format": "json",
        "syntax": "mustache",
        "template": "{\n  \"payload\": \"{{{payload}}}\",\n  \"topic\": \"hoge\",\n  \"timestamp\": 1508256583,\n  \"items\": [\n    10,\n    20,\n    30,\n    40,\n    50\n  ]\n}",
        "output": "json",
        "x": 340,
        "y": 140,
        "wires": [
            [
                "54a42e35.ef5ae"
            ]
        ]
    },
    {
        "id": "7f4e5007.5719",
        "type": "http in",
        "z": "7f800dfb.bd3784",
        "name": "",
        "url": "/test",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 200,
        "y": 100,
        "wires": [
            [
                "d050491e.87fbb8"
            ]
        ]
    },
    {
        "id": "730a967a.429368",
        "type": "http response",
        "z": "7f800dfb.bd3784",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 610,
        "y": 220,
        "wires": []
    },
    {
        "id": "186a421.c73e6be",
        "type": "catch",
        "z": "7f800dfb.bd3784",
        "name": "",
        "scope": [
            "54a42e35.ef5ae"
        ],
        "x": 480,
        "y": 260,
        "wires": [
            [
                "730a967a.429368"
            ]
        ]
    },
    {
        "id": "57400b67.6c9ab4",
        "type": "debug",
        "z": "7f800dfb.bd3784",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 630,
        "y": 140,
        "wires": []
    },
    {
        "id": "7b8fb706.e9afd8",
        "type": "inject",
        "z": "7f800dfb.bd3784",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 200,
        "y": 180,
        "wires": [
            [
                "d050491e.87fbb8"
            ]
        ]
    }
]
```

- Separated files

![Flow](./screenshots/separate-flow-json-dir.png)

- Separated Flow JSON
  - without `func key of function node` and `template key of template node`. 

```json
[
    {
        "id": "54a42e35.ef5ae",
        "type": "function",
        "z": "7f800dfb.bd3784",
        "name": "function",
        "func": "",
        "outputs": 1,
        "noerr": 0,
        "x": 480,
        "y": 180,
        "wires": [
            [
                "730a967a.429368",
                "57400b67.6c9ab4"
            ]
        ]
    },
    {
        "id": "d050491e.87fbb8",
        "type": "template",
        "z": "7f800dfb.bd3784",
        "name": "template",
        "field": "payload",
        "fieldType": "msg",
        "format": "json",
        "syntax": "mustache",
        "template": "",
        "output": "json",
        "x": 340,
        "y": 140,
        "wires": [
            [
                "54a42e35.ef5ae"
            ]
        ]
    },
    {
        "id": "7f4e5007.5719",
        "type": "http in",
        "z": "7f800dfb.bd3784",
        "name": "",
        "url": "/test",
        "method": "get",
        "upload": false,
        "swaggerDoc": "",
        "x": 200,
        "y": 100,
        "wires": [
            [
                "d050491e.87fbb8"
            ]
        ]
    },
    {
        "id": "730a967a.429368",
        "type": "http response",
        "z": "7f800dfb.bd3784",
        "name": "",
        "statusCode": "",
        "headers": {},
        "x": 610,
        "y": 220,
        "wires": []
    },
    {
        "id": "186a421.c73e6be",
        "type": "catch",
        "z": "7f800dfb.bd3784",
        "name": "",
        "scope": [
            "54a42e35.ef5ae"
        ],
        "x": 480,
        "y": 260,
        "wires": [
            [
                "730a967a.429368"
            ]
        ]
    },
    {
        "id": "57400b67.6c9ab4",
        "type": "debug",
        "z": "7f800dfb.bd3784",
        "name": "",
        "active": true,
        "console": "false",
        "complete": "false",
        "x": 630,
        "y": 140,
        "wires": []
    },
    {
        "id": "7b8fb706.e9afd8",
        "type": "inject",
        "z": "7f800dfb.bd3784",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "x": 200,
        "y": 180,
        "wires": [
            [
                "d050491e.87fbb8"
            ]
        ]
    }
]
```

- `func key of function node` file

```js
var items = msg.payload.items.filter(function(item){
  return (item > 20);
});
msg.payload = items;
return msg;
```

- `template key of template node` file

```txt
{
  "payload": "{{{payload}}}",
  "topic": "hoge",
  "timestamp": 1508256583,
  "items": [
    10,
    20,
    30,
    40,
    50
  ]
}
```

## Environment

* Node-RED

