<%@include file="tags.jsp"%>
<span id="dym">
<c:if test="${fn:length(results.didYouMean) > 0}">
  Did you mean: 
  <c:forEach items="${results.didYouMean}" var="didYouMean">
    <a href="javascript:;" onclick="$('#q').val('${gc:escapeJs(didYouMean)}');$('#form').submit()">${didYouMean }</a>?
  </c:forEach>
</c:if>
</span>