$(function(){
    getLayersInfo();
//以下为界面UI控制
    $("#btn-down").mouseover(function(){
    $(".control-dropdown").slideDown();
  }); 

  $("#control-group").mouseleave(function(){
    $(".control-prime").show();
    $(".control-dropdown").slideUp();
  });

  
});

function getLayersInfo() {
    //获取地图状态参数必设：url
    var getLayersInfoService = new SuperMap.REST.GetLayersInfoService(g_urlAll);
    getLayersInfoService.events.on({ "processCompleted": getLayersInfoCompleted});
    getLayersInfoService.processAsync();
}   
//与服务器交互成功，得到子图层信息
var subLayers = new Array();
function getLayersInfoCompleted(getLayersInfoEventArgs) {
    if (getLayersInfoEventArgs.result) {
        {
            if (getLayersInfoEventArgs.result.subLayers) {
                for (var j = 0; j < getLayersInfoEventArgs.result.subLayers.layers.length; j++) {
                    subLayers.push(getLayersInfoEventArgs.result.subLayers.layers[j]);
                }
            }
        }
    }
    createTempLayer();
}
//创建临时图层来初始化当前地图显示
function createTempLayer() {
    //子图层控制参数必设：url、mapName、SetLayerStatusParameters
    var layerStatusParameters = new SuperMap.REST.SetLayerStatusParameters();
    layerStatusParameters = getLayerStatusList(layerStatusParameters);

    var setLayerStatusService = new SuperMap.REST.SetLayerStatusService(g_urlAll);
    setLayerStatusService.events.on({ "processCompleted": createTempLayerCompleted});
    setLayerStatusService.processAsync(layerStatusParameters);
}
//获取当前地图子图层状态信息
function getLayerStatusList(parameters) {
    for (var i = 0; i < subLayers.length; i++) {
        var layerStatus = new SuperMap.REST.LayerStatus();
        layerStatus.layerName = subLayers[i].name;
        layerStatus.isVisible = subLayers[i].visible;
        parameters.layerStatusList.push(layerStatus);
    }
    //设置资源在服务端保存的时间，单位为分钟，默认为10
    parameters.holdTime = 30;
    return parameters;
}

//与服务器交互成功，创建临时图层
function createTempLayerCompleted(createTempLayerEventArgs) {
    tempLayerID = createTempLayerEventArgs.result.newResourceID;
    //创建 TiledDynamicRESTLayer
    g_layerAll = new SuperMap.Layer.TiledDynamicRESTLayer("整体效果", g_urlAll, {transparent: true, cacheEnabled: true, redirect: true, layersID: tempLayerID}, {maxResolution: "auto", bufferImgCount: 0});
    g_layerAll.bufferImgCount = 0;
    g_layerAll.events.on({"layerInitialized": addLayer1});

}
// g_layerAll.params.layersID = "[0,1,2,3,14]";
// g_layerAll.redraw();

