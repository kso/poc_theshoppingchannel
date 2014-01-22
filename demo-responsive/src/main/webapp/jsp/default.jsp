<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
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
						<!-- recordUpsellVertical is for LandingPagewithBreakoutPromotion -->
						<%@include file="includes/recordUpsellVertical.jsp"%>
                        <%@include file="includes/refinements.jsp"%>
					</ul>
				</div>
                <%@include file="includes/navigation.jsp"%>
			</div>

			<!-- Search Results -->
			<div class="span10 search-results">  
				<c:set var="templateName" value="${gc:replaceAll(results.template.name, ' ', '')}" />
				<c:choose>
				<c:when test="${templateName eq 'SlidingHeader'}">
					<div class="banner">
						<div class="custom-text-header">${results.template.zonesByName['Custom Site Text'].content}</div>
				  		<div class="row">
				  			<div class="span10">
				  				<div class="banner-slider">
				  					<ul class="slides">
				  						<c:forEach begin="1" end="4" var="rowNumber">
				  							<%@include file="includes/slidingRow.jsp"%>
				  						</c:forEach>                  
                					</ul>
              					</div>
            				</div>
          				</div>
        			</div>
        		</c:when>
        		<c:when test="${templateName eq 'FamousPersonLandingPage'}">
        			<div class="banner person">
          				<div class="row">
            				<div class="span7">
								<img class="span7" src="<c:url value="${results.template.zonesByName['Picture of famous person'].content}"/>" style="max-width:455px;margin-bottom:10px;">
            				</div>
            				<div class="span3">
								<%@include file="includes/famousSku.jsp"%>
            				</div>
          				</div>
        			</div>    
        		</c:when>
        		<c:when test="${templateName eq 'LandingPagewithBreakoutPromotion'}">
        			<!-- Text here -->
    	 			<div style="margin-left:100px;" class="banner person">
    					<img src="/images/${results.template.zonesByName['Image Path'].content}" style="width:805px;margin-bottom:10px;">
					</div>
				</c:when>
				
				</c:choose>
				
				<div class="pages">
					<div class="row">
						<div class="span3">
							<span class="now-showing"><%@include file="includes/recordCount.jsp"%></span>							
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
				<c:choose>
					<c:when test="${templateName ne 'LowLevelCategoryPage'}">
                		<%@include file="includes/results.jsp"%>
                	</c:when>
                	<c:when test="${templateName eq 'LowLevelCategoryPage'}">
                		<%@include file="includes/resultsGrid.jsp"%>
                	</c:when>
                </c:choose>
			</div><!-- End Search Results -->


		</div><!-- end main row -->
	</div><!-- end main container -->

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