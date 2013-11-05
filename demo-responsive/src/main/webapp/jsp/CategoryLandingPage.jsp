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
		
	<div class="hero">
		<div class="container">
			<div class="row">
				<div class="span9"> 
					<img src="<c:url value="/img/PM1_iphone.jpg"/>" alt="Placeholder Image" />
				</div>
				<div class="span3 callout">
					<div class="row first">
						<div class="span3">
							<h4 class="alert">Online Only</h4>
							<a href="#">
								<img src="<c:url value="/img/promo1.png"/>" alt="Placeholder Image" />
							</a> 
						</div>
					</div>
					<div class="row">
						<div class="span3">
							<h4>Save $100</h4>
							<a href="#">
								<img src="<c:url value="/img/promo2.png"/>" alt="Placeholder Image" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<div class="products-list recommendation">
		<div class="container">
			<h3><span>Special</span> Promotions</h3>
			<div class="row">
				<div class="span6">
					<div class="banner-small">
						<a href="#"><img src="<c:url value="/img/special1.png"/>" alt="Placeholder Image" /></a>
					</div>
				</div>
				<div class="span6">
					<div class="banner-small">
						<a href="#"><img src="<c:url value="/img/special2.png"/>" alt="Placeholder Image" /></a>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="span9">
					<ul class="thumbnails">
						<!-- Products Single Box -->
						<li class="span3">
							<div class="thumbnail"><a href="#" class="thumb"><img src="<c:url value="/img/blackIphone.jpg"/>" alt="Product" /></a>
								<p><a href="#">iPhone 5 16GB Black</a></p>
								<p class="price">&euro; 574</p>
								<p class="rating"><i class="icon-star"><span>1</span></i><i class="icon-star"><span>2</span></i><i class="icon-star"><span>3</span></i><i class="icon-star-half-empty"><span>4</span></i><i class="icon-star-empty"><span>5</span></i></p>
								<input type="button" value="Add to Cart" class="btn" />
								<span class="new">New</span>
							</div>
						</li>

							<!-- Products Single Box -->
						<li class="span3">
							<div class="thumbnail"><a href="#" class="thumb"><img src="<c:url value="/img/whiteIpad.jpg"/>" alt="Product" /></a>
								<p><a href="#">iPad 2 16GB White</a></p>
								<p class="price">&euro; 308</p>
								<p class="rating"><i class="icon-star"><span>1</span></i><i class="icon-star"><span>2</span></i><i class="icon-star"><span>3</span></i><i class="icon-star"><span>4</span></i><i class="icon-star-empty"><span>5</span></i></p>
								<input type="button" value="Add to Cart" class="btn" />
								
							</div>
						</li>

						<!-- Products Single Box -->
						<li class="span3">
							<div class="thumbnail"><a href="#" class="thumb"><img src="<c:url value="/img/whiteIphone.jpg"/>" alt="Product" /></a>
								<p><a href="#">iPhone 5 16GB White</a></p>
								<p class="price"><span>&euro; 1.230</span> &euro; 880</p>
								<p class="rating"><i class="icon-star"><span>1</span></i><i class="icon-star"><span>2</span></i><i class="icon-star"><span>3</span></i><i class="icon-star"><span>4</span></i><i class="icon-star-empty"><span>5</span></i></p>
								<input type="button" value="Add to Cart" class="btn" />
								<span class="sale">Sale</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="span3 callout">
					<img src="<c:url value="/img/deal.png"/>" alt="Recommendation" />
				</div>
			</div>
		</div>
	</div>



	<!-- Brands List -->
	<div class="featured-brands">
		<div class="container">
			<h3><span>Featured</span> Brands</h3>
			<div class="brands">
				<ul class="thumbnails">
					<li class="span2"><a href="#"><img src="brands/samsung.png" alt="Logo" class="thumbnail" /></a></li>
					<li class="span2"><a href="#"><img src="brands/apple.png" alt="Logo" class="thumbnail" /></a></li>
					<li class="span2"><a href="#"><img src="brands/canon.png" alt="Logo" class="thumbnail" /></a></li>
					<li class="span2"><a href="#"><img src="brands/hp.png" alt="Logo" class="thumbnail" /></a></li>
					<li class="span2"><a href="#"><img src="brands/microsoft.png" alt="Logo" class="thumbnail" /></a></li>
					<li class="span2"><a href="#"><img src="brands/sony.png" alt="Logo" class="thumbnail" /></a></li>
				</ul>
			</div>
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