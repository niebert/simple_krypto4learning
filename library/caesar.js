//#################################################
//# Demo Cryto Engine Caesar                      #
//# University of Koblenz-Landau                  #
//# email: niehaus@math.uni-landau.de             #
//# created               02.06.1999,             #
//# last modifications    17.03.2004,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public Licence                            #
//#################################################

//alert("loading JS-Libary: caesar.js");

// ##########################################################################################
// Class: Caesar Encryption
// ======  a Caesar-Object maps the first character of "this.keySource" to the first character of
// the the string "this.keyDestination" and so on for the second and third character of
// this.keySource
// ##########################################################################################

// ##########################################################################################
//---- Constructor Caesar() - OBJECT -

function Caesar() {
	//---Super Class------------------------
	//eval(CLASS(...));
	//---Attributes-------------------------
	this.tableFormat    = new TableFormat();
	this.formPath       = "";
	this.keySource      = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß0123456789";
	this.keyDestination = "5Ü7LGTJEKßDW96B0XSPVMY4HÄUQ2AOI3ZNÖ8F1RC";
	this.ColMax         = 10; // Number of Columns in Key Display and Edit Table
	//---Methods---------
    this.init			   = m_init_Caesar;
    this.encode			   = m_encode_Caesar;
    this.decode			   = m_decode_Caesar;
    this.coding			   = m_coding_Caesar;
	this.setFormKey        = m_setFormKey;
	this.getFormKey        = m_getFormKey;
	this.setDestinationKey = m_setDestinationKey;
	this.getDestinationKey = m_getDestinationKey;
    this.randomKey		   = m_randomKey;
    this.reverseKey		   = m_reverseKey;
    this.checkChanges	   = m_checkChanges;
    this.equalKeyLength	   = m_equalKeyLength;
    this.fillKeyTable	   = m_fillKeyTable;
    this.generateKeyTable  = m_generateKeyTable;
    this.displayKeyTable   = m_displayKeyTable;
    this.editKeyTable	   = m_editKeyTable;
    //---End Constructor--------------------
}

function m_init_Caesar(pFormPath) {
	//---Method Class:  "Caesar" defined in caesar.js---
	this.keyDestination = this.keySource;
	this.formPath       = pFormPath;
};

function m_coding_Caesar(pSourceKey,pDestinationKey,pText) {
	//---Method Class:  "Caesar" defined in caesar.js---
	var vReturnText = "";
	var vChar = ""
	if (this.equalKeyLength(pSourceKey,pDestinationKey)) {
		// create a vCodeHash
		var vEncodeHash = new Array();
        for (var i=1; i<=pSourceKey.length; i++) {
            vEncodeHash[pSourceKey.substring(i-1,i)] = pDestinationKey.substring(i-1,i);
        };
        //alert("A->"+vEncodeHash['A']);
        // encode the text "pText"
        for (var j=1; j<=pText.length; j++) {
        	vChar = pText.substring(j-1,j);
        	//alert("vChar="+vChar);
        	if (this.keyDestination.indexOf(vChar)>=0) {
        		//alert(vChar+"->"+vEncodeHash[vChar]);
        		vReturnText += vEncodeHash[vChar];
        	} else {
        		vReturnText += vChar;
        	}
 		};
    };
    return vReturnText;
};

function m_encode_Caesar(pText) {
	//---Method Class:  "Caesar" defined in caesar.js---
	top.vSourceText  = pText;
	top.vEncodedText = this.coding(this.keySource,this.keyDestination,pText);
	return top.vEncodedText; 
};

function m_decode_Caesar(pText) {
	//---Method Class:  "Caesar" defined in caesar.js---
	top.vSourceText  = this.coding(this.keyDestination,this.keySource,pText);
	top.vEncodedText = pText;
	return top.vSourceText; 
};

function m_reverseKey() {
	//---Method Class:  "Caesar" defined in caesar.js---
	// sets the keyDestination in reverse order of keySource
	var vTempKey = "";
	for (var i=1; i<=this.keyDestination.length; i++) {
		vTempKey = this.keyDestination.substring(i-1,i) + vTempKey;
	};
	this.keyDestination = this.keySource;
};

function m_setFormKey(pIndex,pChar) {
	//---Method Class:  "Caesar" defined in caesar.js---
	pChar = pChar.toUpperCase();
	vEvalStr = this.formPath+".key"+pIndex+".value='"+pChar+"';";
	//alert("caesar.js:68 - setFormKey()\npIndex="+pIndex+" pChar="+pChar+"\n"+vEvalStr);
	eval(vEvalStr);
}

function m_getFormKey(pIndex) {
	//---Method Class:  "Caesar" defined in caesar.js---
	var vChar    = " ";
	var vEvalStr = "";
	if ((pIndex>0) && (pIndex)) {
        vEvalStr = this.formPath+".key"+pIndex+".value="
                 + this.formPath+".key"+pIndex+".value.toUpperCase()";
        //alert(vEvalStr);
        eval(vEvalStr);
        vEvalStr = "vChar="+this.formPath+".key"+pIndex+".value";
        eval(vEvalStr);
    } else {
    	alert("ERROR:\ncaesar.js:97\nIndex="+pIndex+" not valid: 1<=Index<="+this.keyDestination.length);
    };
	return vChar;
}

function m_setDestinationKey(pIndex,pChar) {
	//---Method Class:  "Caesar" defined in caesar.js---
	var vPreString  = "";
	var vPostString = "";
	//alert("caesar.js:93 - setDestinationKey()\npChar="+pChar+" pChar.length="+pChar.length);
	if (pChar.length == 1) {
		if (pIndex>1) {
            vPreString = this.keyDestination.substring(0,pIndex-1);
        };
        if (pIndex<(this.keyDestination.length-1)) {
            vPostString = this.keyDestination.substring(pIndex,this.keyDestination.length);
        };
        this.keyDestination = vPreString + pChar + vPostString;
    } else {
    	alert("ERROR:\nCaesar.setDestinationKey()-Call:93 File: caesar.js\n"
    		  +"Parameter 'pChar="+pChar+"' consists not of only ONE character");
    }
}

function m_getDestinationKey(pIndex) {
	//---Method Class:  "Caesar" defined in caesar.js---
	return this.keyDestination.substring(pIndex-1,pIndex);
}

function m_checkChanges(pIndex) {
	//---Method Class:  "Caesar" defined in caesar.js---
	// this function (method) is called on an "onchange"-Event
	// of an input-element of a form. Example: "B->Z" and "D->Y"
	// e.g. User changes the mapping of "B->Z" to "B->Y"
	// the "onchange"-Event calls this function with the pIndex=2
	// because "B" is the second character in this.sourceKey.
	// (1) check the old mapping "B->Z" i.e. extract the 2nd character
	//     from this.keyDestination. In this example it is "Z"
	var vOldChar = this.getDestinationKey(pIndex);
	//alert("caesar.js:117 - m_checkChanges()\nvOldChar="+vOldChar);
	// (2) Extract the character the user enter in the form for the
	//     pIndex=2. In this example it is "Y"
	var vNewChar = this.getFormKey(pIndex);
	//alert("caesar.js:121 - m_checkChanges()\nvNewChar="+vNewChar);
	// (3) Find the Old Index of the entered character "Y" in the old
	//     setting of this.destinationKey.
	//     In this example it is the index is "4" of the character "D",
	//     because of old mapping "D->Y" (+1 because key-Index starts with 1)
	var vOldIndexOfNewChar = this.keyDestination.indexOf(vNewChar)+1;
	//alert("caesar.js:127 - m_checkChanges()\nvOldIndexOfNewChar="+vOldIndexOfNewChar);
	// (4) Swap characters in this.destinationKey
    this.setDestinationKey(pIndex,vNewChar);              //2: "B->Y"
    this.setDestinationKey(vOldIndexOfNewChar,vOldChar);  //4: "D->Z"
    //alert("caesar.js:132 - m_checkChanges()\nkeyDestination=\n"+this.keyDestination);
    this.setFormKey(vOldIndexOfNewChar,vOldChar);         //4: "D->Z"
}

function m_randomKey() {
	//---Method Class:  "Caesar" defined in caesar.js---
	// generates a random key string in this.keyDestination
	//-------------------------
	function random_index(pMax) {
		var vReturnValue = Math.round(Math.random()*pMax-0.5);
		if (vReturnValue<0) {
			vReturnValue = 0;
		} else if (vReturnValue>=pMax) {
			vReturnValue = pMax-1;
		};
		return vReturnValue;
	}
	//-------------------------

	var vTempKey = this.keySource;
	var vIndex   = 0;
	this.keyDestination = "";
	for (var i=this.keySource.length; i>0; i--) {
		vIndex = random_index(i);
		this.keyDestination += vTempKey.charAt(vIndex);
		vTempKey = deleteCharAt(vTempKey,vIndex)
	    //if (i>this.keySource.length-8) {
	    //	alert("vTempKey ="+ vTempKey +"\nvIndex="+vIndex+"\nthis.keyDestination="+this.keyDestination);
	    //}
	};

};

function m_fillKeyTable() {
	//---Method of Class:  "Caesar" defined in caesar.js---
	//  formPath is a String, that defines a form of a document.
	//  e.g. formPath = 'top.main.document.fDefineKey'
	//  the attribute is a string and NOT the object, because
	//  the string is used in a concatenation for eval-expression of the
	//  key-text-components of the form.
	//  Call for an object "vCaesar" of the Class "Caesar" defined in the top-frame is:
	//            top.vCaesar.fillKeyTable()
	//  definition of this.formPath is necessary (see objectgenerate.js)
	//  e.g. vCaesar.formPath = 'top.main.document.fDefineKey');
	//  Method: fills the text-Input-Tags with the names "key1" "key2" with the Keys in
	//  this.keyDestination
	for (var i=1; i<=this.keyDestination.length; i++) {
		this.setFormKey(i, this.getDestinationKey(i));
	};
};

function m_equalKeyLength(pSource,pDestination) {
	var returnValue = true;
	if (pSource.length != pDestination.length) {
		alert("Error:\nCaesar.generateKeyTable()-call:89\n" +
			  "pSource-String and pDestination-String are of different length!\n" +
			  "pSource.length="      + pSource.length + "  " +
			  "pDestination.length=" + pDestination.length + "\n" +
			  "pSource=" + pSource   + "\n"+"pDestination=" + pDestination);
		returnValue = false;
	};
	return returnValue;
};

function m_generateKeyTable(pSource,pDestination,pPreTags,pPreNumber,pPostNumber,pPostTags) {
	//---Method of Class:  "Caesar" defined in caesar.js---
	// generates HTML-Code for Display- and Edit-Tables and
	// returns the HTML-Code for a document.write(...)-call in an HTML-Page
	// Parameter: pSource and pDestination are the Strings for the Caesar character mapping
	//            pPreTags,pPreNumber,pPostNumber,pPostTags are HTML-Strings to wrap the
	//            the Cell-Content of the destination row in the KeyTable
	// Call:  this.generateKeyTable(this.keySource,this.keyDestination,'','','','')
	//            is the most simple call with no wrapping strings in the destination cells.

	//	alert("Error:\nCaesar.generateKeyTable()-call:86\n"+"pSource="+pSource+"\n"+"pDestination="+pDestination);

	var vContentHTML = "";
	var vInsertKeyNumber = "";
	var vChar = ""; //character
	if (this.equalKeyLength(pSource,pDestination)) {
		//---TABLE LOOP---------
        for (var tab=0; tab<pSource.length; tab=tab+this.ColMax) {
            //---TABLE HEADER---
            vContentHTML +="<table border=2>";
            vContentHTML +="<tr>";
            for (var i=tab+1; i<=tab+this.ColMax; i++) {
                vContentHTML +="<th bgcolor='"+C_GREEN+"'>" + B_FONT_ARIAL
                             + pSource.substring(i-1,i) + E_FONT_ARIAL + "</th>";
            };
            vContentHTML +="</tr>\n";
            //---TABLE ROWS---
            vContentHTML +="<tr>\n";
            for (var i=tab+1; i<=tab+this.ColMax; i++) {
                    if (pPreNumber != "") {
                        vInsertKeyNumber =  "onchange=\"top.vCaesar.checkChanges("+i+")\"" + pPreNumber + i + pPostNumber ;
                    };
                    vChar = pDestination.substring(i-1,i)+"";
                    if (i<8) {
                    	//alert("Destination-Character="+ vChar);
                    	//alert(vContentHTML);
                    };
                    vContentHTML +="<td><nobr>"+ E_FONT_ARIAL
                    			 + pPreTags  + vInsertKeyNumber + vChar+ pPostTags
                    			 + E_FONT_ARIAL + "</nobr></td>";
            };
            vContentHTML +="</tr>";
            //---TABLE TAIL---
            vContentHTML +="</table>";
            vContentHTML +="<p/>";
        };
    } else {
    	vContentHTML = B_FONT_RED + "<p/>ERROR: length of keys are not equal!<p/>"+ E_FONT_RED;
    };
    return vContentHTML;
}

function m_displayKeyTable() {
    return this.generateKeyTable(this.keySource,this.keyDestination,'&nbsp;&nbsp;','','','&nbsp;&nbsp;');
}

function m_editKeyTable() {
	// <input type="text"  name="key1" size="3" maxlength="1">
    //return this.generateKeyTable(this.keySource,this.keyDestination,'','','','');
    return this.generateKeyTable(this.keySource,this.keyDestination,  '<input type="text" ','name="key','" value="','" size="3" maxlength="1">');
}