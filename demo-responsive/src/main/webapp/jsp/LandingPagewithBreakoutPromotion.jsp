<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
<c:set var="title">My Store</c:set>
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
	
	<!-- Main Navbar -->
	<div class="navbar-cont">
		<div class="container">
			<div class="row">
				<div class="span12">
					<!-- Navbar Search -->
					<%@include file="includes/search.jsp"%>
				</div>
			</div>
			<%@include file="includes/primaryNav.jsp"%>
		</div>
	</div>



<div class="container">
	<div class="row">
		<div class="span12">
			<h3 class="search-results-header">Search Results for ${param.q} <%@include file="includes/didYouMean.jsp"%></h3>
		</div>			
	</div>
	
	<div class="row">
		<div class="span2 sidebar search-sidebar ${fn:length(results.selectedRefinements) == 0 ? 'noRefinements' : ''}">
			<div class="search-sidebar-refined">
				<ul class="unstyled">
					<%@include file="includes/recordUpsellVertical.jsp"%>
                    <%@include file="includes/refinements.jsp"%>
				</ul>
			</div>
            <%@include file="includes/navigation.jsp"%>    
		</div>
	
		<!-- Search Results -->
		<div class="span10 search-results">
			<!-- Text here -->
    	 	<div style="margin-left:100px;" class="banner person">
    			<img src="/images/${results.template.zonesByName['Image Path'].content}" style="width:805px;margin-bottom:10px;">
			</div>
			<div class="pages">
				<div class="row">
					<div class="span3">
						<span class="now-showing">
                         	<%@include file="includes/recordCount.jsp"%>
              			</span>							
					</div>
					<div class="span4">
						<div class="pagination pagination-centered">
							<ul>
								<li><a href="javascript:;" onclick="$('#p').val('${results.pageInfo.recordStart-11}');$('#form').submit()">&lt;</a></li>
							</ul>
							<ul>
								<li><a href="javascript:;" onclick="$('#p').val('${results.pageInfo.recordEnd}');$('#form').submit()">&gt;</a></li>
							</ul>
						</div>
					</div>
					<div class="span3">
						<select class="pull-right">
							<option>Relevancy</option>
							<option>Price - High to Low</option>								
						</select>
					</div>
				</div>
			</div>
    
   		 	<%@include file="includes/compare.jsp"%>
    		<%@include file="includes/results.jsp" %>
    	</div> 
    </div>

<!-- Footer Links -->
	<div class="footer-links">
		<div class="container">
			<div class="row">
				<div class="span3">
					<h5><i class="icon-info"></i>Information</h5>
					<ul>
						<li><a href="#">About Us</a></li>
						<li><a href="#">Delivery Information</a></li>
						<li><a href="#">Privacy Policy</a></li>
						<li><a href="#">Terms &amp; Conditions</a></li>
					</ul>
				</div>
				<div class="span3">
					<h5><i class="icon-comment"></i>Customer Service</h5>
					<ul>
						<li><a href="#">Contact Us</a></li>
						<li><a href="#">Returns</a></li>
						<li><a href="#">Delivery</a></li>
						<li><a href="#">Site Map</a></li>
					</ul>
				</div>
				<div class="span3">
					<h5><i class="icon-unlock-alt"></i>My Account</h5>
					<ul>
						<li><a href="#">My Account</a></li>
						<li><a href="#">Order History</a></li>
						<li><a href="#">Wish List</a></li>
						<li><a href="#">Newsletter</a></li>
					</ul>
				</div>
				<div class="span3 contact">
					<h5><i class="icon-rss"></i>Keep in touch</h5>
					<div class="footer-social"> <a href="#" class="icon-facebook"></a> <a href="#" class="icon-twitter"></a> <a href="#" class="icon-google-plus"></a> <a href="#" class="icon-pinterest"></a> <a href="#" class="icon-linkedin"></a></div>
				</div>
			</div>
		</div>
	</div>

	<!-- Copy -->
	<div class="copy">
		<div class="container">
			<div class="row">
				<div class="span12"> 
					<!-- Cards --> 
					<img src="img/cards.png" alt="Cards" />
					<p class="text-center">Powered by <strong>GroupBy</strong> - &copy; 2013</p>
				</div>
			</div>
		</div>
	</div>


	<!-- to Top -->
	<div id="toTop"><i class="icon-chevron-up icon-white"></i></div>

</body>
</html>

