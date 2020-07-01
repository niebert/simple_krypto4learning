//#################################################
//# Demo Cryto Engine Caesar                      #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    17.03.2004,             #
//# Author:  Engelbert Niehaus                    #
//# (C) Copyright 1999-2003 All rights reserved.  #
//# DO NOT EDIT THIS SCRIPT                       #
//#################################################

//alert("loading JS-Libary: matrix.js");

// ##########################################################################################
// Class: Matrix
// ====== is a Matrix of objects, which can store different type of objects.
//        a dynamic storage structure similar to an Array.
//  creation:  			vVariable = new Matrix();
//  access to an element:	vVariable[5] = 'Text';
//  add an element:		vVariable.add('new Text');
//  length of storing structure:vVariable.length;
// ##########################################################################################

// ##########################################################################################
//---- Constructor Matrix() - OBJECT -

function Matrix() {
	//---Attributes-------------------------
	this.name   = 'Matrix';
	this.format = pFormat;
	this.rows   = 0;
	this.cols   = 0;
	//---Methods---------
	this.create			= m_create_matrix;
    this.show			= m_show_matrix;
    this.init			= m_init_matrix;
    this.add			= m_row_add;
    this.swap			= m_row_swap;
    this.insert			= m_row_insert;
    this.remove			= m_row_remove;
    this.removeall		= m_row_removeall;
    this.scale			= m_scale;
	//return this
}
//alert("Matrix"+Matrix);

function m_create_matrix(pRows,pCols) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("matrix.js:52 m_create_matrix()\npRows="+pRows+"  pCols="+pCols);
	this.rows = pRows;
	this.cols = pCols;
	//alert("pRows="+pRows+", pCols"+pCols)
	for (var i=1; i<=pRows; i++) {
		this[i] = new MatrixColumn();
		for (var j=1; j<=pCols; j++) {
			//this[i].add("row"+i+"col"+j);
			this[i].add(0);
		};
	};
	//alert("matrix.js:73 - m_create_matrix() this.rows="+this.rows);
}

function m_show_matrix(pWindowHandler) {
	//---Method Class:  "Matrix" defined in matrix.js---
	//alert("matrix.js:92 m_show_matrix()\npWindowHandler.windowName="+pWindowHandler.windowName+" ");
	pWindowHandler.openDocHTML();
	//---TABLE HEADER---
	pWindowHandler.contentHTML += B_FONT_ARIAL + "<b>" + pWindowHandler.windowTitle + "</b>" + B_FONT_ARIAL;
	pWindowHandler.contentHTML +="<table border=2>";
	pWindowHandler.contentHTML +="<tr>";
	pWindowHandler.contentHTML +="<th>" + this.name + "</th>";
	for (var j=1; j<=this.cols; j++) {
		pWindowHandler.contentHTML +="<th>C" + j + "</th>";
	};
	pWindowHandler.contentHTML +="</tr>";
	//---TABLE ROWS---
	for (var i=1; i<=this.rows; i++) {
		pWindowHandler.contentHTML +="<tr>";
		pWindowHandler.contentHTML +="<th>R" + i + "</th>";
		for (var j=1; j<=this.cols; j++) {
			pWindowHandler.contentHTML +="<td><nobr>" + this[i][j] + "</nobr></td>";
		};
		pWindowHandler.contentHTML +="</tr>";
	};
	//---TABLE TAIL---
	pWindowHandler.contentHTML +="</table>";
	//alert("matrix.js:62 - m_create_matrix() this.rows="+this.rows);
	pWindowHandler.closeDocHTML();
}


function m_init_matrix(pInitValue) {
	//---Method Class:  "Matrix" defined in matrix.js---
	for (var i=1; i<=this.rows; i++) {
		for (var j=1; j<=this.cols; j++) {
			this[i][j] = pInitValue;
		};
	};
};

function m_scale(pFactor) {
	//---Method Class:  "Matrix" defined in matrix.js---
	for (var i=1; i<=this.rows; i++) {
		for (var j=1; j<=this.cols; j++) {
			this[i][j] *= pFactor;
		};
	};
};


function m_transpose(pMatrix) {
	//---Method Class:  "Matrix" defined in matrix.js---
	// this = pMatrix + this
	if (this.rows != pMatrix.cols) {
		alert("WARNING: Multiplication Row mismatch of transposed Matrix !");
	} else if (this.cols != pMatrix.rows) {
		alert("WARNING: Multiplication Column mismatch of transposed Matrix !");
	} else {
		for (var i=1; i<=this.rows; i++) {
			for (var j=1; j<=this.cols; j++) {
				this[i][j] += pMatrix[j][i];
			};
		};
	};
}

function m_addition(pMatrix) {
	//---Method Class:  "Matrix" defined in matrix.js---
	// this = pMatrix + this
	if (this.rows != pMatrix.rows) {
		alert("WARNING: Multiplication Row mismatch of added Matrix !");
	} else if (this.cols != pMatrix.cols) {
		alert("WARNING: Multiplication Column mismatch of added Matrix !");
	} else {
		for (var i=1; i<=this.rows; i++) {
			for (var j=1; j<=this.cols; j++) {
				this[i][j] += pMatrix[i][j];
			};
		};
	};
}

function m_multiplication(pMatrix1,pMatrix2) {
	//---Method Class:  "Matrix" defined in matrix.js---
	// this = pMatrix1 x pMatrix2
	if (pMatrix1.cols != pMatrix2.rows) {
		alert("WARNING: Multiplication Row-Column mismatch of Matrix1 and Matrix2 !\n"+
				"pMatrix1.cols="+pMatrix1.cols+" pMatrix2.rows="+pMatrix2.rows);
	} else {
		if ((this.rows != pMatrix1.rows) || (this.cols != pMatrix2.cols)) {
			alert("WARNING: wrong dimension of result matrix\n"+
			      "ROWS="+this.rows+" pMatrix1.rows="+pMatrix1.rows+"\n"+
			      "COLS="+this.cols+" pMatrix2.cols="+pMatrix2.cols+"\n");
		} else {
			//alert('Start Multiplicaton');
			var multSum = 0;
			for (var i=1; i<=this.rows; i++) {
				for (var j=1; j<=this.cols; j++) {
					multSum = 0;
					for (var k=1; k<=pMatrix1.cols; k++) {
						//if (pMatrix1[i][k]*pMatrix2[k][j]>0) {
						if (pMatrix2[k][j]>0) {
							//alert("pMatrix1[i"+i+"][k"+k+"]*pMatrix2[k"+k+"][j"+j+"]="+pMatrix1[i][k]*pMatrix2[k][j]+" pMatrix2[k][j]="+pMatrix2[k][j]);
						};
						multSum += pMatrix1[i][k]*pMatrix2[k][j];
					};
					this[i][j] += multSum;
				};
			};
		};
	};
	//alert("ResultMatrix[2][3]="+this[2][3]);
}


// ##########################################################################################
// insert() - METHOD of Matrix - inserts an object at index pi to a MatrixArray.

function m_row_insert(object,pi) {
	//---Method Class:  "Matrix" defined in matrix.js---
        this.add(object);
        this.swap(pi,this.rows)
}
// ##########################################################################################
// swap() - METHOD of Matrix - swaps two objects at index pi1 and p12 MatrixArray.

function m_row_swap(pi1,pi2) {
	//---Method Class:  "Matrix" defined in matrix.js---
	var evalString = "";
	var lvValue = 0;
	if (pi1!=pi2) {
		for (i=1;i<=this.cols;i++) {
			evalString += "lvValue             = this["+pi1+"]["+i+"];\n";
			evalString += "this["+pi1+"]["+i+"] = this["+pi2+"]["+i+"];\n";
			evalString += "this["+pi2+"]["+i+"] = lvValue;";
		};
		alert(evalString);
		//eval(evalString);
	}
}

// ##########################################################################################
// remove() - METHOD of Matrix - deletes an object at index pi in a MatrixArray.

function m_row_remove(pi) {
	//---Method Class:  "Matrix" defined in matrix.js---
    if ((pi<=this.rows) && (pi>0)) {
        for (i=pi; i<this.rows; i++)
        {
                this[i]=this[i+1];
        };
        this.rows--;
    }
}

function m_row_removeall() {
	//---Method Class:  "Matrix" defined in matrix.js---
	for (var i=1; i<=this.rows; i++) {
		this[i].removeall();
	};
	this.rows = 0;
}

// ##########################################################################################
function m_row_add(object) {
	//---Method Class:  "Matrix" defined in matrix.js---
        this.rows++;
        this[this.rows] = object
}
// ##########################################################################################
// ##########################################################################################
// # MATRIX COLUMNS
// ##########################################################################################
// ##########################################################################################


function MatrixColumn() {
	//---Attributes-----------------------
        this.length = 0;
	//---Methods--------------------------
        this.add       = m_col_add;
        this.insert    = m_col_insert;
        this.remove    = m_col_remove;
        this.removeall = m_col_removeall;
	//-------------------------------------
}

// ##########################################################################################
// insert() - METHOD of MatrixColumn - inserts an object at index pi to a MatrixArray.

function m_col_insert(object,pi) {
	//---Method Class:  "MatrixColumn" defined in matrix.js---
        this.length++;
		if (pi > this.length) {pi=this.length};
        for (i=this.length;i>pi;i--)
        {
                this[i]=this[i-1];
        };
        this[pi] = object;
}

// ##########################################################################################
// remove() - METHOD of MatrixArray - deletes an object at index pi in a MatrixArray.

function m_col_remove(pi) {
	//---Method Class:  "MatrixColumn" defined in matrix.js---
    if ((pi<=this.length) && (pi>0)) {
        for (i=pi; i<this.length; i++)
        {
                this[i]=this[i+1];
        };
        this.length--;
    }
}

function m_col_removeall() {
	//---Method Class:  "MatrixColumn" defined in matrix.js---
	this.length = 0;
}

// ##########################################################################################
function m_col_add(object) {
	//---Method Class:  "MatrixColumn" defined in matrix.js---
        this.length++;
        this[this.length] = object
}