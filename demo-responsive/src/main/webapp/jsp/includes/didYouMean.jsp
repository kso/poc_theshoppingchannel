<%@include file="tags.jsp"%>

<script>
    function generateUrlRedirect(val) {
        self.location = '<c:url value="/"/>' + 'index.html?q='+encodeURIComponent(val);
    }
</script>

<span id="dym">
<c:if test="${fn:length(results.didYouMean) > 0 || fn:length(results.relatedQueries) > 0}">
  Did you mean: 
</c:if>

<c:if test="${fn:length(results.didYouMean) > 0}">
  <c:forEach items="${results.didYouMean}" var="didYouMean">
    <a href="javascript:;" onclick="$('#q').val('${gc:escapeJs(didYouMean)}');$('#form').submit()">${didYouMean }</a>?
  </c:forEach>
</c:if>

<c:if test="${fn:length(results.relatedQueries) > 0}">
  <c:forEach items="${results.relatedQueries}" var="relatedQuery">
    <a href="javascript:;" onclick="generateUrlRedirect('${gc:escapeJs(relatedQuery)}');">${relatedQuery}</a>?
  </c:forEach>
</c:if>
</span>