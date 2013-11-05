<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
<c:set var="title">My Store</c:set>
<%@include file="includes/tagHead.jsp"%>
<body>

<%@include file="includes/form.jsp" %>
<div class="container">
<div class="controls">
  <h1>Search for ${param.q } <%@include file="includes/didYouMean.jsp" %> <%@include file="includes/refinements.jsp" %> </h1>
</div>
<div class="results">

  <div class="navigation">
    <%@include file="includes/navigation.jsp" %>
  </div>
 
    <%@include file="includes/pagingAndSort.jsp" %>
    <%@include file="includes/resultsList.jsp" %>
  
</div> 

</div>
<%@include file="includes/ga.jsp"%>
</body>
</html>

