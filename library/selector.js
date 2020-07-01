//#################################################
//# 1x1 Online-Demo adaptive Task-Selection       #
//# University of Muenster                        #
//# email: niehaus@math.uni-muenster.de           #
//# created               02.06.1999,             #
//# last modifications    27.02.2003,             #
//# Author:  Engelbert Niehaus                    #
//# (C) Copyright 1999-2003 All rights reserved.  #
//# DO NOT EDIT THIS SCRIPT                       #
//#################################################

//alert("loading JS-Libary: selector.js");

function SelectorHTML() {
	eval(CLASS(MatrixFormat));
	//---Attributes-------------------------
	this.tempTask = new Task();
	this.selectorMatrix = null;
	this.selected	= 0;
	this.name		= "Hilfen";
	this.minimumTitle = "minimale Hilfe";
	this.maximumTitle = "maximale Hilfe";
	this.selectorFunction = "top.vTaskControl.evalHelpSelect";
	this.writeValue = "";
	//---Methods----------------------------
	this.showSelector 	= m_showSelector;
	this.radioTitle		= m_headerHelpRows;
	//this.radioTitle	= m_radioTitle;
}

function m_radioTitle (pRow) {
	//---Method Class: "SelectorHTML"  defined in selector.js---
	return "Selector-ID=" + pRow;
}

function m_showSelector () {
	//---Method Class: "SelectorHTML"  defined in selector.js---
	this.writeValue  = "";
	this.writeValue += B_FONT_ARIAL + "<b>" + this.name + "</b><hr>";
	this.writeValue += "<form name=\"fRadioMenu\" action=\"#\">";
	var vChecked = "";
	if (this.selectorMatrix != null) {
		this.writeValue += this.minimumTitle +"<br>";
		for (var i=1; i<=this.selectorMatrix.rows; i++) {
			if (this.selected == i) {
				this.writeValue += B_FONT_RED;
				vChecked = "checked";
			} else {
				vChecked = "";
			};
			if (this.selectorMatrix[i][1]>0) {
				this.writeValue += "<input type=\"radio\" name=\"radioSelector\" value=\""+this.selectorMatrix[i][1]
							+ "\" "+ vChecked + ">"+ this.radioTitle(this.selectorMatrix[i][1]) + "<br>";
			} else {
				this.writeValue += "selectorMatrix["+i+"]_undef!<br>";
			}
			if (this.selected == i) {
				this.writeValue += E_FONT_RED;
			};
		};
		this.writeValue += this.maximumTitle +"<hr>";
		this.writeValue += "<input type=\"button\" value=\"Auswählen\" onClick=\""+this.selectorFunction
		this.writeValue += "(this.form.radioSelector)\">"
	} else {
		this.writeValue += "<input type=\"button\" value=\"Close\" onClick=\"top.vTaskControl.frameControl.initMenu()\">";
	};
	this.writeValue += "</form>";
	this.writeValue += E_FONT_ARIAL;
	//alert(this.writeValue);
	return this.writeValue;
}