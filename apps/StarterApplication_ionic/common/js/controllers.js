/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
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