
var OPoint = [0, 0];
var scale = [1, 0];
var clr = ['#81d742', '#1e73be', '#dd9933', '#dd3333', '#8224e3', '#eeee22'];

setTimeout(graphButtonClick, 0);

var cursorPos = [0, 0];
var mouseDown = false;

var plot_mode = 0;


var funcString = '';
var tString = '';


var func = [];
var mint, maxt;


function saveCursorCoord(event) {
    mouseDown = true;
    var x, y;
    if (document.all) {
        x = event.x + document.body.scrollLeft;
        y = event.y + document.body.scrollTop;
    } else {
        x = event.pageX;
        y = event.pageY;
    }
    cursorPos[0] = x;
    cursorPos[1] = y;
}


function moveWithMouse(event) {
    if (mouseDown) {
        var x, y;
        if (document.all) {
            x = event.x + document.body.scrollLeft;
            y = event.y + document.body.scrollTop;
        } else {
            x = event.pageX;
            y = event.pageY;
        }
        OPoint[0] = parseInt(OPoint[0]) + parseInt(x - cursorPos[0]);
        OPoint[1] = parseInt(OPoint[1]) + parseInt(y - cursorPos[1]);
        cursorPos[0] = x;
        cursorPos[1] = y;
        graph();
    }
}

function graphButtonClick() {

    func = [];
    funcString = '';
    tString = '';
    if (plot_mode == 0) {
        var s = document.getElementById('func_field').value.replace('\n', '');
        for (var i = 0; s.length != 0; i++) {
            var index = s.indexOf(';');
            if (index == -1) {
                index = s.length;
            }
            funcString += s.substring(0, index) + ';';
            func[i] = math.compile(convertExpression(s.substring(0, index)));
            s = s.substring(index + 1, s.length);
        }
    } else if (plot_mode == 1) {
        tString = document.getElementById('t1_parametric').value + ';' + document.getElementById('t2_parametric').value;
        mint = math.eval(document.getElementById('t1_parametric').value);
        maxt = math.eval(document.getElementById('t2_parametric').value);
        var sx = document.getElementById('function1_parametric').value.replace('\n', '');
        var sy = document.getElementById('function2_parametric').value.replace('\n', '');
        for (var i = 0; sx.length != 0 && sy.length != 0; i += 2) {
            var index = sx.indexOf(';');
            if (index == -1) {
                index = sx.length;
            }
            funcString += sx.substring(0, index) + ';';
            func[i] = math.compile(convertExpression(sx.substring(0, index)));
            sx = sx.substring(index + 1, sx.length);
            index = sy.indexOf(';');
            if (index == -1) {
                index = sy.length;
            }
            funcString += sy.substring(0, index) + ';';
            func[i + 1] = math.compile(convertExpression(sy.substring(0, index)));
            sy = sy.substring(index + 1, sy.length);
        }
    } else {
        tString = document.getElementById('t1_polar').value + ';' + document.getElementById('t2_polar').value;
        mint = math.eval(document.getElementById('t1_polar').value);
        maxt = math.eval(document.getElementById('t2_polar').value);
        var s = document.getElementById('function_polar').value.replace('\n', '');
        for (var i = 0; s.length != 0; i++) {
            var index = s.indexOf(';');
            if (index == -1) {
                index = s.length;
            }
            funcString += s.substring(0, index);
            func[i] = math.compile(convertExpression(s.substring(0, index)));
            s = s.substring(index + 1, s.length);
        }
    }

    graph();
}
function graph() {
    var my_canvas = document.getElementById("cnv");
    var c = my_canvas.getContext("2d");
    c.clearRect(0, 0, 635, 635);
    my_canvas.width = 635;
    c.translate(300.5, 300.5);
    c.beginPath();
    for (var x = -300 + OPoint[0] % 50; x <= 300; x += 50) {
      c.moveTo(x, -300);
      c.lineTo(x, 300);
    }
    for (var y = -300 + OPoint[1] % 50; y < 301; y += 50) {
      c.moveTo(-300, y);
      c.lineTo(300, y);
    }
    c.strokeStyle = "#ddf";
    c.closePath();
    c.stroke();

    c.beginPath();
    if (Math.abs(OPoint[0]) <= 300) {
      c.moveTo(OPoint[0], -300);
      c.lineTo(OPoint[0], 300);
    }
    if (Math.abs(OPoint[1] <= 300)) {
      c.moveTo(300, OPoint[1]);
      c.lineTo(-300, OPoint[1]);
    }

    for (var x = OPoint[0] % 50 - 300; x < 290; x += 50) {
    if (x < -290) {
        continue;
    } else {
        c.fillText(1 * ((x - OPoint[0]) * scale[0] / 50).toFixed(3), x - 3, 310);
    }
    }
    for (var y = OPoint[1] % 50 - 300; y < 290; y += 50) {
    if (y < -290) {
        continue;
    } else {
        c.fillText(1 * (-(y - OPoint[1]) * scale[0] / 50).toFixed(3), 305, y + 3);
    }
    }
    c.strokeStyle = "#555";
    c.closePath();
    c.stroke();
    if (plot_mode == 0) {
        for (var i = 0; i < func.length; i++) {
            c.beginPath();
            c.lineWidth = 2;
            c.lineJoin = 'round';
            var spacing = 0.5;
            var y = 0, x = 0;
            var cx = [];
            var cy = [];
            var scope = {
                x: 0,
                tg: math.tan,
                ctg: math.cot,
                ln: math.log,
                arcsin: math.asin,
                arccos: math.acos,
                arctg: math.atan,
                arcctg: arcctg,
                lg: math.log10,
                sh: math.sinh,
                ch: math.cosh,
                th: math.tanh,
                cth: math.coth
            };
            for (cx[0] = -300; cx[0] <= 300; cx[0] += spacing) {
                scope.x = (cx[0] - OPoint[0]) * scale[0] / 50.0;
                y = func[i].eval(scope);
                cy[0] = (-y * 50.0 / scale[0] + parseInt(OPoint[1]));

                if (Math.abs(cy[0]) <= 300 && Math.abs(cy[1]) <= 300) {
                    c.moveTo(cx[1], cy[1]);
                    c.lineTo(cx[0], cy[0]);
                    if (Math.abs(cy[0] - cy[1]) / spacing > 10) {
                        spacing = Math.max(spacing / Math.abs(cy[0] - cy[1]), 0.01);
                    } else {
                        spacing = 0.5;
                    }
                }
                cy[1] = cy[0];
                cx[1] = cx[0];
            }
            c.strokeStyle = clr[i % 6];
            c.stroke();

        }
    }
    else if (plot_mode == 1) {
        for (var i = 0; i < func.length; i += 2) {
            c.beginPath();
            c.lineWidth = 2;
            c.lineJoin = 'round';
            var spacing = 0.01;
            var y = 0, x = 0;
            var cx = [];
            var cy = [];
            scope = {
                t: 0,
                tg: math.tan,
                ctg: math.cot,
                ln: math.log,
                arcsin: math.asin,
                arccos: math.acos,
                arctg: math.atan,
                arcctg: arcctg,
                lg: math.log10,
                sh: math.sinh,
                ch: math.cosh,
                th: math.tanh,
                cth: math.coth
            };
            for (var t = mint; t <= maxt; t += spacing) {
                scope.t = t;
                x = func[i].eval(scope);
                y = func[i + 1].eval(scope);
                cx[0] = x * 50.0 / scale[0] + parseInt(OPoint[0]);
                cy[0] = -y * 50.0 / scale[0] + parseInt(OPoint[1]);
                if (Math.abs(cy[0]) <= 300 && Math.abs(cy[1]) <= 300 && Math.abs(cx[0]) <= 300 && Math.abs(cx[1]) <= 300) {
                    c.moveTo(cx[1], cy[1]);
                    c.lineTo(cx[0], cy[0]);
                }
                cy[1] = cy[0];
                cx[1] = cx[0];
            }
            c.strokeStyle = clr[((i / 2) + 5) % 6];
            c.stroke();
        }

    } else {
        for (var i = 0; i < func.length; i++) {
            c.beginPath();
            c.lineWidth = 2;
            c.lineJoin = 'round';
            var spacing = 0.005;
            var y = 0, x = 0;
            var cx = [];
            var cy = [];
            var scope = {
                x: 0,
                tg: math.tan,
                ctg: math.cot,
                ln: math.log,
                arcsin: math.asin,
                arccos: math.acos,
                arctg: math.atan,
                arcctg: arcctg,
                lg: math.log10,
                sh: math.sinh,
                ch: math.cosh,
                th: math.tanh,
                cth: math.coth
            };
            for (var t = mint; t <= maxt; t += spacing) {
                scope.t = t;
                r = func[i].eval(scope);
                x = r * Math.cos(t);
                y = r * Math.sin(t);
                cx[0] = x * 50.0 / scale[0] + parseInt(OPoint[0]);
                cy[0] = -y * 50.0 / scale[0] + parseInt(OPoint[1]);
                if (Math.abs(cy[0]) <= 300 && Math.abs(cy[1]) <= 300 && Math.abs(cx[0]) <= 300 && Math.abs(cx[1]) <= 300) {
                    c.moveTo(cx[1], cy[1]);
                    c.lineTo(cx[0], cy[0]);
                }
                cy[1] = cy[0];
                cx[1] = cx[0];
            }
            c.strokeStyle = clr[(i + 3) % 6];
            c.stroke();
        }

    }

    c.beginPath();
    c.lineWidth = 1;
    c.lineJoin = 'round';
    c.moveTo(-300, -300);
    c.lineTo(300, -300);
    c.lineTo(300, 300);
    c.lineTo(-300, 300);
    c.lineTo(-300, -300);
    c.strokeStyle = '#1e73be';
    c.stroke();

    function arcctg(x) {
        return Math.PI / 2 - math.atan(x);
    }
}

function convertExpression(s) {
    s = s.replace(/\|(.*?)\|/gi, 'abs($1)');
    s = s.replace(' ', '');

    while (s.indexOf('log') != -1) {
        var index = s.indexOf('log');
        var leftIndex = index + 3;
        var rightIndex = findPairBreaket(s, leftIndex);
        var args = s.substring(leftIndex + 1, rightIndex);
        var arg1 = s.substring(leftIndex + 1, findTopLevelComma(args) + leftIndex + 1);
        var arg2 = s.substring(findTopLevelComma(args) + leftIndex + 2, rightIndex);
        s = s.substring(0, index) + '(ln(' + arg2 + ')/ln(' + arg1 + '))' + s.substring(rightIndex + 1, s.length);
    }

    return s;
}

function findTopLevelComma(s) {
    var i;
    var br = 0;
    for (i = 0; i < s.length; i++) {
        if (s.charAt(i) == '(') {
            br++;
        } else if (s.charAt(i) == ')') {
            br--;
        } else if (s.charAt(i) == ',' && br == 0) {
            return i;
        }
    }
    return -1;
}

function findPairBreaket(s, index) {
    var breaket = 0;
    if (s.charAt(index) == '(') {
        breaket++;
        while (breaket != 0 && index < s.length - 1) {
            index++;
            if (s.charAt(index) == '(') {
                breaket++;
            } else if (s.charAt(index) == ')') {
                breaket--;
            }
        }
        return index;
    } else if (s.charAt(index) == ')') {
        breaket--;
        while (breaket != 0 && index > 0) {
            index--;
            if (s.charAt(index) == '(') {
                breaket++;
            } else if (s.charAt(index) == ')') {
                breaket--;
            }
        }
        return index;
    }
    return 0;
}

function change_usual_form() {
  document.getElementById('btn_usual_form').classList.remove('btn-default');
  document.getElementById('btn_usual_form').classList.add('btn-success');
  document.getElementById('btn_polar_form').classList.remove('btn-success');
  document.getElementById('btn_polar_form').classList.add('btn-default');
  document.getElementById('btn_parametric_form').classList.remove('btn-success');
  document.getElementById('btn_parametric_form').classList.add('btn-default');

  document.getElementById('usual_form').style.display = 'inline';
  document.getElementById('parametric_form').style.display = 'none';
  document.getElementById('polar_form').style.display = 'none';

  document.getElementById("function_polar").value = "";
  document.getElementById("function1_parametric").value = "";
  document.getElementById("function2_parametric").value = "";
  setTimeout(graphButtonClick, 0);
  var plot_mode = 0;
}
function change_parametric_form() {
  document.getElementById('btn_usual_form').classList.remove('btn-success');
  document.getElementById('btn_usual_form').classList.add('btn-default');
  document.getElementById('btn_polar_form').classList.remove('btn-success');
  document.getElementById('btn_usual_form').classList.add('btn-default');
  document.getElementById('btn_parametric_form').classList.remove('btn-default');
  document.getElementById('btn_parametric_form').classList.add('btn-success');

  document.getElementById('usual_form').style.display = 'none';
  document.getElementById('parametric_form').style.display = 'inline';
  document.getElementById('polar_form').style.display = 'none';
  document.getElementById("func_field").value = "";
  document.getElementById("function_polar").value = "";
  setTimeout(graphButtonClick, 0);
  plot_mode = 1;
}
function change_polar_form() {
  document.getElementById('btn_usual_form').classList.remove('btn-success');
  document.getElementById('btn_usual_form').classList.add('btn-default');
  document.getElementById('btn_parametric_form').classList.remove('btn-success');
  document.getElementById('btn_parametric_form').classList.add('btn-default');
  document.getElementById('btn_polar_form').classList.remove('btn-default');
  document.getElementById('btn_polar_form').classList.add('btn-success');

  document.getElementById('usual_form').style.display = 'none';
  document.getElementById('parametric_form').style.display = 'none';
  document.getElementById('polar_form').style.display = 'inline';

  document.getElementById("func_field").value = "";
  document.getElementById("function1_parametric").value = "";
  document.getElementById("function2_parametric").value = "";
  setTimeout(graphButtonClick, 0);
  plot_mode = 2;
}
