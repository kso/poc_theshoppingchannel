<form id="form" style="padding:10px;background: #f9f9f9; margin-bottom:0px;" class="header-search" action="<c:url value="index.html"/>" accept-charset="UTF-8">
	<fieldset>
		<input autocomplete="off" type="text" onkeydown="$('#refinements').val('')" name="q" id="q2" class="cursorFocus" value="<c:out value="${param.q2}"/>">
         <button><i class="icon-search"></i></button>
    </fieldset>
  
  	<input type="hidden" name="refinements" id="refinements" value="<c:out value="${param.refinements }"/>">
  	<input type="hidden" name="p" id="p" value="0">
  	<input type="hidden" name="tab" id="tab" value="${param.tab}">
  	<input type="hidden" name="region" id="region" value="${param.region}">
</form>
  

