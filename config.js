//#################################################
//# Demo Cryto Engine Caesar                      #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    17.03.2004,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public Licence                            #
//#################################################
//alert("loading JS-Libary: config.js");
//-------------------------------------------------

//-------------------------------------------------
//----CONST----------------------------------------
//-------------------------------------------------
var BASE    = 3;			//p-adic base of the number system
var DIM1PLUS1  = ((BASE+1)*(BASE+1))+1;	//Dimension of the  Matrix of Weights for the 1x1 Tasks
	//alert("config.js:19 DIM1PLUS1="+DIM1PLUS1);
var DIMHELP = 7;			//Dimension of the  HelpMatrix = Number of Help-Screens
var HELP1   = 1;			//Index of Help1 in Help Associator

//-----Fonts------
var B_FONT_ARIAL = "<font face=\"Arial,Helvetica\">";
var B_FONT_2 	 = B_FONT_ARIAL+ "<font size=\"2\">";
var E_FONT_2	 = "</font></font>";
var E_FONT_ARIAL = "</font>";
var B_FONT_RED   = "<font color=\"#FF0000\">" + B_FONT_ARIAL;
//var B_FONT_RED   = "<font color=\"#CC0000\">" + B_FONT_ARIAL;
var E_FONT_RED   = E_FONT_ARIAL + E_FONT_ARIAL;
var B_FONT_GREEN = "<font color=\"#22dd22\">" + B_FONT_ARIAL;
var E_FONT_GREEN = E_FONT_ARIAL + E_FONT_ARIAL;
var B_H1 = "<font size=+3>" + B_FONT_ARIAL;
var E_H1 = E_FONT_ARIAL + "</font>";

var B_C = "<center>";
var E_C = "</center>";

//var C_GREEN = "#99ff99";
var C_GREEN = "#ccffcc";