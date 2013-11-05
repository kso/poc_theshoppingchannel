<%@include file="includes/tags.jsp"%>
<!DOCTYPE html>
<html>
<%@include file="includes/tagHead.jsp"%>

	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places" type="text/javascript"></script>
	<script type="text/javascript">		
		var map;
		var my_lat_lang = new google.maps.LatLng(43.6481, -79.4042);
		var bounds = new google.maps.LatLngBounds();
		function initialize() 
		{
			var mapOptions = {
				zoom: 13,
				center: my_lat_lang,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};


			map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			
			var input = /** @type {HTMLInputElement} */(document.getElementById('q'));
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo('bounds', map);
  
			<c:forEach items="${results.records}" var="record" varStatus="status">
            <c:set var="m" value="${record.allMeta}"/>
            var text = 		'<div class="map-tooltip">'+
	    	'<h4><c:out value="${m['name']}"/></h4>' +
	    	'<ul class="unstyled address">' +
	    		'<li><c:out value="${m['address']}"/></li>' +
	    		'<li><c:out value="${m['city']}"/>, <c:out value="${m['region']}"/> ${m['postalCode']}</li>' +
	    		'<li class="phone"><strong>Phone:</strong> ${m['phone']}</li>' +
	    	'</ul>' +
	    	'<table><tr><td width="70" valign="top">' + 
	    	'<ul class="unstyled hours">' +
    		'<li><strong>Mon:</strong> ${m['mon']}</li>' +
    		'<li><strong>Tue:</strong> ${m['tue']}</li>' +
    		'<li><strong>Wed:</strong> ${m['wed']}</li>' +
    		'<li><strong>Thu:</strong> ${m['thu']}</li>' +
    		'<li><strong>Fri:</strong> ${m['fri']}</li>' +
    		'<li><strong>Sat:</strong> ${m['sat']}</li>' +
    		'<li><strong>Sun:</strong> ${m['sun']}</li>' +
	    	'</ul>' + 
	    	'</td><td width="200" valign="top"><ul>'+ 
	    	<c:forEach items="${m['serviceList']}" var="speciality">
	    	'<li><c:out value="${speciality}"/></li>'+ 
	    	</c:forEach>
	    	'</ul></td></tr></table>'+
	    '</div>';
			createMarker(bounds, map, new google.maps.LatLng(${m['lat']}, ${m['lng']}), text);
			</c:forEach>

			map.fitBounds(bounds);

		}


		function createMarker(pBounds, pMap, pPosition, pText){
		

		    bounds.extend(pPosition);

			var infowindow = new google.maps.InfoWindow({
			    content: pText
			});		

			var marker = new google.maps.Marker({
		    	position: pPosition,
		    	title: ''
			});
			marker.setMap(pMap);
			
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	</script>


<script type="text/javascript"> 
  var states = new Array();
  
  <c:forEach items="${results.availableNavigation}" var="nav">
  	<c:if test="${nav.name eq 'region'}">
  		<c:forEach items="${nav.refinementValues}" var="ref">
	    	states.push('${ref.value}');
	    </c:forEach>
  	</c:if>
  </c:forEach>
  var geocoder = new google.maps.Geocoder();
  if (navigator.geolocation && ${fn:length(results.selectedRefinements) == 0}) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
  }
  
  //Get the latitude and the longitude;
  function successFunction(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      codeLatLng(lat, lng)
  }
  

  function errorFunction(){
  }


  function codeLatLng(lat, lng) {

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
         //formatted address
         //(results[0].formatted_address)
        //find country name
             for (var i=0; i<results[0].address_components.length; i++) {
            for (var b=0;b<results[0].address_components[i].types.length;b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                    //this is the object you are looking for
                    city= results[0].address_components[i];
                    break;
                }
            }
        }
        //city data
		if (states.indexOf(city.short_name) > -1){
			$('#refinements').val('region=' + city.short_name);
			$('#form').submit()
			
		}
		
        } else {

        }
      } else {
      }
    });
  }
</script> 
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
	
	<div class="container map-container">
		<div class="row"> 
			<!-- Contact Page-->
			<div class="span12"> 
				<h1 class="margin-bottom">Store <span>Locator</span></h1>
			</div>
		</div>

		<div class="row"> 


			<div class="span3">
					<div class="control-group">
						
						
            
                      
                        <%@include file="includes/refinements.jsp"%>



                <c:set var="hide" value=",mon,tue,wed,thu,fri,sat,sun,day," />
                <c:if test="${fn:length(results.selectedRefinements) == 0}">
                <c:set var="hide" value=",mon,tue,wed,thu,fri,sat,sun,city,day," />
                </c:if>
                <%@include file="includes/navigation.jsp"%>
						

					</div>

				<div class="map-form-results">
					<ul class="unstyled">
                        <c:forEach items="${results.records}" var="record" varStatus="status">
                        <c:set var="m" value="${record.allMeta}"/>
						<li class="clearfix">
							<div class="num">${status.count}</div>
							<div class="info">
								<strong>${m['name']}</strong><br>
                                ${m['address']}<br>
								${m['city']}, ${m['region']} ${m['postalCode']}<br>
								<strong>Phone:</strong> ${m['phone']}
							</div>							
						</li>
                        </c:forEach>
					</ul>					
				</div>

			</div>
			<!-- Contact Map -->
			<div class="span9 margin-bottom">
				<div id="map-canvas" style="width: 100%; height: 500px;"></div>
			</div>
		</div><!-- end row -->
	</div><!-- end container -->

	<br>

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