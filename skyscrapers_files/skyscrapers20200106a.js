//////////////////////////////////////////////////////////////////////
// JavaScript Copyright Kevin Stone 1997-2020. All Rights Reserved.
//////////////////////////////////////////////////////////////////////
function processonce()
{
	document.getElementById('autopencil').checked = false;
	process();
	check("N");
}

function processmany()
{
	autopencil();
	check("N");
}

function autopencil()
{
	lcstart = 'START';
	lcend = 'END';

	lckeepgoing = "Y";
	while (lckeepgoing == "Y")
	{
		lckeepgoing = process();
	}
}

// primarily for Android to force the chages to font sizes
function lostfocus(lntemprow , lntempcol)
{
	changefontsizes(lntemprow , lntempcol);

	if (lcshowall == 0 || lcshowall > lnsize)
	{
	document.getElementById("showtext").innerHTML = lcpuzzletext + "<BR>&nbsp;";
	}
	else
	{
	document.getElementById("showtext").innerHTML = lcpuzzletext + "<br><font color=red>[" + lcshowall + " highlighted]</font>";
	}
}

function changefontsizes(lntemprow , lntempcol)
{
	loinput = document.getElementById('BBskyscraperinput' + lntemprow + lntempcol);

	// set class based on how many in cell - default to n
	if (loinput.className != "unequalq" && loinput.className != "unequalcorrect")
	{
		if (loinput.value.length > 1)
		{
			if (loinput.value.indexOf(lcshowall) != -1 && loinput.value.length > 1)
			{
				loinput.className = 'unequalgreen';
			}
			else
			{
				loinput.className = 'unequals';
			}
		}
		else
		{
			loinput.className='unequaln';
		}
	}
}

function process()
{
	lcretval = "N";

	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('BBskyscraperinput' + lnrowcounter + lncolcounter);
			
			tempinput[(lnrowcounter - 1) * lnsize + lncolcounter] = loinput.value;

			if (loinput.value.length == 0)
			{
				// assume all, and then remove them as we go across the rows/cols
				loinput.value = lcpossvalues;
			}
		}
	}

	// update pencil marks - rows and cols
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('BBskyscraperinput' + lnrowcounter + lncolcounter);
			
			if (loinput.value.length != 1)
			{
				// remove from rows
				for (lntempcounter = 1; lntempcounter <= lnsize; lntempcounter++)
				{
					if (tempinput[(lntempcounter - 1) * lnsize + lncolcounter].length == 1 && lntempcounter != lnrowcounter && loinput.value.indexOf(document.getElementById('BBskyscraperinput' + lntempcounter + lncolcounter).value) != -1)
					{
						loinput.value = loinput.value.replace(document.getElementById('BBskyscraperinput' + lntempcounter + lncolcounter).value , '');
						lcretval = "Y";
					}

					if (tempinput[(lnrowcounter - 1) * lnsize + lntempcounter].length == 1 && lntempcounter != lncolcounter && loinput.value.indexOf(document.getElementById('BBskyscraperinput' + lnrowcounter + lntempcounter).value) != -1)
					{
						loinput.value = loinput.value.replace(document.getElementById('BBskyscraperinput' + lnrowcounter + lntempcounter).value , '');
						lcretval = "Y";
					}

				}
			}
		}
	}

	// make sure there are no blank squares
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('BBskyscraperinput' + lnrowcounter + lncolcounter);
			if (loinput.value.length == 0)
			{
				lcretval = "X";
				lncolcounter = 9999;
				lnrowcounter = 9999;
			}
		}
	}

return lcretval;
}

function keypressed(lcevent , lcrowkeyup , lccolkeyup , lcchecheckall)
{
	try
	{
		lckey = whichkeypressed(lcevent);

		if (lcevent.ctrlKey && (lckey==40 || lckey==38 || lckey==37 || lckey==39))
		{
			// down
			if (lckey == 40)
			{
				lcrowkeyup++;
				if (lcrowkeyup > lnsize)
				{
				lcrowkeyup = 1;
				}
			}

			// up
			if (lckey == 38)
			{
				lcrowkeyup--;
				if (lcrowkeyup < 1)
				{
				lcrowkeyup = lnsize;
				}
			}

			// left
			if (lckey == 37)
			{
				lccolkeyup--;
				if (lccolkeyup < 1)
				{
				lccolkeyup = lnsize;
				}
			}

			// right
			if (lckey == 39)
			{
				lccolkeyup++;
				if (lccolkeyup > lnsize)
				{
				lccolkeyup = 1;
				}
			}
			
			// set focus
			loinput = document.getElementById('BBskyscraperinput' + lcrowkeyup + lccolkeyup);
			loinput.focus();
		}
		else if (lcevent.shiftKey && lckey >= 48 && lckey <= 57)
		{
			cleardodgyletters(lcrowkeyup , lccolkeyup);
			lnkey = lckey - 48;
			lcshowall = String(lnkey);
			colourgrid();
		}
		// shift
		else if (lckey == 16)
		{
			// do nothing!
		}
		// TAB
		else if (lckey == 9)
		{
			// do nothing!
		}
		// ignore alt+tab (I think) and escape as they interfere with the alert box
		else if (lckey == 18 || lckey == 27 || lckey == 13 || lckey == 32)
		{
			// do nothing
		}
		// autopencil
		else if (lckey == 65)
		{
			cleardodgyletters(lcrowkeyup , lccolkeyup);
			processonce();
		}
		else
		{
			// also look here for A (as Android doesn't work as expected)
			// auto pencil marks?
			loinput = document.getElementById('BBskyscraperinput' + lcrowkeyup + lccolkeyup);
			if (loinput.value.indexOf("A") != -1 || loinput.value.indexOf("a") != -1)
			{
				cleardodgyletters(lcrowkeyup , lccolkeyup);
				processonce();
			}
			// everything else
			else
			{
				resetquestionsquare(lcrowkeyup , lccolkeyup);
				check("N");
			}
		}
	} 
	catch(e)
	{
	}
}

function showallchange()
{
	lcshowall = document.getElementById('showall').value;
	colourgrid();
	document.getElementById('showall').options[0].selected = true;
	loinput = document.getElementById('BBskyscraperinput11');
	loinput.focus();
}

function setfocusvars(lcrowsquare , lccolsquare)
{
	lcrowfocus = lcrowsquare;
	lccolfocus = lccolsquare;
}

function colourgrid()
{
	// recolour grid before
	check();
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('BBskyscraperinput' + lnrowcounter + lncolcounter);
			
			if (loinput.value.indexOf(lcshowall) != -1 && loinput.value.length > 1)
			{
				loinput.className = 'unequalgreen';
			}
		}
	}
	
	if (lcshowall == 0 || lcshowall > lnsize)
	{
	document.getElementById("showtext").innerHTML = lcpuzzletext + "<BR>&nbsp;";
	}
	else
	{
	document.getElementById("showtext").innerHTML = lcpuzzletext + "<br><font color=red>[" + lcshowall + " highlighted]</font>";
	}
}

function checknew()
{
	if (document.getElementById("showtext").innerHTML.toUpperCase().indexOf("SOLVED") == -1)
	{
		return confirm ("Are you sure? Your current puzzle will be lost!");
	}
	else
	{
		return true;
	}
}


function cleardodgyletters(lcrowkeyup , lccolkeyup)
{
	resetquestionsquare(lcrowkeyup , lccolkeyup);
	loinput = document.getElementById('BBskyscraperinput' + lcrowkeyup + lccolkeyup);
	loinput.value = loinput.value.replace(/[^1-9]/ig , '');
}

// don't allow them to overwrite the question
function resetquestionsquare(lcrowkeyup , lccolkeyup)
{
	if (lcrowkeyup > 0 || lccolkeyup > 0)
	{
		loinput = document.getElementById('BBskyscraperinput' + lcrowkeyup + lccolkeyup);
		lnqvalue = lcq.substring((lcrowkeyup-1) * lnsize + lccolkeyup - 1, (lcrowkeyup-1) * lnsize + lccolkeyup);

		if (lnqvalue != '.')
		{
			loinput.value = lnqvalue;
		}
	}
}

function check(lcclicked)
{
	// increment the number of times check was clicked
	if (lcclicked == "Y")
	{
		loinput = document.getElementById('BBskyscraperinput11');
		loinput.focus();
	}
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			changefontsizes(lnrowcounter , lncolcounter);
		}
	}

	// check for any mistakes
	lcerror = "N";
	lcallcorrect = "Y";
	llshowincorrect = document.getElementById('showincorrect').checked;
	
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('BBskyscraperinput' + lnrowcounter + lncolcounter);

			// single char that doesn't equal solution
			if (loinput.value.trim().length == 1 && loinput.value.trim() != lca.charAt((lnrowcounter - 1) * lnsize + (lncolcounter - 1)))
			{
				lcerror = "Y";
				
				if (lcclicked == "Y" && llshowincorrect == true) 
				{
					loinput.className = "unequalerror";
				}
			}
			
			// multiple chars, but with correct char missing
			if (loinput.value.trim().length > 1 && loinput.value.indexOf(lca.charAt((lnrowcounter - 1) * lnsize + (lncolcounter - 1))) < 0)
			{
				lcerror = "Y";
				
				if (lcclicked == "Y" && llshowincorrect == true) 
				{
					loinput.className = "unequalerrors";
				}
			}

			// all correct?
			if (loinput.value.trim().length != 1)
			{
				lcallcorrect = "N";
			}
		}
	}
	
	if (lcerror == "Y")
	{
		lcallcorrect = "N";
	}

	if (lcclicked == "Y")
	{
		if (lcallcorrect == "Y")
		{
			document.getElementById("showtext").innerHTML = "<span class=sgreen>Puzzle Solved [Time = " + showclock() + "]</span><br>&nbsp;";
			lowarnpage = getObject('warnpage');
			lowarnpage.checked = false;
		}
		else
		{
			if (lcerror == "Y")
			{
				document.getElementById("showtext").innerHTML = "<span class=sred>Mistakes Found [Time = " + showclock() + "]</span><br>&nbsp;";
			}
			else
			{
				document.getElementById("showtext").innerHTML = "<span class=sgreen>No Mistakes Found [Time = " + showclock() + "]</span><br>&nbsp;";
			}
		}
	}
	else
	{
		if (lcallcorrect == "Y")
		{
			document.getElementById("showtext").innerHTML = "<span class=sgreen>Puzzle Solved [Time = " + showclock() + "]</span><br>&nbsp;";
			lowarnpage = getObject('warnpage');
			lowarnpage.checked = false;
			for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
			{
				for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
				{
					loinput = document.getElementById('BBskyscraperinput' + lnrowcounter + lncolcounter);
					loinput.className = 'unequalcorrect';
					loinput.readOnly = true;
				}
			}
		}
		else
		{
			if (lcshowall == "0" || parseInt(lcshowall) > lnsize)
			{
			document.getElementById("showtext").innerHTML = lcpuzzletext + "<BR>&nbsp;";
			}
			else
			{
			document.getElementById("showtext").innerHTML = lcpuzzletext + "<BR><font color=red>[" + lcshowall + " highlighted]</font>";
			}
		}
	}
}

function startclock()
{
	lnclock = new Date();
}

function showclock()
{
	lnnow = new Date();	
	lnseconds = Math.round((lnnow.getTime() - lnclock.getTime()) / 1000);

	lnmins = Math.floor(lnseconds / 60);
	lnsecs = lnseconds - (60 * lnmins);
	if (lnsecs < 10)
	{
		lnsecs = "0" + lnsecs;
	}

	return lnmins + ":" + lnsecs;
}

function changeimage(lcwhichone)
{
	loobject = document.getElementById(lcwhichone);
	logif = loobject.src;

	if(logif.substring(logif.length-5,logif.length) == 'b.gif')
	{
		lctempgif = logif.substring(logif.length-7,logif.length);
		lctempgif = lctempgif.substr(0,2);
		loobject.src = '/gifs_tower/' + lctempgif +'.gif';
	}
	else
	{
		lctempgif = logif.substring(logif.length-6,logif.length);
		lctempgif = lctempgif.substr(0,2);
		loobject.src = '/gifs_tower/' + lctempgif + 'b.gif';
	}
	// set focus back in grid
	loinput = document.getElementById('BBskyscraperinput' + lcrowfocus + lccolfocus);
	loinput.focus();
}

function showanswer()
{
	if (confirm ('Are you sure you want to see the answer?'))
	{
		for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
		{
			for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
			{
				loinput = document.getElementById('BBskyscraperinput' + lnrowcounter + lncolcounter);
				loinput.value = lca.charAt((lnrowcounter - 1) * lnsize + (lncolcounter - 1));
			}
		}
		check("N");
	}
}

function printanswer()
{
	for (lnrowcounter = 1; lnrowcounter <= lnsize; lnrowcounter++)
	{
		for (lncolcounter = 1; lncolcounter <= lnsize; lncolcounter++)
		{
			loinput = document.getElementById('BBskyscraperinput' + lnrowcounter + lncolcounter);
			loinput.value = lca.charAt((lnrowcounter - 1) * lnsize + (lncolcounter - 1));
		}
	}
} 
 
 
 
 
 
 
 
