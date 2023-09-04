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
    payload = document.getElementById('id_text').value +'\n'+
    document.getElementById('pw_text').value + '\n'+
    "images/"+
    document.querySelector('input[name="img_Profile"]:checked').value+".png"
    uibuilder.send({
        'topic': topic,
        'payload': payload,
    })
}

// run this function when the document is loaded
window.onload = function () {
    //document.getElementById('tes').src = "http://1.220.178.46:1880/kio/images/img_Profile_1.png"
    document.getElementById('addimg').src = "images/img_Profile_1.png"
    // Start up uibuilder - see the docs for the optional parameters
    uibuilder.start(
    // Listen for incoming messages from Node-RED
    uibuilder.onChange('msg', function (msg) {
        console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)

        // dump the msg as text to the "msg" html element


    })

)}

function addchimg(imgname){
 
    document.getElementById('addimg').src = 'images/'+imgname+'.png'
}


function signUp(params) {
    const url = 'http://localhost:5000/api/sign-up'; // 여기에 실제 엔드포인트 URL을 적어주세요.


    console.log(params);
 const userData = {
     userId: params[0],
     userPw: params[1],
     userName: params[0],
     userPhoneNumber: params[0],
     userEmail: params[0]
 };

 fetch(url, {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json'
     },
     body: JSON.stringify(userData)
 })
 .then(response => response.json())
 .then(data => {
     alert("회원가입이 완료되었습니다!");
     location.href = "/frontend/src/"
 })
 .catch(error => {
     console.error('Error:', error);
 });

}