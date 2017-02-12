/* javascript.js */
function Caption(startTime, endTime, text) {
    "use strict";
    this.startTime = startTime;
    this.endTime = endTime;
    this.text = text;
}
var captions = [
    new Caption("00.240", "07.535", `Now that we've looked at the architecture
of the internet, let's see how you might connect your personal devices to
the internet inside your house. `)
    , new Caption("07.535", "13.960", `Well there are many ways to
connect to the internet, and most often people connect wirelessly. `)
    , new Caption("13.960", "17.940", `Let's look at an example of how
you can connect to the internet. `)
    , new Caption("17.940", "30.920", `If you live in a city or a town,
you probably have a coaxial cable for cable Internet, or a phone line if you
have DSL, running to the outside of your house, that connects you to
the Internet Service Provider, or ISP. `)
    , new Caption("30.920", "41.190", `If you live far out in the country,
you'll more likely have a dish outside your house, connecting
you wirelessly to your closest ISP, or you might also use the telephone system. `)
    , new Caption("41.190", "53.760", `Whether a wire comes straight from
the ISP hookup outside your house, or it travels over radio
waves from your roof, the first stop a wire will make once
inside your house, is at your modem. `)
    , new Caption("53.760", "57.780", `A modem is what connects the internet
to your network at home. `)
    , new Caption("57.780", "60.150", `A few common residential modems are DSL or`)
    ]
    //Adding captions to DOM
$(function () {
    "use strict";
    var webText = $("#captions");
    for (var i = 0; i < captions.length; i++) {
        var caption = $("<p></p>");
        caption.html(captions[i].text);
        caption.attr("class", "captionClass");
        caption.attr("id", i);
        webText.append(caption);
    }
    $('.captionClass').on('click', updateTime); //Hooking up click function to all captions
    function updateTime() {
        var video = document.getElementById("video");
        var i = this.getAttribute("id");
        var clickedCaption = captions[i];
        video.currentTime = clickedCaption.startTime;
    }
});
//Video duration update
//http://stackoverflow.com/questions/2221029/problem-retrieving-html5-video-duration
window.setInterval(function (t) {
    if (video.readyState > 0) {
        var $duration = $("#duration");
        $duration.text(new Date(null, null, null, null, null, video.duration).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0].substr(3));
        clearInterval(t);
    }
}, 500);
$(function () {
    "use strict";
    updateText(0);
    var video = document.getElementById("video");
    var $video = $("#video");
    var playButton = document.getElementById("play-pause");
    var seekBar = document.getElementById("seek-bar");
    var playButtonImage = $("#play-pause input")
    var $current = $("#current");
    // Event listener for the play/pause button
    playButton.addEventListener("click", function () {
        if (video.paused == true) {
            // Play the video
            video.play();
            // Update the button image to 'Pause'
            playButtonImage.attr("src", "icons/pause-icon.png")
        }
        else {
            // Pause the video
            video.pause();
            // Update the button image to 'Play'
            playButtonImage.attr("src", "icons/play-icon.png")
        }
    });
    // Event listener for the seek bar
    seekBar.addEventListener("change", function () {
        // Calculate the new time
        var time = video.duration * (seekBar.value / 100);
        // Update the video time
        video.currentTime = time;
    });
    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", function () {
        // Calculate the slider value
        var value = (100 / video.duration) * video.currentTime;
        // Update the slider value
        seekBar.value = value;
        updateText(video.currentTime);
        $current.text((new Date(null, null, null, null, null, video.currentTime).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0]).substr(3)); //Update current time MM:ss
        var $seekBar = $("#seek-bar");
        var val = $seekBar.val(); // Current video position
        var buf = (video.buffered.end(0) / video.duration) * 100; // Calculates buffered %
        $seekBar.css('background', 'linear-gradient(to right, #ff9900 0%, #ff9900 ' + val + '%, #777 ' + val + '%, #777 ' + buf + '%, #444 ' + buf + '%, #444 100%)');
    });
    // Update play button when video ends
    video.addEventListener("ended", function () {
        playButtonImage.attr("src", "icons/play-icon.png")
    });
 
    function updateText(currentTime) {
        var allCaptions = $("#captions p");
        var activeCaptionId;
        for (var i = 0; i < captions.length; i++) {
            if (currentTime > Number(captions[i].startTime) && currentTime < Number(captions[i].endTime)) {
                activeCaptionId = i;
            }
        }
        allCaptions.each(function () {
            if ($(this).attr("id") == activeCaptionId) {
                $(this).css("color", "#e38901");
            }
            else {
                $(this).css("color", "#000");
            }
        });
    }
});
// Fullscreen button click listener
$(function () {
    "use strict";
    var video = document.getElementById("video");
    var fullScreenButton = $("#fullscreen");
    // Event listener for the full-screen button
    fullScreenButton.click(function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        }
        else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen(); // Firefox
        }
        else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen(); // Chrome and Safari
        }
    });
});
// Mute button click listener
$(function () {
    "use strict";
    var $video = $("#video");
    var muteButton = $("#mute");
    var muteImage = $("#mute input");
    muteButton.click(function () {
        if ($video.prop("muted") == true) {
            $video.prop("muted", false);
            muteImage.attr("src", "icons/volume-on-icon.png");
        }
        else {
            $video.prop("muted", true);
            muteImage.attr("src", "icons/volume-off-icon.png");
        }
    });
});