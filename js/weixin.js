
var imgUrl = "http://gbsz.daxiangqun.net/webpage/chphone/cms/public/images/logo.jpg";   //������ͼƬ  ����������վ��logo
var lineLink = "http://gbsz.daxiangqun.net/webpage/chphone/cms/index/index.shtml";				  //����������
var shareTitle = '�ű�ˮ��';							                  //������title
var descContent = '�������ζȼ���-�ű�ˮ��';							  //�����Ǽ���
var appid = '';
    // ���͸�����
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage',{
        "appid": appid,
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
    })
}
    // ����������Ȧ
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline',{
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": lineLink,
        "desc": descContent,
        "title": shareTitle
    }, function(res) {
    });
}
    // ������΢��   
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo',{
        "content": descContent,
        "url": lineLink,
    }, function(res) {
    });
}
// ��΢�����������������ڲ���ʼ�����ᴥ��WeixinJSBridgeReady�¼���
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // ���͸�����
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
    });
    // ����������Ȧ
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });
    // ������΢��
    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
    });
}, false);