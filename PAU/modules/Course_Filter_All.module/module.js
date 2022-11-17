
// function leverJobsInit() {

//   /**
//   * Variables
//   ****************************/

//   // Location
//   var pageUrl = window.location.href;

//   var pageSize = 10;
//   var lastPage;

//   // Find last segment of URL
//   var pathArray = pageUrl.split( '/' );
//   var lastSegment = pathArray[pathArray.length-2];

//   // Set 'team' variable for Lever URL
//   function getLeverTeam (pageSlug) {
//     var pageTeamMap = {
//       'advertising': 'advertising',
//       'client-services': 'Client Success&team=Services',
//       'finance': 'finance',
//       'information-technology': 'it',
//       'legal': 'legal',
//       'marketing': 'marketing',
//       'people-and-talent': 'people and talent',
//       'sales': 'sales',
//       'research-and-development': 'engineering',
//       'default': ''
//     };
//     return (pageTeamMap[pageSlug] || pageTeamMap['default']);
//   }
//   var leverTeam = getLeverTeam(lastSegment);
//   // Checking for potential Lever source or origin parameters
//   var leverParameter = '';
//   var trackingPrefix = '?lever-';

//   // Selectors
//   var $jobsLocation = $('.jobs-sort .jobs-locations');
//   var $jobsTeam = $('.jobs-sort .jobs-teams');
//   var $jobsSort = $('#jobs-container .jobs-sort');
//   var $jobsListContainer = $('#jobs-container .jobs-list');
//   var $noJobResult = $('#jobs-container .jobs-list .no-job-result');
//   var $job = $('#jobs-container .jobs-list .job');

//   if( pageUrl.indexOf(trackingPrefix) >= 0){
//     // Found Lever parameter
//     var pageUrlSplit = pageUrl.split(trackingPrefix);
//     leverParameter = '?lever-'+pageUrlSplit[1];
//   }

//   /**
//   * Functions
//   ****************************/

//   // Functions for checking if the variable is unspecified
//   function cleanString(string) {
//     if (string) {
//       var cleanString = string.replace(/\s+/ig, "");
//       return cleanString;
//     }
//     else {
//       return "Uncategorized";
//     }
//   }

//   function nullCheck(string) {
//     if (!string) {
//       return 'Uncategorized';
//     }
//     else {
//       return string;
//     }
//   }

//   function renderJobs(_data) {
//     // Adding individual job postings
//     console.log('renderJobs', _data);
//     if (!_data.length){
//       $jobsListContainer.html('<p class="no-job-result bg-info">No positions available.</p>');
//     } else {
//       var jobsList = [];
//       for(i = 0; i < _data.length; i++) {
//         var posting = _data[i]
//         var title = posting.text
//         var location = nullCheck(posting.categories.location);
//         var locationCleanString = cleanString(location);
//         var commitment = nullCheck(posting.categories.commitment);
//         var commitmentCleanString = cleanString(commitment);
//         var team = nullCheck(posting.categories.team);
//         var teamCleanString = cleanString(team);
//         var link = posting.hostedUrl+leverParameter;
//         var jobPosting = '<a class="job '+teamCleanString+' '+locationCleanString+' '+commitmentCleanString+'" data-location="'+locationCleanString+'" data-team="'+teamCleanString+'" href="'+ link +'"><span class="job-title">'+title+'</span><span class="tag">'+team+'</span><span class="tag">'+location+'</span></a>'
//         jobsList.push(jobPosting);
//       }
//       $jobsListContainer.html(jobsList.join(''));
//     }
//   } // END createJobs

//   function renderFilters(_data) {
//     console.log('renderFilters');
//     // Adding Team values to Team Sort select drop-downs
//     var teams = [];
//     for(i = 0; i < _data.length; i++) {
//       var team = nullCheck(_data[i].categories.team);
//       var teamCleanString = cleanString(team);
//       var teamOption = '<option class="job-team '+teamCleanString+'">'+team+'</option>';
//       // Check for duplicates
//       if (teams.indexOf(teamOption) === -1) {
//         teams.push(teamOption);
//       }
//       teams.sort();
//     }
//     $jobsTeam.append(teams.join(''));

//     // Adding Location values to Location Sort select drop-downs
//     var locations = [];
//     for(i = 0; i < _data.length; i++) {
//       var location = nullCheck(_data[i].categories.location)
//       var locationCleanString = cleanString(location);
//       var locationOption = '<option class="job-location '+locationCleanString+'">'+location+'</option>';
//       // Check for duplicates
//       if (locations.indexOf(locationOption) === -1) {
//         locations.push(locationOption);
//       }
//       locations.sort();
//     }
//     $jobsLocation.append(locations.join(''))};

//   function fetchData(options, callback) {
//     console.log('fetchData');
//     var leverUrl = 'https://api.lever.co/v0/postings/bazaarvoice?mode=json';
//     if (options.page) {
//       leverUrl += '&limit=' + pageSize + '&skip=' + ((options.page - 1) * pageSize);
//       if (!options.noCheckPagination) {
//         lastPage = options.page;
//       }
//     }
//     if (options.team) {
//       leverUrl += '&team=' + options.team;
//     }
//     if (options.location) {
//       leverUrl += '&location=' + options.location;
//     }
//     $.ajax({
//       dataType: "json",
//       url: leverUrl,
//       success: function(data){
//         if (!options.noCheckPagination && options.page) {
//           checkPagination(options);
//         }
//         callback(data);
//       } ,
//       error: function() {
//         $jobsListContainer.html('<p class="no-job-result bg-info">Content is not available.</p>');
//       }
//     });
//   }

//   function checkPagination(options) {
//     console.log('checkPagination');
//     // Prev needs to be disabled on page 1.
//     $('.jobs-pagination .prev').attr("disabled", lastPage <= 1);
//     options.noCheckPagination = true;
//     options.page += 1;
//     fetchData(options, function(data) {
//       if(!data.length) {
//         $('.jobs-pagination .next').attr("disabled", true);
//       } else {
//         $('.jobs-pagination .next').attr("disabled", false);
//       }
//     });
//   }

//   // Handlers for pagination buttons
//   function prevButton () {
//     console.log('prevButton');
//     if (!$(this).attr('disabled') && lastPage > 1) {
//       getLeverTeam(lastSegment);
//       if (leverTeam == '') {
//         var teamValue = $jobsTeam.val();
//       } else {
//         var teamValue = leverTeam;
//       }  
//       var locationValue = $jobsLocation.val();
//       if (teamValue == "All") {
//         teamValue = null;
//       }
//       if (locationValue == "All") {
//         locationValue = null;
//       }
//       $('html, body').animate({
//           scrollTop: $("#jobs-container").offset().top - 150
//       }, 500);
//       fetchData({team:teamValue, location: locationValue, page: lastPage -= 1 }, function(data){
//         renderJobs(data);
//       });
//     }
//   }

//   function nextButton () {
//     console.log('nextButton');
//     if (!$(this).attr('disabled')) {
//       getLeverTeam(lastSegment);
//       if (leverTeam == '') {
//         var teamValue = $jobsTeam.val();
//       } else {
//         var teamValue = leverTeam;
//       }  
//       var locationValue = $jobsLocation.val();
//       if (teamValue == "All") {
//         teamValue = null;
//       }
//       if (locationValue == "All") {
//         locationValue = null;
//       }
//       $('html, body').animate({
//           scrollTop: $("#jobs-container").offset().top - 150
//       }, 500);
//       fetchData({team:teamValue, location: locationValue, page: lastPage += 1 }, function(data){
//         renderJobs(data);
//       });
//     }
//   }

//   // === Sorting/Filters job postings triggered from select drop downs (team & location)
//   function filterJobs() {
//     console.log('filterJobs');
//     var teamValue = $jobsTeam.val();
//     var locationValue = $jobsLocation.val();
//     page = 1;
//     if (teamValue == "All") {
//       teamValue = null;
//     }
//     if (locationValue == "All") {
//       locationValue = null;
//     }
//     fetchData({team:teamValue, location: locationValue, page: 1}, function(data){
//       renderJobs(data);
//     });
//   }

//   // Event Handlers (for pagination btns and drop-down filters)
//   $('.jobs-pagination .prev').click(prevButton);
//   $('.jobs-pagination .next').click(nextButton);
//   $('.jobs-sort select').change(filterJobs);

//   // Init render filters
//   fetchData({}, function(data){
//     renderFilters(data);
//   });

//   // Init render jobs
//   fetchData({page: 1, team: leverTeam}, function(data){
//     renderJobs(data);
//   });

// } // END leverJobsInit

// $(function() {
//   leverJobsInit();
// });


// $('.ui-group h3').click(function(e){
//     e.stopPropagation();
//     $(this).parent().siblings().children('h3').next().slideUp();
//     $(this).parent().siblings().removeClass('active');
//     $(this).parent().toggleClass('active')
//     $(this).next().slideToggle();
// })




// // $('#mySelect2').select2({
// //   selectOnClose: true
// // });





// // // store filter for each group
// // var filters = {};
// // var qsRegex;
// // // init Isotope
// // var $grid = $('.grid').isotope({
// //     itemSelector: '.course-item',
// //     layoutMode: 'fitRows',
// //     getSortData: {
// //       name: '.name',
// //       symbol: '.symbol',
// //       number: '.number'
// //     },
// //     filter: function() {
// //         return qsRegex ? $(this).text().match( qsRegex ) : true;
// //     }
// // });

// // var $quicksearch = $('.quicksearch').keyup( debounce( function() {
// //     qsRegex = new RegExp( $quicksearch.val(), 'gi' );
// //     $grid.isotope();
// // }, 200 ) );

// // // Order 
// //   $('.sort-by-button-group button').on( 'click', function() {

// //     /* Get the element name to sort */
// //     var sortValue = $(this).attr('data-sort-value');

// //     /* Get the sorting direction: asc||desc */
// //     var sortDirection = $(this).attr('data-sort-direction');

// //     /* convert it to a boolean */
// //     sortDirection = sortDirection == 'asc';

// //     /* pass it to isotope */
// //     $grid.isotope({ sortBy: sortValue, sortAscending: sortDirection });

// // });


// // // debounce so filtering doesn't happen every millisecond
// // function debounce( fn, threshold ) {
// //     var timeout;
// //     threshold = threshold || 100;
// //     return function debounced() {
// //         clearTimeout( timeout );
// //         var args = arguments;
// //         var _this = this;
// //         function delayed() {
// //             fn.apply( _this, args );
// //         }
// //         timeout = setTimeout( delayed, threshold );
// //     };
// // }



// // $('.filters').on( 'click', '.button', function( event ) {
// //     var $button = $( event.currentTarget );
// //     // get group key
// //     var $buttonGroup = $button.parents('.button-group');
// //     var filterGroup = $buttonGroup.attr('data-filter-group');
// //     // set filter for group
// //     filters[ filterGroup ] = $button.attr('data-filter');
// //     // combine filters
// //     var filterValue = concatValues( filters );
// //     // set filter for Isotope
// //     $grid.isotope({ filter: filterValue });
// // });

// // // change is-checked class on buttons
// // $('.button-group').each( function( i, buttonGroup ) {
// //     var $buttonGroup = $( buttonGroup );
// //     $buttonGroup.on( 'click', 'button', function( event ) {
// //         $buttonGroup.find('.is-checked').removeClass('is-checked');
// //         var $button = $( event.currentTarget );
// //         $button.addClass('is-checked');
// //     });
// // });

// // // flatten object by concatting values
// // function concatValues( obj ) {
// //     var value = '';
// //     for ( var prop in obj ) {
// //         value += obj[ prop ];
// //     }
// //     return value;
// // }


// // var initShow = 9; //number of items loaded on init & onclick load more button
// // var counter = initShow; //counter for load more button
// // var iso = $grid.data('isotope'); // get Isotope instance

// // loadMore(initShow); //execute function onload

// // function loadMore(toShow) {
// //     $grid.find(".hidden").removeClass("hidden");

// //     var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
// //         return item.element;
// //     });
// //     $(hiddenElems).addClass('hidden');
// //     $grid.isotope('layout');

// //     //when no more to load, hide show more button
// //     if (hiddenElems.length == 0) {
// //         jQuery("#load-more").hide();
// //     } else {
// //         jQuery("#load-more").show();
// //     };

// // }

// // //append load more button

// // //when load more button clicked
// // $("#load-more").click(function() {
// //     if ($('#filters').data('clicked')) {
// //         //when filter button clicked, set initial value for counter
// //         counter = initShow;
// //         $('#filters').data('clicked', false);
// //     } else {
// //         counter = counter;
// //     };
// //     counter = counter + initShow;
// //     loadMore(counter);
// // });

// // //when filter button clicked
// // $("#filters").click(function() {
// //     $(this).data('clicked', true);
// //     loadMore(initShow);
// // });
