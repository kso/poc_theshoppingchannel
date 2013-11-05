<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
<c:set var="title">New User</c:set>
<%@include file="includes/tagHead.jsp"%>
<body>

<%@include file="includes/form.jsp" %>

<div class="container">

<br>
<div align="center">
<form action="/index.html" method="post">
${error}${empty error ? '' : '<br><br>'}
<label>New Email</label>
<input autocomplete="off" type="text" class="cursorFocus" name="newEmail" value="${newEmail}">
<label>New Password</label>
<input autocomplete="off" type="password" name="newPassword" value="${newPassword}">
<button type="submit">Create</button>
<input type="hidden" name="action" value="createNewUser">
</form>
</div>
</div>
</body>
</html>