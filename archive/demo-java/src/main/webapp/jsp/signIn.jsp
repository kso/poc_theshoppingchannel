<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
<c:set var="title">Sign In</c:set>
<%@include file="includes/tagHead.jsp"%>
<body>

<%@include file="includes/form.jsp" %>

<div class="container">



<br>
<div align="center">
<form  accept-charset="utf-8" action="/index.html" method="post">
${error}${empty error ? '' : '<br><br>'}
<label>Email</label>
<input type="text" class="cursorFocus" name="email" value="${email}">
<label>Password</label>
<input type="password" name="password" value="${password}">
<button type="submit">Sign In</button>
<input type="hidden" name="action" value="signIn">
</form>
</div>
</div>
</body>
</html>