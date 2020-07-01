//#################################################
//# 1x1 Online-Demo adaptive Task-Selection       #
//# University of Muenster                        #
//# email: niehaus@math.uni-muenster.de           #
//# created               02.06.1999,             #
//# last modifications    17.03.2004,             #
//# Author:  Engelbert Niehaus                    #
//# (C) Copyright 1999-2003 All rights reserved.  #
//# DO NOT EDIT THIS SCRIPT                       #
//#################################################

//alert("loading JS-Libary: openwin.js");
//------- creates an unique ID dependend on the time ----------------
//------- the vIDcounter makes the ID unique, if it is called ---------
var vIDcounter = 0;


function WindowHandler() {
	//---Atributes--------------
	this.windowURL    = "";
	this.windowName   = "subwindow";
	this.windowTitle  = "Title of the Window "+this.windowName;
	this.windowObject = 0;
	this.contentHTML  = "";
	this.width        = 640;
	this.heigth       = 480;
	this.menubar      = "yes";
	this.location     = "yes";
	this.status       = "yes";
	this.resizable    = "yes";
	this.scrollbars   = "yes";
	//---Methods----------------
	this.open		  = m_open;
	this.openDocHTML  = m_openHTML;
	this.openWindow	  = m_openWindow;
	this.close		  = m_close;
	this.closeDocHTML = m_closeHTML;
	this.closeWindow  = m_closeWindow;
	this.windowID	  = m_windowID;
	//--------------------------
}

function m_windowID() {
	//------------------------------------------------------------------
	var vNow          = new Date();
	var vHours        = vNow.getHours();
	var vMinutes      = vNow.getMinutes();
	var vSeconds      = vNow.getSeconds();
	var vMilliseconds = vNow.getMilliseconds();
	//------------------------------------------------------------------
	vIDcounter++;
	//------------------------------------------------------------------
	return  vHours + 'x' + vMinutes  + 'x' + vSeconds + 'x' + vMilliseconds  + 'x' + vIDcounter;
	//------------------------------------------------------------------
}
//--------------------------------------------------------------------------
function m_openWindow() {
	if (this.windowURL == "") {
		alert("openwin.js:55 - openWindow(): WindowHandler.windowURL is empty!");
	}; 
	//var lvBasicPath = extractPath(top.document.location.href);
	//var lvURL = combinedPathURL(lvBasicPath,this.windowURL);
	this.windowName = 'wSub'+this.windowID();
	this.windowObject = window.open(this.windowURL,this.windowName,
				' menubar='+this.menubar
				+',location='+this.location
				+',status='+this.status
				+',resizable='+this.resizable
				+',scrollbars='+this.scrollbars
				+',width='+this.width
				+',height='+this.height);
}
//--------------------------------------------------------------------------
function m_closeWindow() {
	this.windowObject.close();
}
//--------------------------------------------------------------------------
function m_open() {
	//if (this.windowObject) {
	//	this.windowObject.close();
	//};
	this.openWindow();
}
//--------------------------------------------------------------------------
function m_close() {
	this.closeWindow();
}
//--------------------------------------------------------------------------
function m_openHTML() {
	this.contentHTML = "";
	this.contentHTML += "<html><body>";
}
//--------------------------------------------------------------------------
function m_closeHTML() {
	this.contentHTML += "</body></html>";
	this.windowObject.document.open("text/html");
	this.windowObject.document.write(this.contentHTML)
	this.windowObject.document.close();
}
//--------------------------------------------------------------------------