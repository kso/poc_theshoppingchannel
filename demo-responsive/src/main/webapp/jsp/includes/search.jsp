<form id="form" action="<c:url value="index.html"/>" accept-charset="UTF-8" class="header-search">
  
            <fieldset>
  <input autocomplete="off" type="text" onkeydown="$('#refinements').val('')" name="q" id="q" class="cursorFocus" value="<c:out value="${param.q}"/>">
              <button><i class="icon-search"></i></button>
            </fieldset>
  
  <input type="hidden" name="refinements" id="refinements" value="<c:out value="${param.refinements }"/>">
  <input type="hidden" name="p" id="p" value="0">
  <input type="hidden" name="tab" id="tab" value="${param.tab}">
  <input type="hidden" name="region" id="region" value="${param.region}">
</form>
  

