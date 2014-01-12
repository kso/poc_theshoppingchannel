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
                        <%@include file="includes/refinements.jsp"%>
					</ul>
				</div>



                <%@include file="includes/navigation.jsp"%>
                

			</div>

			<!-- Search Results -->
			<div class="span10 search-results">
      
      
      
      
      <div class="banner">
                  <div id="bqLoading">
                  <img src="<c:url value="/img/loading.gif"/>">
                  Querying Big Query
                  </div>
          <div class="row" id="bqSlidingBanner" style="display:none">
            <div class="span10">
              <div class="banner-slider">
                <ul class="slides">
                    
                    

                    <li data-thumb="<c:url value="/img/empty.png"/>">
                      <h3>Big Query Suggests People in your region liked these PS3 Games</h3>
                      
                      <div class="row">
  
  

	<c:if test="${param.region eq 'region2' }">
	    <div class="span2 offset1">
	      <center><img src="http://images.bestbuy.com/BestBuy_US/images/products/6820/6820583_rc.jpg" alt="Placeholder" style="height:100px"></center>
	      <h5><a href="#">Uncharted</a></h5>
	    </div>
	    <div class="span2 ">
	      <center><img src="http://images.bestbuy.com/BestBuy_US/images/products/9554/9554225.jpg" alt="Placeholder" style="height:100px"></center>
	      <h5><a href="#">Fallout</a></h5>
	    </div>
	    <div class="span2 ">
	      <center><img src="http://images.bestbuy.com/BestBuy_US/images/products/5273/5273838.jpg" alt="Placeholder" style="height:100px"></center>
	      <h5><a href="#">Far Cry 3</a></h5>
	    </div>
	    <div class="span2 ">
	      <center><img src="http://images.bestbuy.com/BestBuy_US/images/products/7556/7556059.jpg" alt="Placeholder" style="height:100px"></center>
	      <h5><a href="#">Dead Space</a></h5>
    </div>
	</c:if>
	<c:if test="${param.region eq 'region3' }">
	    <div class="span2 offset1">
	      <center><img src="http://images.bestbuy.com/BestBuy_US/images/products/1814/1814409.jpg" alt="Placeholder" style="height:100px"></center>
	      <h5><a href="#">LEGO Pirates of the Caribbean</a></h5>
	    </div>
	    <div class="span2 ">
	      <center><img src="http://images.bestbuy.com/BestBuy_US/images/products/9467/9467873.jpg" alt="Placeholder" style="height:100px"></center>
	      <h5><a href="#">LittleBigPlanet</a></h5>
	    </div>
	    <div class="span2 ">
	      <center><img src="http://images.bestbuy.com/BestBuy_US/images/products/3654/3654379.jpg" alt="Placeholder" style="height:100px"></center>
	      <h5><a href="#">The Adventures of Tintin</a></h5>
	    </div>
	    <div class="span2 ">
	      <center><img src="http://images.bestbuy.com/BestBuy_US/images/products/5620/5620011.jpg" alt="Placeholder" style="height:100px"></center>
	      <h5><a href="#">NASCAR The Game</a></h5>
    </div>
	</c:if>  

    
  </div>
                      
                    </li>
                    
                </ul>
              </div>
            </div>
          </div>
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

                <%@include file="includes/results.jsp"%>				

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
<script>


self.setTimeout( function(){
	$('#bqLoading').hide();
	$('#bqSlidingBanner').fadeIn(2000);
}, 100);

</script>
</html>