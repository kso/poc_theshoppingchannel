<%@include file="jsp/includes/tags.jsp"%>
<%--
  Call to search: 
  creates an object call results with 
    records, 
    navigation, 
    filters, 
    dyms and 
    templates.
 --%>
<gc:results var="results"  
       searchString="${param.q}" 
       clientKey="A3DA692E4F00AAD32D33E" 
       refinements="price:0-20.00" />


<jsp:include page="${results.template.name}.jsp" />

