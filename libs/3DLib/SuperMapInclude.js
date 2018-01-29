
function _IncludeScript(inc){
  var script='<'+'script type="text/javascript" src="libs/3DLib/lib_Realspace/'+inc+'"'+'><'+'/script>'; 
	document.writeln(script); 
}

function _Include2DScript(inc){
	var script='<'+'script type="text/javascript" src="libs/3DLib/lib_Ajax/'+inc+'"'+'><'+'/script>'; 
	document.writeln(script); 
}

if(!Function.__typeName)
{    
    _Include2DScript('MicrosoftAjax.js'); 

	_Include2DScript('SuperMap.Web.js');

	_Include2DScript('SuperMap.Web.iServerJava6R.js');

    _IncludeScript('SuperMap.Web.Realspace.js');   
                   
}