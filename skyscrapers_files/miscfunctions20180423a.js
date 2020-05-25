function IsNumeric(lctext)
{
	var ValidChars = "0123456789.";
	var IsNumber=true;
	var Char;

	for (i = 0; i < lctext.length && IsNumber == true; i++) 
		{ 
		Char = lctext.charAt(i); 
		if (ValidChars.indexOf(Char) == -1) 
			{
			IsNumber = false;
			}
		}
	return IsNumber;
}

function trim(lcstring)
{
	while (lcstring.substring(0,1) == ' ')
	{
		lcstring = lcstring.substring(1,lcstring.length);
	}
	while (lcstring.substring(lcstring.length - 1 , lcstring.length) == ' ')
	{
		lcstring = lcstring.substring(0 , lcstring.length - 1);
	}

	return lcstring;
}

function getObject(loobject)
{
	if (document.getElementById)
	{
		loobject = document.getElementById(loobject);
	}
	else if (document.all)
	{
		loobject = document.all.item(loobject);
	}
	else
	{
		loobject = null;
	}

return loobject;
}

function setCookie(lccookiename , lccookievalue , lndays)
{
	var lcdate , lccookie;
	
	if (lndays == null)
	{
		lndays = 0;
	}
	
	lccookie = lccookiename + "=" + escape(lccookievalue) + ";";

	if (lndays > 0)
	{
		lcdate = new Date();
		lcdate.setTime(lcdate.getTime() + (lndays * 24 * 3600 * 1000));
		lccookie = lccookie + "expires=" + lcdate.toUTCString() + ";";
	}
	
	lccookie = lccookie + "path=/";

	document.cookie = lccookie;
}

function getCookie(lccookiename)
{
	var lcretval , lnstart , lnend;
	
	lcretval = "";
	// any cookies at all?
	if (document.cookie.length > 0)
	{
		// can we find this one?
		lnstart = document.cookie.indexOf(lccookiename + "=");
		if (lnstart != -1)
		{
			// is there an end?
			lnend = document.cookie.indexOf(";" , lnstart + lccookiename.length + 1);
			if (lnend == -1)
			{
				lnend = document.cookie.length;
			}
			
			lcretval = document.cookie.substring(lnstart + lccookiename.length + 1 , lnend);
		}
	}

return unescape(lcretval);
}

function hidecookies(lcwhichsite , lnhowmanydays , lcidtext)
{
	loobject = getObject(lcidtext);

	if (loobject==null) return;
	
	loobject.style.display = "none";
	setCookie(lcwhichsite,"CLICKED",lnhowmanydays);
}

function removejavascriptwarning()
{
	lowarning = getObject('javascriptwarning');
	lowarning.innerHTML = "";
}

// a function that makes sure the random number lies within the range
function getrandombetween(lnmin , lnmax)
{
	var lcgotrandom;
	var lnrandom;

	lcgotrandom = "N";
	do
	{
		lnrandom = Math.floor(Math.random() * (lnmax - lnmin + 1) + lnmin);

		if (lnrandom >= lnmin && lnrandom <= lnmax)
		{
			lcgotrandom = "Y";
		}
	
	}
	while (lcgotrandom == "N");
	
	return lnrandom;
}


// function based on code taken from https://www.quirksmode.org/js/events_properties.html and not copyright Kevin Stone
function isrightmouseclick(e)
{
	var isrightclick;

	if (!e) var e = window.event;
	if (e.which) isrightclick = (e.which == 3);
	else if (e.button) isrightclick = (e.button == 2);

return isrightclick;
}

// function based on code taken from https://www.quirksmode.org/js/events_properties.html and not copyright Kevin Stone
function clicktarget(e)
{
	var lctarget;

	if (!e) var e = window.event;
	if (e.target) lctarget = e.target;
	else if (e.srcElement) lctarget = e.srcElement;
	if (lctarget.nodeType == 3) // defeat Safari bug
		lctarget = lctarget.parentNode;

return lctarget;
}

// function based on code taken from https://www.quirksmode.org/js/events_properties.html and not copyright Kevin Stone
function whichkeypressed(e)
{
	var code;
	if (!e) var e = window.event;
	if (e.keyCode) code = e.keyCode;
	else if (e.which) code = e.which;
	
	return code;
}
