<div id="sparkline${nav._id}"></div>
<script>
  var values${nav._id} = new Array();
  var names${nav._id} = new Array();
  <c:forEach items="${nav.refinementValues}" var="value" varStatus="i">
  <c:if test="${i.index < 30}">
    if (${value['count']} != 0){
    values${nav._id}.push(${value['count']});
    <c:if test="${nav.isRange}">
    <c:set var="rValue">
    $<fmt:formatNumber pattern="0.00">${value['low']}</fmt:formatNumber>    ${empty value['high'] ? '+' : '-'}    $<fmt:formatNumber pattern="0.00">${value['high']}</fmt:formatNumber>   (${value['count'] })
    </c:set>
    names${nav._id}.push('${rValue}');
    </c:if>
    <c:if test="${!nav.isRange}">
    names${nav._id}.push('<str:capitalize>${fn:toLowerCase(gc:escapeJs(value['value']))}</str:capitalize> (${value['count'] })');
    </c:if>
    }
  </c:if>
  </c:forEach>

  $('#sparkline${nav._id}').sparkline(values${nav._id}, {
      type: 'bar',
      barWidth: '4px',
      barSpacing: '2px',
      barColor: 'green',
      height: '10px',
      tooltipFormatter: function(sparkline, options, fields){
    	  return names${nav._id}[fields[0].offset];
      }
  });
</script>