<%@include file="tags.jsp"%>
<c:if test="${fn:length(results.selectedRefinements) > 0}">
<div class="search-sidebar-refined">
  <ul class="unstyled">
  <script>
  	function uncheckrefinement(){
  		$('#refinements').val('');
  		$('#refinementsDiv input[type=checkbox]:checked').each(function(){
  			$('#refinements').val($('#refinements').val() + "~" + $(this).attr('value'));
  		});
  		$('#form').submit();
  	}
  </script>
  <div id="refinementsDiv">
  <li class="title">Refined By:</li>
  <c:forEach items="${results.selectedRefinements }" var="refinement">
    <c:set var="refinement" value="${refinement }" scope="request"/>
    <c:set var="jspInclude">refinementCheckbox<str:capitalize>${refinement.range ? 'range' : '' }</str:capitalize>.jsp</c:set>
    <jsp:include page="includes/${jspInclude}"/>
  </c:forEach>
  </div>
          </ul>
        </div>
</c:if>