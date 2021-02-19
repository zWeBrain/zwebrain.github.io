var audio = document.getElementById('audio');
var totalProgress = $('.totalProgress');
var currentProgress = $('.currentProgress');
var currentTime = $('.currentTime');
var totalTime = $('.totalTime');
var timer;//��ʱ��

/*��ť����ʱ*/
$('.btn').on('click', function () {
    //�����Ƶ��ͣ
    if (audio.paused) {
        audio.play();//������Ƶ
        //���Ĳ��Ű�ť
        $('.play').css({'display': 'none'});
        $('.pause').css({'display': 'block'});
        //��ʱ��ʵʱ���Ľ���
        timer = setInterval(function () {
            if (audio.ended) {
                //�����Ƶ���Ž���
                $('.play').css({'display': 'block'});
                $('.pause').css({'display': 'none'});
            } else {
                //����ʱ��
                currentTime.text(formatTime(audio.currentTime));
                totalTime.text(formatTime(audio.duration));
                //���Ľ�����
                var ratio = audio.currentTime / audio.duration;
                currentProgress.css({'width': ratio * 100 + '%'});
            }
        }, 100)
    } else {
        audio.pause();
        $('.play').css({'display': 'block'});
        $('.pause').css({'display': 'none'});
    }
});

/*�������������Ľ���*/
totalProgress.on('click', function (ev) {
    //��ȡ�ٷֱ�
    var ratio = getRatio(ev);
    currentProgress.css({'width': ratio * 100 + '%'});
    //������Ƶ����
    audio.currentTime = audio.duration * ratio;
});

function getRatio(ev) {
    //�ܽ�������ʵ�ʿ��
    var totalWidth = totalProgress[0].offsetWidth;
    //�ܽ�������X����
    var totalX = totalProgress.offset().left;
    //����X����
    var mouseX = ev.clientX;
    //����ٷֱ�
    var ratio = (mouseX - totalX) / totalWidth;
    return ratio;
}

//��ʽ��ʱ��
function formatTime(time) {
    //ȡ��
    time = ~~time;
    var formatTime;
    if (time < 10) {
        formatTime = '00:0' + time;
    } else if (time < 60) {
        formatTime = '00:' + time;
    } else {
        var m = ~~(time / 60);
        if (m < 10) {
            m = '0' + m;
        }
        var s = time % 60;
        if (s < 10) {
            s = '0' + s;
        }
        formatTime = m + ':' + s;
    }
    return formatTime;
}