<%@include file="includes/tags.jsp"%>
<% session.invalidate(); %>
<% response.sendRedirect("/index.html"); %>