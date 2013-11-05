<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
<c:set var="title">My Store</c:set>
<%@include file="includes/tagHead.jsp"%>
<body>

<%@include file="includes/form.jsp" %>
<div class="container">

<div class="controls">
  <h1>Search results for ${param.q } <%@include file="includes/didYouMean.jsp" %> </h1>
  <%@include file="includes/refinements.jsp" %>
  
</div>

<div class="results">

  <div class="navigation">
    <%@include file="includes/navigation.jsp" %>
  </div>
 

    <div style="margin-left:170px;">
    <table width="100%"><tr>
    <td>
    <img src="<c:url value="${results.template.zonesByName['Picture of famous person'].content}"/>" style="max-width:455px;margin-bottom:10px;">
    </td>
    <td align="right" valign="top">
    <%@include file="includes/famousSku.jsp"%>
    </td></tr></table>
    </div>
    <%@include file="includes/pagingAndSort.jsp" %>
    
    <%@include file="includes/resultsList.jsp" %>
  
</div> 

</div>
<%@include file="includes/ga.jsp"%>
</body>
</html>

