<%@include file="tags.jsp"%>
<c:set var="showBrand" value="${fn:length(results.availableNavigationByName['department'].refinementValues) == 1}"/>

<c:set var="elements" value="0"/>
<c:set var="select">

<%@include file="navSparkline.jsp"%>
<select onchange="$('#refinements').val($('#refinements').val() + '~' + $(this).val());$('#form').submit();">
<option disabled="disabled" selected="selected">${nav['displayName'] }</option>
<c:forEach items="${nav.refinementValues}" var="value">
  <c:if test="${value['count'] > 0}">
    <c:set var="elements" value="${elements + 1}"/>
    <option value="<c:out value="${nav['name']}=${value['value']}"/>">
    <str:truncateNicely upper="20"><str:capitalizeAllWords>${fn:toLowerCase(value['value'])}</str:capitalizeAllWords></str:truncateNicely> (${value['count'] }) 
    </option>
  </c:if>
</c:forEach>
</select>
</c:set>

<c:if test="${elements > 1}">
${select}
</c:if>