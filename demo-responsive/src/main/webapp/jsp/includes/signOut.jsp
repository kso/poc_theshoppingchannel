<!-- Header Login -->
<p class="log-reg">
<a href="javascript:;" class="${empty param.region or param.region eq 'region1' ? 'regionSelected' : ''}" onclick="$('#region').val('region1');$('#form').submit()">Region 1</a>
<a href="javascript:;" class="${param.region eq 'region2' ? 'regionSelected' : ''}" onclick="$('#region').val('region2');$('#form').submit()">Region 2</a>
<a href="javascript:;" class="${param.region eq 'region3' ? 'regionSelected' : ''}" onclick="$('#region').val('region3');$('#form').submit()">Region 3</a>
<form  action="index.html" method="post" style="margin-bottom:0;">
	<input type="hidden" name="action" value="signOut">
	<p class="log-reg signOut"><a href="" onclick="document.forms[0].submit();return false;">Sign Out</a>
</form>
<div class="clearfix"></div>
 
