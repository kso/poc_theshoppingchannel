<%@include file="tags.jsp"%>
<c:if test="${fn:length(results.selectedRefinements) > 0}">
  <script>
  	function uncheckrefinement(){
  		$('#refinements').val('');
  		$('#refinementsDiv input[type=checkbox]:checked').each(function(){
  			$('#refinements').val($('#refinements').val() + "~" + $(this).attr('value'));
  		});
  		$('#form').submit();
  	}
  </script>
  <span id="refinementsDiv">
  Refined by:
  <c:forEach items="${results.selectedRefinements }" var="refinement">
    <c:set var="refinement" value="${refinement }" scope="request"/>
    <c:set var="jspInclude">refinementCheckbox<str:capitalize>${refinement.isRange ? 'range' : '' }</str:capitalize>.jsp</c:set>
    <jsp:include page="includes/${jspInclude}"/>
  </c:forEach>  
  </span>
</c:if>