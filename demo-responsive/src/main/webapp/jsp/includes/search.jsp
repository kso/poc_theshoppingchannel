<script>
function removeTab()
{
	document.getElementById("tab").remove();
	document.getElementById("q").remove();
	document.getElementById("q1").name='q';
}
</script>

<form id="form" name="form" action="<c:url value="index.html"/>" accept-charset="UTF-8" class="header-search" onKeyDown="removeTab()">
<fieldset>
	 <% if(request.getParameter("tab") == null) { %>
		<input autocomplete="off" type="text" onkeydown="$('#refinements').val('')" name="q" id="q" class="cursorFocus" value="<c:out value="${param.q}"/>">
     <% } else { %>
     	<input autocomplete="off" type="text" onkeydown="$('#refinements').val('')" name="q1" id="q1" class="cursorFocus" value="<c:out value="${param.q1}"/>">
     	<input type="hidden" name="q" id="q" value="<c:out value="${param.q}"/>">
     <% } %>
     <button><i class="icon-search"></i></button>
</fieldset>
  <input type="hidden" name="refinements" id="refinements" value="<c:out value="${param.refinements }"/>">
  <input type="hidden" name="p" id="p" value="0">
  <% if(request.getParameter("tab") != null) { %>
  		<input type="hidden" name="tab" id="tab" value="${param.tab}">
  <% } %>
  
  <input type="hidden" name="region" id="region" value="${param.region}">
</form>

