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

//alert("loading JS-Libary: htmlcollector.js");

//=======================================================================================
//=======================================================================================
//=======================================================================================
function TableFormat() {
	//----Attributes----------------------------------------
	this.HEADER		= '<table border=2>';
	this.RowHEADER	= '<tr>';
	this.HeadHEADER	= '<td bgcolor=#c0c0c0><b>';
	this.HeadTAIL	= '</b></td>';
	this.ColHEADER	= '<td>';
	this.ColTAIL	= '</td>';
	this.RowTAIL	= '</tr>';
	this.TAIL     	= '</table>';
	this.fontAttribs=" size=2 face='Arial,Helvetica' ";
}

function MatrixFormat() {
	//---Super Class-------
	eval(CLASS(TableFormat));
	//----Attributes----------------------------------------
	this.maxRows    = 17;
	this.maxCols    = 17;
	//----Methods-------------------------------------------
	this.insertCellTags	= m_insertCellTags;
	this.numberCell 	= m_numberCell;
	this.headerRows 	= m_headerRows;
	this.headerCols 	= m_headerCols;
	this.fontWrapper 	= m_fontWrapper;
}

function VectorFormat() {
	//---Super Class-------
	eval(CLASS(MatrixFormat));
	//---Attributes--------
	//---Methods-----------
	this.headerRows = m_headerCols;
	this.headerCols = m_headerIndex;
}

function VectorTransposeFormat() {
	//---Super Class-------
	eval(CLASS(MatrixFormat));
	//---Attributes--------
	//---Methods-----------
	this.headerRows = m_headerIndex;
}

function HelpFormat() {
	//---Super Class-------
	eval(CLASS(MatrixFormat));
	//---Attributes--------
	//---Methods-----------
	this.headerRows = m_headerHelpRows;
}

function VectorHelpFormat() {
	//---Super Class-------
	eval(CLASS(HelpFormat));
	//---Attributes--------
	//---Methods-----------
	this.headerCols = m_headerIndex;
}

function m_fontWrapper(pString) {
	return "<font "+this.fontAttribs+">" +  pString + "</font>";
}

function m_insertCellTags(pBegin,pEnd) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	this.ColHEADER	= this.ColHEADER + pBegin;
	this.ColTAIL	= pEnd + this.ColTAIL;
}

function m_numberCell(pNumber) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	var vReturnValue = "";
	if (pNumber>0) {
		vReturnValue = "<font "+this.fontAttribs+" color=green><b>" +  pNumber + "</b></font>";
	} else if (pNumber<0) {
		vReturnValue = "<font "+this.fontAttribs+" color=red><b>" +  pNumber + "</b></font>";
	} else {
		 vReturnValue = "<font "+this.fontAttribs+" color=blue>" +  pNumber + "</font>";
	};
	return "<nobr>"+ vReturnValue + "</nobr>";
}

function m_headerRows(pRow) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	if (pRow<this.maxRows) {
		this.outputTask.setIndex(pRow);
		return this.fontWrapper("<nobr>"+ this.outputTask.getString() +"</nobr>");
	} else {
		return this.fontWrapper("<nobr>Stop</nobr>");
	};
	//return "<nobr>Row "+pRow+"</nobr>";
}

function m_headerCols(pCol) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	if (pCol<this.maxCols) {
		this.outputTask.setIndex(pCol);
		return this.fontWrapper("<nobr>"+ this.outputTask.getString() +"</nobr>");
	} else {
		return this.fontWrapper("<nobr>Start</nobr>");
	};
	//return "<nobr>Col "+pCol+"</nobr>";
}

function m_headerIndex(pIndex) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	return this.fontWrapper("<nobr>["+pIndex+"]</nobr>");
}

function m_headerHelpRows(pCol) {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	return this.fontWrapper("<nobr>Hilfe "+ pCol +"</nobr>");
}


//=======================================================================================
//=======================================================================================
//=======================================================================================

function MatrixHTMLCollector() {
	//----Attributes----------------------------------------
	this.outputString 	= '';
	this.matrix       	= null;
	this.fontAttribs=" size=2 face='Arial,Helvetica' ";
	//----Methods-------------------------------------------
	this.clearOutput 	= m_clearOutput;
	this.generateOutput	= m_generateOutput; //call: generateOutput(pMatrixFormat)
	this.fontWrapper 	= m_fontWrapper;
	//------------------------------------------------------
	return this;
};
//--------------------------------------------------------------------------------------
function m_clearOutput() {
	//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
	this.outputString = '';
}
//--------------------------------------------------------------------------------------
function m_generateOutput() {
	if (this.matrix!=null) {
		//---Method Class:  "MatrixHTMLcollector" defined in htmlcollector.js---
		this.outputString += this.matrix.format.HEADER;
		//--- Name and first Header Row with name of the matrix --------------------
		this.outputString += this.matrix.format.RowHEADER;
		this.outputString += this.matrix.format.HeadHEADER + this.fontWrapper(this.matrix.name)
						   + this.matrix.format.HeadTAIL;
		for (var j=1; j<=(this.matrix.cols); j++) {
			this.outputString += this.matrix.format.HeadHEADER + this.matrix.format.headerCols(j) +
							     this.matrix.format.HeadTAIL;
		};
		this.outputString += this.matrix.format.RowTAIL;
		//---RowHeader and Cells---------------------
		for (var i=1; i<=this.matrix.rows; i++) {
			this.outputString += this.matrix.format.RowHEADER;
			//---Head =first Col of the row i----
			this.outputString += this.matrix.format.HeadHEADER + this.matrix.format.headerRows(i) +
							     this.matrix.format.HeadTAIL;
			//---Cells in the row i----
			for (var j=1; j<=this.matrix.cols; j++) {
				this.outputString += this.matrix.format.ColHEADER
								  +  this.matrix.format.numberCell(this.matrix[i][j])
								  +  this.matrix.format.ColTAIL;
			};
			this.outputString += this.matrix.format.RowTAIL;
		};
		this.outputString += this.matrix.format.TAIL;
	} else {
		alert('htmlcollector.js:136 - ERROR: MatrixHTMLcollector.matrix is not defined!');
	}
}
//--------------------------------------------------------------------------------------