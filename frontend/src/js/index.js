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

// run this function when the document is loaded
window.onload = function () {

    // Start up uibuilder - see the docs for the optional parameters
    uibuilder.start()
    // uibuilder.send({
    //     'topic': "test",
    //     'payload': "test2",
    // })
    // Listen for incoming messages from Node-RED
    uibuilder.onChange('msg', function (msg) {
        console.info('[indexjs:uibuilder.onChange] msg received from Node-RED server:', msg)
        // dump the msg as text to the "msg" html element
        const Rtank1 = document.getElementById('R_tank1');
        const Rtank2 = document.getElementById('righttank2');
        const Rtank3 = document.getElementById('righttank3');
        const Stank1 = document.getElementById('S_Tank1');
        const Stank2 = document.getElementById('S_Tank2');
        const Stank3 = document.getElementById('S_Tank3');
        const Skpa1 = document.getElementById('S_Tank7');
        const Skpa2 = document.getElementById('S_Tank8');
        const Skpa3 = document.getElementById('S_Tank9');
        const leftlock = document.getElementById('left_lock');
        const rightlock = document.getElementById('right_lock');
        const sentank1 = document.getElementById('sensingtank1');
        const sentank2 = document.getElementById('sensingtank2');
        const sentank3 = document.getElementById('sensingtank3');
        const sentime = document.getElementById('sensingtime');
        const r_tank1_lock = document.getElementById('rtank1lock');
        const r_tank2_lock = document.getElementById('rtank2lock');
        const r_tank3_lock = document.getElementById('rtank3lock');
        if (msg["topic"] == "r_tank1" && msg["payload"] == 'Open') {
            // Rtank1.innerHTML = msg["payload"]; 
            document.getElementById('righttank1').checked = true;
        } else if (msg["topic"] == "r_tank1" && msg["payload"] == 'Close') {
            document.getElementById('righttank1').checked = false;
        } else if (msg["topic"] == "r_tank1" && msg["payload"] == 'Lock') {
            document.getElementById('righttank1').checked = false;
            r_tank1_lock.setAttribute('data-text', 'Lock')
            document.getElementById('tank1').className = 'tank1 gray';
        } else if (msg["topic"] == "r_tank1" && msg["payload"] == 'Unlock') {
            document.getElementById('righttank1').checked = false;
            r_tank1_lock.setAttribute('data-text', 'CLOSE')
            document.getElementById('tank1').className = 'tank1';
        } else if (msg["topic"] == "r_tank2" && msg["payload"] == 'Open') {
            document.getElementById('righttank2').checked = true;
        } else if (msg["topic"] == "r_tank2" && msg["payload"] == 'Close') {
            document.getElementById('righttank2').checked = false;
        } else if (msg["topic"] == "r_tank2" && msg["payload"] == 'Lock') {
            document.getElementById('righttank2').checked = false;
            r_tank2_lock.setAttribute('data-text', 'Lock')
            document.getElementById('tank2').className = 'tank2 gray';
        } else if (msg["topic"] == "r_tank2" && msg["payload"] == 'Unlock') {
            document.getElementById('righttank2').checked = false;
            r_tank2_lock.setAttribute('data-text', 'CLOSE')
            document.getElementById('tank2').className = 'tank2';
        } else if (msg["topic"] == "r_tank3" && msg["payload"] == 'Open') {
            document.getElementById('righttank3').checked = true;
        } else if (msg["topic"] == "r_tank3" && msg["payload"] == 'Close') {
            document.getElementById('righttank3').checked = false;
        } else if (msg["topic"] == "r_tank3" && msg["payload"] == 'Lock') {
            document.getElementById('righttank3').checked = false;
            r_tank3_lock.setAttribute('data-text', 'Lock')
            document.getElementById('tank3').className = 'tank3 gray';
        } else if (msg["topic"] == "r_tank3" && msg["payload"] == 'Unlock') {
            document.getElementById('righttank3').checked = false;
            r_tank3_lock.setAttribute('data-text', 'CLOSE')
            document.getElementById('tank3').className = 'tank3';
        } else if (msg["topic"] == "stank1") {
            Stank1.innerHTML = msg["payload"] + 'ml';
        }else if (msg["topic"] == "stank2") {
            Stank2.innerHTML = msg["payload"] + 'ml';
        }else if (msg["topic"] == "stank3") {
            Stank3.innerHTML = msg["payload"] + 'ml';
        }else if (msg["topic"] == "skpa1") {
            Skpa1.innerHTML = msg["payload"];
        }else if (msg["topic"] == "skpa2") {
            Skpa2.innerHTML = msg["payload"] ;
        }else if (msg["topic"] == "skpa3") {
            Skpa3.innerHTML = msg["payload"];
        }else if (msg["topic"] == "left" && msg["payload"] == 'close') {
            leftlock.style.display = 'block';
        } else if (msg["topic"] == "right" && msg["payload"] == 'close') {
            rightlock.style.display = 'block';
        } else if (msg["topic"] == "sensingtank1") {
            sentank1.innerText = msg["payload"]
        } else if (msg["topic"] == "sensingtank2") {
            sentank2.innerText = msg["payload"]
        } else if (msg["topic"] == "sensingtank3") {
            sentank3.innerText = msg["payload"]
        } else if (msg["topic"] == "sensingtime") {
            sentime.innerText = msg["payload"]
        }
    })
}

function leftsideclick() {
    const leftlock = document.getElementById('left_lock');
    leftlock.style.display = 'none'
    uibuilder.send({
        'topic': "leftside",
        'payload': "open",
    })
    // const rightlock = document.getElementById('right_lock');

}

function rightsideclick() {
    const rightlock = document.getElementById('right_lock');
    rightlock.style.display = 'none'
    uibuilder.send({
        'topic': "rightside",
        'payload': "open",
    })
    // const rightlock = document.getElementById('right_lock');

}

function is_check() {

    const checkbox = document.getElementById('check_box');
    const is_checked = checkbox.checked;
    if (is_checked == true) {
        document.getElementById('pro_li_2').className = 'active ing';
        document.getElementById('pro_li_1').className = '';
        checkbox.className = 'next_page_but2'
        // checkbox.style.left = '5px';
        //checkbox.style.right = '0px';
    } else {
        document.getElementById('pro_li_2').className = '';
        document.getElementById('pro_li_1').className = 'active ing';
        checkbox.className = 'next_page_but'
    }
}

function moduleon() {
    if (document.getElementById('moduleon').checked == false) {
        uibuilder.send({
            'topic': "module",
            'payload': 'open',
        })
    } else if (document.getElementById('moduleon').checked == true) {
        uibuilder.send({
            'topic': "module",
            'payload': 'close',
        })
    }
}


function sensoron() {
    if (document.getElementById('sensoron').checked == false) {
        uibuilder.send({
            'topic': "sensor",
            'payload': 'open',
        })
    } else if (document.getElementById('sensoron').checked == true) {

        uibuilder.send({
            'topic': "sensor",
            'payload': 'close',
        })
    }
}

function valveon() {
    if (document.getElementById('valveon').checked == false) {
        document.getElementById('nextvalve').checked = true
        uibuilder.send({
            'topic': "valve",
            'payload': 'open',
        })
    } else if (document.getElementById('valveon').checked == true) {
        document.getElementById('nextvalve').checked = false
        uibuilder.send({
            'topic': "valve",
            'payload': 'close',
        })
    }
}


function tank1() {
    if (document.getElementById('righttank1').checked == false) {
        uibuilder.send({
            'topic': "righttank1",
            'payload': 'open',
        })
    } else if (document.getElementById('righttank1').checked == true) {
        uibuilder.send({
            'topic': "righttank1",
            'payload': 'close',
        })
    }
}

function tank2() {
    if (document.getElementById('righttank2').checked == false) {
        uibuilder.send({
            'topic': "righttank2",
            'payload': 'open',
        })
    } else if (document.getElementById('righttank2').checked == true) {
        uibuilder.send({
            'topic': "righttank2",
            'payload': 'close',
        })
    }
}

function tank3() {
    if (document.getElementById('righttank3').checked == false) {
        uibuilder.send({
            'topic': "righttank3",
            'payload': 'open',
        })
    } else if (document.getElementById('righttank3').checked == true) {
        uibuilder.send({
            'topic': "righttank3",
            'payload': 'close',
        })
    }
}

function nextvalve(num) {

    if (document.getElementById('nextvalve').checked == false) {
        document.getElementById('valveon').checked = true
        uibuilder.send({
            'topic': "nextvalve",
            'payload': 'open',
        })
    } else if (document.getElementById('nextvalve').checked == true) {
        document.getElementById('valveon').checked = false
        uibuilder.send({
            'topic': "nextvalve",
            'payload': 'close',
        })
    }

}

function nextvpre() {
    if (document.getElementById('nextvpre').checked == false) {
        uibuilder.send({
            'topic': "nextpre",
            'payload': 'start',
        })
    } else if (document.getElementById('nextvpre').checked == true) {
        uibuilder.send({
            'topic': "nextpre",
            'payload': 'stop',
        })
    }
}

var keycheck = 0
var test123 = 0
// function timer2() {
//     var keypad = document.getElementById('key_pad');
//             test123 += 1;
//             console.log(test123);
//             if(test123 == 10){
//             keypad.style.display = 'none';
//             }
// }

let timer;



// '시작' 버튼을 누르면 실행된다.

function startClock() {
    test123 = 0; 
    clearInterval(timer);
    var keypad = document.getElementById('key_pad');
  function clock() {
    test123 += 1;
    console.log(test123);
    if(test123 == 10){
        keypad.style.display = 'none';
        clearInterval(timer);
    }
  }
  timer = setInterval(clock, 1000);
}


function tank(num) {

    var stank1 = document.getElementById('S_Tank1');
    var stank2 = document.getElementById('S_Tank2');
    var stank3 = document.getElementById('S_Tank3');
    var stank4 = document.getElementById('S_Tank4');
    var stank5 = document.getElementById('S_Tank5');
    var stank6 = document.getElementById('S_Tank6');
    var stank7 = document.getElementById('S_Tank7');
    var stank8 = document.getElementById('S_Tank8');
    var stank9 = document.getElementById('S_Tank9');
    var stime = document.getElementById('S_time');
    var keypad = document.getElementById('key_pad');
    var keytext = document.getElementById('keytext');
    if (num == 1) {
        // var inputString = prompt('용량을 입력하세요.','ex) 120');
        keypad.style.display = 'flex';
        keytext.placeholder = '용량(ml)을 입력해주세요'
        keycheck = 1;
        startClock(); 
        

    } else if (num == 2) {
        keypad.style.display = 'flex';
        keytext.placeholder = '용량(ml)을 입력해주세요'
        keycheck = 2;
        startClock(); 

    } else if (num == 3) {
        keypad.style.display = 'flex';
        keytext.placeholder = '용량(ml)을 입력해주세요'
        keycheck= 3; 
        startClock(); 

    } else if (num == 4) {
        keypad.style.display = 'flex';
        keytext.placeholder = '시간(sec)을 입력해주세요'
        keycheck = 7;
        startClock(); 
    } else if (num == 5) {
        keypad.style.display = 'flex';
        keytext.placeholder = '압력(kPa)을 입력해주세요'
        keycheck = 4;
        startClock(); 
    } else if (num == 6) {
        keypad.style.display = 'flex';
        keytext.placeholder = '압력(kPa)을 입력해주세요'
        keycheck = 5;
        startClock(); 
    } else if (num == 7) {
        keypad.style.display = 'flex';
        keytext.placeholder = '압력(kPa)을 입력해주세요'
        keycheck = 6;
        startClock(); 
    }
    else if (num == 8) {
        keypad.style.display = 'flex';
        keytext.placeholder = '용량(ml)을 입력해주세요'
        keycheck = 8;
        startClock(); 
    }
    else if (num == 9) {
        keypad.style.display = 'flex';
        keytext.placeholder = '용량(ml)을 입력해주세요'
        keycheck = 9;
        startClock(); 
    }
    else if (num == 10) {
        keypad.style.display = 'flex';
        keytext.placeholder = '용량(ml)을 입력해주세요'
        keycheck = 10;
        startClock(); 
    }
}

function test231() {
    if (document.getElementById('name1').checked == false) {
        uibuilder.send({
            'topic': "valve",
            'payload': 'on',
        })
    } else if (document.getElementById('name1').checked == true) {
        uibuilder.send({
            'topic': "valve",
            'payload': 'off',
        })
    }
}

function keyonclick(num) {
    var stank1 = document.getElementById('S_Tank1');
    var stank2 = document.getElementById('S_Tank2');
    var stank3 = document.getElementById('S_Tank3');
    var stank4 = document.getElementById('S_Tank4');
    var stank5 = document.getElementById('S_Tank5');
    var stank6 = document.getElementById('S_Tank6');
    var stank10 = document.getElementById('S_Tank7');
    var stank11 = document.getElementById('S_Tank8');
    var stank12 = document.getElementById('S_Tank9');
    var stime = document.getElementById('S_time');
    var keypad = document.getElementById('key_pad');
    var keytext = document.getElementById('keytext');
    var keytext = document.getElementById('keytext');
    if (num == 1) {
      //  clearInterval(timer);
        test123 = 0;
        keytext.value += 1
        //keycheck = 1;
    }
    if (num == 2) {
        keytext.value += 2;
        test123 = 0;
    }
    if (num == 3) {
        keytext.value += 3;
        test123 = 0;
    }
    if (num == 4) {
        keytext.value += 4;
        test123 = 0;
    }
    if (num == 5) {
        keytext.value += 5;
        test123 = 0;
    }
    if (num == 6) {
        keytext.value += 6;
        test123 = 0;
    }
    if (num == 7) {
        keytext.value += 7;
        test123 = 0;
    }
    if (num == 8) {
        keytext.value += 8;
        test123 = 0;
    }
    if (num == 9) {
        keytext.value += 9;
        test123 = 0;
    }
    if (num == 0) {
        keytext.value += 0;
        test123 = 0;
    }
    if (num == 10) {
        if (keycheck == 1) {
            if (keytext.value == '용량(ml)을 입력해주세요') {
                keytext.value = 0
            }
            uibuilder.send({
                'topic': "tank1",
                'payload': keytext.value,
            })
            stank4.innerText = keytext.value ;

        }
        else if(keycheck == 2){
            if(keytext.value == '용량(ml)을 입력해주세요'){
                keytext.value = 0
            }
            stank5.innerText = keytext.value ;
            uibuilder.send({
                'topic': "tank2",
                'payload': keytext.value,
            })

        }else if(keycheck == 3){
            if (keytext.value == '용량(ml)을 입력해주세요') {
                keytext.value = 0
            }
            stank6.innerText = keytext.value ;
            uibuilder.send({
                'topic': "tank3",
                'payload': keytext.value,
            })

        }else if(keycheck == 4){
            if (keytext.value == '압력(kPa)을 입력해주세요') {
                keytext.value = 0
            }
            stank10.innerText = keytext.value;
            uibuilder.send({
                'topic': "tank1kPa",
                'payload': keytext.value,
            })
        }else if(keycheck == 5){
            if (keytext.value == '압력(kPa)을 입력해주세요') {
                keytext.value = 0
            }
            stank11.innerText = keytext.value;
            uibuilder.send({
                'topic': "tank2kPa",
                'payload': keytext.value,
            })
        }else if(keycheck == 6){
            if (keytext.value == '압력(kPa)을 입력해주세요') {
                keytext.value = 0
            }
            stank12.innerText = keytext.value;
            uibuilder.send({
                'topic': "tank3kPa",
                'payload': keytext.value,
            })
        }else if (keycheck == 7){
            if (keytext.value == '시간(sec)을 입력해주세요') {
                keytext.value = 30
            }
            stime.innerText = keytext.value + ' Sec';
            uibuilder.send({
                'topic': "time",
                'payload': keytext.value,
            })           
        }
        else if (keycheck == 8){
            if (keytext.value == '용량(ml)을 입력해주세요') {
                keytext.value = 0 + "ml"
            }
            stank1.innerText = keytext.value + "ml";
            uibuilder.send({
                'topic': "tank1_1ml",
                'payload': keytext.value,
            }) 
        }
        else if (keycheck == 9){
            if (keytext.value == '용량(ml)을 입력해주세요') {
                keytext.value = 0 + "ml"
            }
            stank2.innerText = keytext.value  + "ml";
            uibuilder.send({
                'topic': "tank2_1ml",
                'payload': keytext.value,
            }) 
        }
        else if (keycheck == 10){
            if (keytext.value == '용량(ml)을 입력해주세요') {
                keytext.value = 0 + "ml"
            }
            stank3.innerText = keytext.value  + "ml";
            uibuilder.send({
                'topic': "tank3_1ml",
                'payload': keytext.value,
            }) 
        }
    keytext.value = '';
    keypad.style.display = 'none' 
    }
    if(num == 11){
        keytext.value = keytext.value.substr(0, keytext.value.length -1)
    }
}

document.addEventListener('mouseup', function(e) {
    var container = document.getElementById('key_pad');
    if (!container.contains(e.target)) {
        container.style.display = 'none';
    }
});