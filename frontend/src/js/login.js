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
var checkname = '';
// run this function when the document is loaded
window.onload = function () {
    fetch("http://localhost:5000/api/id_list", {
        method: "GET"
        }).then(response => {
        console.log(response)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
            return response.json();  // Parse the response body as JSON
        })
        .then(data => {
            // Handle the parsed response data here
            console.log(data.id_list);
            let ids = data.id_list;
            console.log(ids);
            var ul = document.getElementById("id_list");
            
            ids.forEach(function(id, index) {
            console.log(id);
                
                var li = document.createElement("li");
                var input = document.createElement("input");
                input.type = "radio";
                input.name = "id";
                input.value = id;
                if (index === 0) { // check the first radio button
                    input.checked = true;
                }
                input.onclick = function() {
                    change(id);
                };
            
                var label = document.createTextNode(id); // Adjust this as necessary
            
                li.appendChild(input);
                li.appendChild(label);
                ul.appendChild(li);
            });
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error.message);
        });


    // Start up uibuilder - see the docs for the optional parameters
    uibuilder.start()
    uibuilder.send({
        'topic': "info",
        'payload': "helo",
    })
    // Listen for incoming messages from Node-RED
    uibuilder.onChange('msg', function (msg) {
        console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
        // dump the msg as text to the "msg" html element
        const admin = document.getElementById('id_list');
        // const li = document.createElement("li");
        // li.setAttribute('id',msg["topic"]+locount);
        // locount = locount+1;
        document.getElementById("chname").innerHTML =msg["payload"]["result"][0]["name"];
        document.getElementById('loimg').src = msg["payload"]["result"][0]["img"]
        if(msg["topic"] == "admin"){
            for(var z = 0; z<Object.keys(msg["payload"]["result"]).length; z++){
                if(z == 0){
            admin.innerHTML += "<li><input type='radio' name='id' value=" +msg["payload"]["result"][z]["name"]+" checked onclick="+
            "change(this.value)>"+
            msg["payload"]["result"][z]["name"]+
            "</li>"
                }else{
                    admin.innerHTML += "<li><input type='radio' name='id' value=" +msg["payload"]["result"][z]["name"]+"  onclick="+
                    "change(this.value)>"+
                    msg["payload"]["result"][z]["name"]+
                    "</li>"
                }
            }

            
            // admin.innerHTML =msg["payload"]["result"][0]["name"]; 
            // for(var i=0; i<Object.keys(msg["payload"]["result"]).length; i++){
            // const li = document.createElement("li");
            // li.setAttribute('id',msg["topic"]+locount);
            // locount = locount+1;
            // const textNode = document.createTextNode(msg["payload"]["result"][i]["name"]);
            // li.appendChild(textNode);
            // document.getElementById('id_list').appendChild(li);
            // }

        }

    })
}


function login() {
    var username = document.getElementById("chname").innerHTML;
    var password = document.getElementById("pwd").value;

    // username과 password를 사용하여 로그인 로직을 처리합니다.
    // 예: 서버로 요청을 보내는 경우, fetch API나 AJAX를 사용하여 로그인 요청을 보낼 수 있습니다.

    fetch("http://localhost:5000/api/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: username,
            userPw: password
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {  // 서버에서 응답된 데이터에 따라 다를 수 있습니다.
            // 로그인 성공시 처리
            alert("로그인에 성공하였습니다.");
        } else {
            // 로그인 실패시 처리
            alert("로그인에 실패하였습니다.");
        }
    })
    .catch(error => {
        console.error("로그인 요청 중 오류 발생:", error);
    });
}


function change(chname){
    checkname = chname;
    document.getElementById("chname").innerHTML = chname;

    // ... rest of the code (if any) ...
}

function check(){

    var checkpw = '';
    fetch("https://localhost:5000/api/sign-in", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        userId: document.getElementById("pwd").value,
        userPw: document.getElementById("pwd").value
    }),
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
        
    if(checkname == ''){
        checkname = msg["payload"]["result"][0]["name"]
    }
    for(var z = 0; z<Object.keys(msg["payload"]["result"]).length; z++){
        if(checkname == msg["payload"]["result"][z]["name"] ){
            checkpw = msg["payload"]["result"][z]["password"];
        }
    }
    if(document.getElementById("pwd").value != checkpw) {
        alert('비밀번호가 틀렸습니다.')
    }else if(document.getElementById("pwd").value == checkpw){
        alert('로그인에 성공하셨습니다.')
    }
}
function  change(chname){
    checkname = chname
    var chimg = ''
    document.getElementById("chname").innerHTML =chname;
    for(var z = 0; z<Object.keys(msg["payload"]["result"]).length; z++){
        if(checkname == msg["payload"]["result"][z]["name"] ){
            chimg = msg["payload"]["result"][z]["img"] 
        }
    }
    document.getElementById('loimg').src = chimg;

}

