/*
COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
application programs conforming to the application programming interface for the operating platform for which the sample code is written.
Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.
*/

app.controller('FeedsController', function($rootScope, $scope, feedsService, $ionicLoading, $timeout) {
	$scope.loading = $ionicLoading.show({	
		content: '<i class="ion-loading-c"></i> Loading...',
		animation: 'fade-in',
		showBackdrop: true,
		maxWidth: 200,
		showDelay: 0
	});
	$scope.getFeeds = function() {
		$rootScope.feeds = [];
		$scope.errorMsg = "";
		feedsService().then(function (feeds) {
			$rootScope.feeds = feeds;
			$scope.$broadcast('scroll.refreshComplete');
			$scope.errorMsg = "";
			$scope.loading.hide();
		},
		function(error) {
			$scope.errorMsg = "Could Not Load feeds";
			$scope.$broadcast('scroll.refreshComplete');
			$scope.loading.hide();
		});
	};
	$scope.getFeeds();
});

app.controller('FeedController', function($ionicScrollDelegate, $scope, $rootScope, $route) {
	feeds = $rootScope.feeds;
	$scope.errorMsg = "";
	$rootScope.feeds.forEach(function(feeds) {
		if (feeds.$$hashKey === $route.current.params.feedId) {
			$scope.feed = feeds;
		}
	});
	$ionicScrollDelegate.scrollTop();
});

app.controller('scrollController', function($scope, $ionicScrollDelegate) {
	$ionicScrollDelegate.scrollTop();
});

app.controller('MenuController', function($scope) {
	$scope.tabSelect = function(selected) {
		$(".tab-item").removeClass("tab-item-active");
		$("#"+selected).addClass("tab-item-active");
	};
});