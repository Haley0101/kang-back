/* eslint-disable strict */
/* jshint browser: true, esversion: 6, asi: true */
/* globals uibuilder */
// @ts-nocheck

/** Minimalist code for uibuilder and Node-RED */
'use strict'

// return formatted HTML version of JSON object
var keypad = document.getElementById('node_keypad');
var nodetable = document.getElementById('node_table');
var time = new Date().getTime();
window.syntaxHighlight = function (json) {
    json = JSON.stringify(json, undefined, 4)
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number'
        if ((/^"/).test(match)) {
            if ((/:$/).test(match)) {
                cls = 'key'
            } else {
                cls = 'string'
            }
        } else if ((/true|false/).test(match)) {
            cls = 'boolean'
        } else if ((/null/).test(match)) {
            cls = 'null'
        }
        return '<span class="' + cls + '">' + match + '</span>'
    })
    return json
} // --- End of syntaxHighlight --- //

// Send a message back to Node-RED
window.fnSendToNR = function fnSendToNR(topic, payload) {
    uibuilder.send({
        'topic': topic,
        'payload': payload,
    })
}

var procount=0;
// run this function when the document is loaded
window.onload = function () {

    // Start up uibuilder - see the docs for the optional parameters
    uibuilder.start()

    // Listen for incoming messages from Node-RED
    uibuilder.onChange('msg', function (msg) {
        console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
        // dump the msg as text to the "msg" html element
        const li = document.createElement("li");
        li.setAttribute('id',msg["topic"]+procount);
        procount = procount+1;
        if(msg["topic"] == "profile"){
            const textNode = document.createTextNode(msg["payload"]);
            li.appendChild(textNode);
            document.getElementById('profile').appendChild(li);
        }
    })
}
