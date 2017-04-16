/*
 * printEm v1.0
 * @desc JavaScript printing plugin. Print any element and retain the styling.
 * @author Shiva Acharjee
 * 
 * Licensed under the MIT licence:
 *              http://www.opensource.org/licenses/mit-license.php
 *
 * (c) Shiva Acharjee 2017
 *
 * Usage:
 *
 *  printEm({
 *      pElem                        // Selector
 *      importCSS: true,             // import page CSS
 *      importStyle: false,          // import style tags
 *      loadCSS: "path/to/my.css",   // path to additional css file - us an array [] for multiple
 *      printTitle: "",              // add title to print page 
 *      header: null,                // prefix to html body
 *      footer: null,                // postfix to html body 
 *  });
 *
 * Notes:
 *  Tested on chrome and safari only. 
 */


function printEm(args){

	var TAG="printEM : ";
	var css_paths="";	
	var styles="<style type='text/css'>";
	var selector=args.pElem;
	var container_selector;
	var print_delay=300;
	var print_title="";
	var header="";
	var footer="";

			
	  		if (document.getElementById(selector)===null){	  				
	  			throw new Error(TAG+"Selector not found");		
			}


	if(args.importCss!=undefined){
		if(args.importCss==true){			
			if(args.loadCss===undefined){				
				throw new Error(TAG+"empty data for loadCss");			
			}
			//get the css paths and append
			for (i=0; i<args.loadCss.length; i++){   					 
   					 css_paths+="<link rel='stylesheet media='print'  href='"+args.loadCss[i]+"' type='text/css' media=\"print\"/>\n";
  			}
		}
	}


	if(args.importStyle!=undefined){

		if(args.importStyle==true){
			var styleTags=document.getElementsByTagName("style");
			for(i=0; i<styleTags.length;i++){
				styles+=styleTags[i].innerHTML;
			}
			styles+="\n</style>";			
		}	
	}


	//gte the container 
	var itm = document.getElementById(selector);
    container_selector = itm.cloneNode(true);
   
	
	if(args.printDelay!=undefined){
		if ((typeof args.printDelay === 'number') && (args.printDelay % 1 === 0)) {
			print_delay=args.printDelay;
		}else{
			throw new Error(TAG+"Invalid value for print delay");			
		}
	}

	if(args.printTitle!=undefined){
		print_title=args.printTitle;
	}

	if(args.header!=undefined){
		header=args.header;
	}

	if(args.footer!=undefined){
		footer=args.footer;
	}





	//print content
   var disp_setting="toolbar=yes,location=no,";
   disp_setting+="directories=yes,menubar=yes,";
   disp_setting+="scrollbars=yes,width=650, height=600, left=100, top=25";
   var content_vlue = container_selector;
   var docprint=window.open("","",disp_setting);
   
   docprint.document.open();
   docprint.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"');
   docprint.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');
   docprint.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">');
   docprint.document.write('<head><title>'+print_title+'</title>');
   docprint.document.write('<style type="text/css">#ft{bottom: 0;left: 0;  position: fixed; right: 0;} body{ margin:0px;');
   docprint.document.write('font-family:verdana,Arial;color:#000;-webkit-print-color-adjust: exact;');
   docprint.document.write('font-family:Verdana, Geneva, sans-serif; font-size:12px;}');
   docprint.document.write('a{color:#000;text-decoration:none;} </style>'+styles);
   docprint.document.write(css_paths+'</head><body onLoad="self.print()"><center>'+header+'</center>');
   docprint.document.write(container_selector.outerHTML);
   docprint.document.write('<center id="ft">'+footer+'</center></body></html>');
   docprint.document.close();
   docprint.focus();
}