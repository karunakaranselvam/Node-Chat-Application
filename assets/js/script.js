



    $("#profile-img").click(function () {
        $("#status-options").toggleClass("active");
    });

    $(".expand-button").click(function () {
        $("#profile").toggleClass("expanded");
        $("#contacts").toggleClass("expanded");
    });

    $("#status-options ul li").click(function () {
        $("#profile-img").removeClass();
        $("#status-online").removeClass("active");
        $("#status-away").removeClass("active");
        $("#status-busy").removeClass("active");
        $("#status-offline").removeClass("active");
        $(this).addClass("active");

        if ($("#status-online").hasClass("active")) {
            $("#profile-img").addClass("online");
        } else if ($("#status-away").hasClass("active")) {
            $("#profile-img").addClass("away");
        } else if ($("#status-busy").hasClass("active")) {
            $("#profile-img").addClass("busy");
        } else if ($("#status-offline").hasClass("active")) {
            $("#profile-img").addClass("offline");
        } else {
            $("#profile-img").removeClass();
        }

        $("#status-options").removeClass("active");
    });

    // function newMessage() {
    //     message = $(".message-input input").val();
    //     if ($.trim(message) == '') {
    //         return false;
    //     }
    //     var sender_id = $("#sender_id").val();
    //     var receiver_id = $("#receiver_id").val();
    //     var msg = $("#msg").val();
    //     var chater = $("#chater").val();
    //     var chatername = $('.contact-profile').text();
    //     if (chater == 1) {
    //         $.ajax({
    //             type: 'get',
    //             url: "/msg",
    //             data: {
    //                 sender_id: sender_id,
    //                 receiver_id: receiver_id,
    //                 msg: msg,
    //                 name: chatername
    //             },
    //             success: function (result) {
    //                 $(".messages").html(result.message);
    //                 $("#msg").val('');
    //             }
    //         });
    //     }
    //     if (chater == 2) {
    //         $.ajax({
    //             type: 'get',
    //             url: "/msg",
    //             data: {
    //                 sender_id: receiver_id,
    //                 receiver_id: sender_id,
    //                 msg: msg,
    //                 name: chatername
    //             },
    //             success: function (result) {
    //                 $(".messages").html(result.message);
    //                 $("#msg").val('');
    //             }
    //         });
    //     }
    //     $(".messages").stop().animate({
    //         scrollTop: $(".messages")[0].scrollHeight
    //     }, 1000);

    //     //   $(".messages").animate({
    //     //     scrollTop: $(document).height()
    //     //    }, "fast");
    // }

    // function isTyping(event) {
    //     if (event.keyCode == 13) {
    //         this.form.submit();
    //         return false;
    //     }
    // }

    // $('.submit').click(function () {
    //     newMessage();
    // });

    // $('#msg').on('keydown', function (e) {
    //     if (e.which == 13) {
    //         newMessage();
    //         return false;
    //     }
    // });

    function users(lr_id, fac_id) {

        $("#receiver_id").val(lr_id);
        $(".wrap button").show();
        $(".wrap #msg").show();
        $(".messages ul.group-msg").hide();
        $(".contact-profile").html('<img src="' + $('#rootpath').val() + '/assets/img/user.png" alt="" />' + $('#name' + lr_id).text());

        $.ajax({
            type: 'post',
            url: "/users",
            data: {
                sender_id: fac_id,
                receiver_id: lr_id,
            },
            success: function (result) {
                if (result) {}
                $(".messages").html(result.message);
                $(".messages").stop().animate({
                    scrollTop: $(".messages")[0].scrollHeight
                }, 1000);
                // $("#receiver_id").val('0'); 
            }
        });
        $(".replies-span" + lr_id).html($('#name' + lr_id).text() + ":");

    }

    $("#private").click(function () {
        $("#private").addClass("user-active");
        $("#groupchat").removeClass("user-active");
        $("#receiver_id").val('1');
        $(".messages ul").hide();
        $(".wrap button").hide();
        $(".wrap #msg").hide();
        $(".contact-profile").html('<p class="text-center">361dm Faculty Private Chat</p>');
        $("#contacts").css({
            "opacity": "1",
            "pointer-events": "all"
        });
    });

    $("#groupchat").click(function () {
        window.location.reload(true);
        $("#groupchat").addClass("user-active");
        $("#private").removeClass("user-active");
        $(".messages ul").show();
        $(".wrap button").show();
        $(".wrap #msg").show();
        $(".messages ul.private-msg").hide();
        $(".messages ul.group-msg").show();
        $(".contact-profile").html('<p class="text-center">361dm Faculty Group Chat</p>');
        $("#contacts").css({
            "opacity": "0.4",
            "pointer-events": "none"
        });
        $("#receiver_id").val('0');
    });

    $("#contact-search").on('keyup', function () {
        if ($("#private").hasClass("user-active")) {
            var value = $(this).val().toLowerCase();
            $(".scrollbar2 li").each(function () {
                if ($(this).text().toLowerCase().search(value) > -1) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });


$(function () {
    $('.messages').animate({scrollTop: $('.messages').prop("scrollHeight")}, 500);

    var FADE_TIME = 150; // ms

    var $window = $(window);
    var socket = io.connect();

    var $messages = $('.group-msg');
    var $inputMessage = $('.inputMessage');

    var username = $("#messengername").val();
    var sender_id = $("#sender_id").val();
    var $receiver_id = $("#receiver_id");
    var chater = $("#chater").val();





    // Sets the client's username
    const setUsername = () => {
        // If the username is valid
        if (username && sender_id && receiver_id) {
            $currentInput = $inputMessage.focus();
            var main = ({
                username: username,
                sender_id: sender_id,
                chater: chater
            });
            // Tell the server your username
            socket.emit('add user', (main));
        }
    };


    // Sends a chat message
    const sendMessage = () => {
        var message = $inputMessage.val();
        var receiver_id = $receiver_id.val();
        // Prevent markup from being injected into the message
        message = cleanInput(message);
        // if there is a non-empty message and a socket connection
        if (message) {
            $inputMessage.val('');
            addChatMessage({
                username: username,
                message: message,
                senderid: sender_id,
                receiverid: receiver_id,
                chater: chater
            });
            var data= ({
                msg : message,
                receiverid:receiver_id
            });
            //tell server to execute 'new message' and send along one parameter
            socket.emit('new message',  (data));
        }
    };


     // Sends a chat message
     const privateMessage = () => {
        var message = $inputMessage.val();
        var receiver_id = $receiver_id.val();
        // Prevent markup from being injected into the message
        message = cleanInput(message);
        // if there is a non-empty message and a socket connection
        if (message) {
            $inputMessage.val('');
            $(".group-msg").append("<li class='replies'><p>"+message+"</p></li>");
            $('.messages').animate({scrollTop: $('.messages').prop("scrollHeight")}, 500);
            var data= ({
                msg : message,
                receiverid:receiver_id
            });
            //tell server to execute 'new message' and send along one parameter
            socket.emit('private message',  (data));
        }
    };

    $window.keydown(event => {
        // When the client hits ENTER on their keyboard
        if (event.which === 13) {
            if($receiver_id.val() == "0"){
            sendMessage();
            } else {
                privateMessage();
            }
            socket.emit('stop typing');
            typing = false;
        }
    });

    $('.submit').click(function () {
        if($receiver_id.val() == "0"){
            sendMessage();
            } else {
                privateMessage();
            }
    });

    // Adds the visual chat message to the message list
    const addChatMessage = (data, options) => {
        // Don't fade the message in if there is an 'X was typing'
        var $typingMessages = getTypingMessages(data);
        options = options || {};
        if ($typingMessages.length !== 0) {
            options.fade = false;
            $typingMessages.remove();
        }
        if (data.senderid === sender_id) {
            var typingClass = data.typing ? 'typing' : '';
            var $messageDiv = $("<li class='replies'>").data('username', data.username)
                .addClass(typingClass)
                .append("<p><span class='replies-span'>You:</span>" + data.message + "</p></li>");

            addMessageElement($messageDiv, options);
        } else {
            var typingClass = data.typing ? 'typing' : '';
            var $messageDiv = $("<li class='sent'>").data('username', data.username)
                .addClass(typingClass)
                .append("<p><span>" + data.username + ":</span>" + data.message + "</p></li>");

            addMessageElement($messageDiv, options);
        }

    };

    const addPrivateChatMessage = (data, options) => {
        // Don't fade the message in if there is an 'X was typing'
        var $typingMessages = getTypingMessages(data);
        options = options || {};
        if ($typingMessages.length !== 0) {
            options.fade = false;
            $typingMessages.remove();
        }
        if (data.senderid === sender_id) {
            var typingClass = data.typing ? 'typing' : '';
            var $messageDiv = $("<li class='sent'>").data()
                .addClass(typingClass)
                .append("<p>" + data.message + "</p></li>");

            addMessageElement($messageDiv, options);
        }

    };


    const addMessageElement = (el, options) => {
        var $el = $(el);

        // Setup default options
        if (!options) {
            options = {};
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true;
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false;
        }

        // Apply options
        if (options.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if (options.prepend) {
            $messages.prepend($el);
        } else {
            $messages.append($el);
        }
        $messages[0].scrollTop = $messages[0].scrollHeight;
    };

    // Prevents input from having injected markup
    const cleanInput = input => {
        return $('<div/>').text(input).html();
    };


    if (username != "" && sender_id !== "" && receiver_id != "") {
        setUsername();
        // fetchmsg();
    }


    // Whenever the server emits 'new message', update the chat body
    socket.on('new message', data => {
        addChatMessage(data);
    });

    socket.on('private message', data => {
        addPrivateChatMessage(data);
    });

    // Focus input when clicking on the message input's border
    $inputMessage.click(() => {
        $inputMessage.focus();
    });

    // Gets the 'X is typing' messages of a user
    const getTypingMessages = data => {
        return $('.typing.message').filter(function (i) {
            return $(this).data('username') === data.username;
        });
    };

   

    

    

});