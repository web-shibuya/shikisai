class YoutubeControl {
	constructor() {
		this.youtubeLoadFlag = false;
		this.youtubeInitFlag = false;
		this.player = {};
		this.loadflg = false;
	}

	setMovie(option) {
		if(this.youtubeInitFlag === false) {
			this.initPlayer(option);
		} else {
			this.loadMovie(option);
		}
	}

	initPlayer(option) {
		$.ajax({
			url: 'https://www.youtube.com/player_api/',
			dataType: 'script'
		}).done(() => {
			window.onYouTubeIframeAPIReady = () => {
				this.youtubeInitFlag = true;
				this.loadMovie(option);
			};
		});
	}

	loadMovie(option) {
		let player = option.playerID;

		if(!this.player[player]){
			/* eslint-disable no-undef */
			this.player[player] = new YT.Player(player, {
				width: option.width,
				height: option.height,
				videoId: option.movieId,
				playerVars: option.playerVars,
				events: option.events
			});
			/* eslint-enable no-undef */
		} else {
			this.player[player].cueVideoById(option.movieId);
			this.player[player].mute();
			this.player[player].playVideo();
			// this.player[player].unMute();

		}
	}

	pauseMovie(playerID) {
		/* eslint-disable no-extra-boolean-cast */
		if(!!this.player[playerID]) {
			this.player[playerID].pauseVideo();
		}
		/* eslint-enable no-extra-boolean-cast */
	}

	stopMovie(playerID){
		if(!!this.player[playerID]) {
			this.player[playerID].stopVideo();
		}
	}
}