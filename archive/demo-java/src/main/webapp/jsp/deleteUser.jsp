<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
<c:set var="title">Delete User</c:set>
<%@include file="includes/tagHead.jsp"%>
<body>

<%@include file="includes/form.jsp" %>

<div class="container">



<br>
<div align="center">
<form action="/index.html" method="post">
${error}${empty error ? '' : '<br><br>'}
<label>Delete User</label>
<input autocomplete="off" type="text" class="cursorFocus" name="newEmail" value="${newEmail}">
<button type="submit">Delete</button>
<input type="hidden" name="action" value="deleteUser">
</form>
</div>
</div>
</body>
</html>