//###################################################################
//#					CLASSES IN JAVASCRIPT							#
//#	Basic generator function for object orientated programming		#
//# in JavaScript.													#
//# Author: 			Engelbert Niehaus							#
//# Created: 			2, May, 1999								#
//# Last Modification:	12, June, 1999								#
//###################################################################

// This is an CLASS-OPERATOR, 

function CLASS(pClass) {
	//--- generate the ClassBody from pClass for evaluation in the class
	//--- which inherits pClass.
	//--- Call:     eval(CLASS(MyClass))
	pClassBody = pClass+" ";
	var lvBegin = pClassBody.indexOf("{")+1;
	var lvEnd   = pClassBody.lastIndexOf("}")
	var lvCount = lvEnd-lvBegin;
	pClassBody = pClassBody.substr(lvBegin,lvCount);
	return pClassBody;
}

//###################################################################
// EXAMPLE:
//###################################################################
//
//	function MyClass1 () {
//		//---Attributes--------
//		this.var1  = "var1";
//		//---Methods-----------
//		this.show1 = m_show1;
//	}
//
//	function m_show1 () {
//		alert("var1="+this.var1);
//	}
//
//	function m_show2 () {
//		alert("var1="+this.var1 + " var2="+this.var2);
//	}
//
//	function MyClass2() {
//		//---Super Class-------
//		eval(CLASS(MyClass1));
//		//---Attributes--------
//		this.var2 = "var1";
//		//---Methods-----------
//		this.show2 = m_show2;
//	}
//
//	var myObject = new MyClass2();
//	myObject.show2();
//	myObject.show1();
//	myObject.var1  = 'This is content of var1';
//	alert("MyClass2-Object var1=" + myObject.var1);
//
//###################################################################