<%@include file="tags.jsp"%>


<c:set var="elements" value="0"/>
<c:set var="select">
<c:set var="max" value="5"/>


<ul class="unstyled">

<c:forEach items="${nav.refinementValues}" var="value" varStatus="iC">
  <c:set var="shouldShow">
  ${!fn:startsWith(value['value'], '&')}
  </c:set>
  <c:if test="${shouldShow}">
  <c:if test="${iC.index < max}">
    <c:if test="${value['count'] > 0}">
      <c:set var="elements" value="${elements + 1}"/>
      <li><a href="javascript:;" onclick="$('#refinements').val($('#refinements').val() + '~' + &quot;${nav['name']}=${value['value']}&quot;);$('#form').submit()">
      <str:truncateNicely upper="20"><str:capitalizeAllWords>${fn:toLowerCase(value['value'])}</str:capitalizeAllWords></str:truncateNicely>
      <span class="count">(${value['count'] })</span> 
      </a></li>
    </c:if>   
  </c:if>
  <c:if test="${iC.index >= max}">
    <c:if test="${value['count'] > 0}">
      <c:set var="elements" value="${elements + 1}"/>
        <li><a style="display:none" class="hide${gc:md5(nav.name)}" href="javascript:;" onclick="$('#refinements').val($('#refinements').val() + '~' + &quot;${nav['name']}=${value['value']}&quot;);$('#form').submit()">
        <str:truncateNicely upper="20"><str:capitalizeAllWords>${fn:toLowerCase(value['value'])}</str:capitalizeAllWords></str:truncateNicely>
        <span class="count">(${value['count'] })</span> 
        </a></li>
    </c:if>   
  </c:if>
  </c:if>
</c:forEach>


  <c:if test="${fn:length(nav.refinementValues) >= max}">
    <li><a href="javascript:;" onclick="$('div', $(this)).toggle();$('.hide${gc:md5(nav.name)}').toggle()"><div>more...</div><div style="display:none">less...</div></a></li>
  </c:if>

</ul>

</c:set>


<c:if test="${elements > 1}">
${select}
</c:if>