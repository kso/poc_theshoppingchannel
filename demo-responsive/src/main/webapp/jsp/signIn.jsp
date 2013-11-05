<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
<c:set var="title">Sign In</c:set>
<%@include file="includes/tagHead.jsp"%>
<body>
	<!-- Header -->
	<div class="header">
		<div class="container">
			<div class="row"> 
				<%@include file="includes/secondaryNav.jsp"%>
				<!-- Header Cart -->
				<%@include file="includes/cart.jsp" %>
				<!-- Currency -->
				<ul class="nav nav-pills currency">
					<li><a href="#">&euro;</a></li>
					<li><a href="#">$</a></li>
					<li><a href="#">&pound;</a></li>
				</ul>
				<%@include file="includes/signOut.jsp"%>
			</div>
		</div>
	</div>	
	<div class="container">
		<br>
		<div class="row"> 
		<form  accept-charset="utf-8" action="index.html" method="post">
			${error}${empty error ? '' : '<br><br>'}
			<label><b>Email</label>
			<input type="text" class="cursorFocus" name="email" value="${email}">
			<label><b>Password</label>
			<input type="password" name="password" value="${password}">
			<button type="submit" style="margin-bottom:7px">Sign In</button>
			<input type="hidden" name="action" value="signIn">
		</form>
		</div>
	</div>
</body>
</html>