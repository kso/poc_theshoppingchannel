<%@include file="includes/tags.jsp"%>

<%--
  Call to search: 
  creates an object call results with 
    records, 
    navigation, 
    refinements, 
    dyms and 
    templates.
 --%>
<c:set var="homepage" value="${empty param.q and empty param.refinements}"/>
<c:if test="${!homepage}">
  <gc:results var="results"
            searchString="${param.q}" 
            refinements="${param.refinements}" 
            fields="*"
            clientKey="e1ad8798-fe8b-450a-96c6-00fc4de5cfb3"
            bridgeHost="localhost"
            bridgePort="9050"
            area="${area}" />
          
  <c:if test="${!empty results.redirect}">
    <c:redirect url="${results.redirect}" />
  </c:if>
  
  <c:if test="${empty results.redirect}">
    <jsp:include page="${empty results.template.name ? 'default' : fn:replace(results.template.name, ' ', '')}.jsp" />
  </c:if>
</c:if>

<c:if test="${homepage}">
  <%@include file="homepage.jsp"%>
</c:if>