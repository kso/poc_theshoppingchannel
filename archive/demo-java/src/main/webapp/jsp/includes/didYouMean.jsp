<%@include file="tags.jsp"%>
<c:if test="${fn:length(results.didYouMean) > 0}">
<span class="didYouMean">
  Did you mean: 
  <c:forEach items="${results.didYouMean}" var="didYouMean">
    <a href="javascript:;" onclick="$('#q').val('${gc:escapeJs(didYouMean)}');$('#form').submit()">${didYouMean }</a>?
  </c:forEach>
</span>
</c:if>