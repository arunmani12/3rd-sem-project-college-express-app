
  $('.btn-sider').click(function(){
    $(this).toggleClass("click");
    $('.sidebar').toggleClass("show-2");
  });
    // $('.feat-btn').click(function(){
    //   $('nav ul .feat-show').toggleClass("show");
    //   $('nav ul .first').toggleClass("rotate");
    // });
    // $('.serv-btn').click(function(){
    //   $('nav ul .serv-show').toggleClass("show-33");
    //   $('nav ul .second').toggleClass("rotate");
    // });
    $('.sidebar ul li').click(function(){
      $(this).addClass("active").siblings().removeClass("active");
    });

    // let maap = document.getElementById('map')
    // let btn = document.getElementsByClassName('btn-sider')[0];
    // let count = 1
    // btn.addEventListener("click",function(){
    //     count+=1;
    //     if(count%2==0){
    //       maap.style.width='10%'
    //     }
    //     else{
    //       maap.style.width='100%'
    //     }
    // })


    let drop = document.getElementsByClassName('feat-show')[0];
    let dr2=document.getElementsByClassName('feat-btn')[0];
    let c2=1;
    dr2.addEventListener('click',()=>{
      c2+=1;
      if(c2%2==0){
      drop.style.display='block';
      }
      else
      {
        drop.style.display='none';
      }
    })
 
  $('form').on('submit',(e)=>{
       e.preventDefault();
       const email = $('#Email').val()
       const subject = $('#subject').val()
       const text = $('#text').val()


       const data = {
         email,
         subject,
         text
       }

       $.post('/about',data,()=>{
         console.log('form successfully sended')
         $( "#dialog" ).dialog(
           {
             width:400,
           }
         );
       });

      //  $('.icon').click(function(){
      //  $('span').toggleClass("cancel");
      // $( function() {
      // $( "#dialog" ).dialog();
      //  } );
     
  });
 

  const em = document.getElementById('Email')
  const su = document.getElementById('subject')
  const tx = document.getElementById('text')
  const form = document.querySelector('form')
  form.addEventListener('submit',()=>{
    em.value='';
    su.value='';
    tx.value='';
  })

 
  $('.icon').click(function(){
    $('span').toggleClass("cancel");
  });

 


// mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bm1hbmkiLCJhIjoiY2tqbzZhb3R3MDZlMjJzbzVkeG1zYzZueSJ9.mZFqpmFOtpXoBVFJUqSLeg';
// mapboxgl.accessToken ='<%=process.env.ACCESS_TOKEN%>'
// var map = new mapboxgl.Map({
// container: 'map',
// style: 'mapbox://styles/mapbox/streets-v11',
// center:[79.366904,10.776433],
// zoom:11
// });
// var marker = new mapboxgl.Marker()
// .setLngLat([79.366904,10.776433])
// .addTo(map);


$(document).ready(function() {
	
	// Change image on selection
	$("#gallery img").click(function() {
		// Get current image source
		var image = $(this).attr("src");
		// Apply grayscale to thumbnails except selected
		$("#gallery")
			.find("img")
			.css("filter", "grayscale(1)");
		$(this).css("filter", "none");
		// Change image
		$("#gallery-img").css("background-image", "url(" + image + ")");
		// Apply link to image
		$("#gallery-link").attr("href", image);
		// Use id for count
		$("#count").text($(this).attr("id"));
	});
	
	// Get total number of images
	var gallerySize = $(".gallery-thumbnails img").length;
	$("#total").text(gallerySize);
	
	var display = $("#imgDisplay");
	var scroll = $("#imgScroll");
	var scale = $("#imgScale");
	
	// Image display
	display.change( function() {
		if(display.val() === "contain") {
			$("#gallery-img").css("background-size","contain");
		} else {
			$("#gallery-img").css("background-size","cover");
		}
	});
	
	// Scroll
	scroll.change( function() {
		if(scroll.val() === "yes") {
			$("#gallery-box").css("overflow","scroll");
		} else {
			$("#gallery-box").css("overflow","hidden");
		}
	});
	
	// Scale
	var changeScale = scale.change( function() {
		$("#gallery-img").css("background-size", scale.val() + "px");
	});

});




