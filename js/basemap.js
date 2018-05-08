/**
 * Created by Administrator on 14-1-1.
 */
require([ 
    "esri/map", 
     'dojo/on', 
     'dojo/dom', 
     'dojo/_base/fx',
     'esri/layers/ArcGISTiledMapServiceLayer', 
     "esri/geometry/Extent", 
     "dojo/domReady!"
     ],
    function (Map, on, dom,basefx, ArcGISTiledMapServiceLayer, Extent) 
    {
        var colorfullbasemapurl = "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer";
        var graybasemapurl = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer";
        var initextent = new Extent({
            "xmax": 18599269.21857036,
            "xmin": 5586629.523305412,
            "ymax": 6490631.986929903,
            "ymin": 2175914.61428942,
            "spatialReference": {"wkid": 102100}
        });
        var map = new Map("map", {extent: initextent });
        var colorfullbasemap = new ArcGISTiledMapServiceLayer(colorfullbasemapurl,{ className:"unvisible",id:'colorfullbasemaplayer'});
        var graybasemap = new ArcGISTiledMapServiceLayer(graybasemapurl);
        map.addLayer(colorfullbasemap);
        map.addLayer(graybasemap);
        on(map,"layer-add-result",function(result){
            if("colorfullbasemaplayer"===result.layer.id){
                var colorfullbasemapdiv = colorfullbasemap.getNode();
                colorfullbasemapdiv.style.display="none";
                colorfullbasemapdiv.style.opacity=0;
           }
        });
        on(dom.byId('switchbasemap'), "click", function () {
            switchbaseMap();
        });
        function switchbaseMap() {
            var colorfullbasemapdiv = colorfullbasemap.getNode();
            var graybasemapdiv = graybasemap.getNode();
            if (colorfullbasemapdiv.style.display == "none") {
                basefx.animateProperty({
                  node: graybasemapdiv,
                    duration:1000,
                  properties: { opacity: 0 },
                  onEnd:function(){
                      graybasemapdiv.style.display="none";
                      colorfullbasemapdiv.style.display="block";
                      basefx.animateProperty({
                          duration:1000,
                          node: colorfullbasemapdiv,
                          properties: { opacity: 1 }
                      }).play();
                  }
            }).play();
            }
            else {
                basefx.animateProperty({
                    node: colorfullbasemapdiv,
                    duration:1000,
                    properties: { opacity: 0 },
                    onEnd:function(){
                        colorfullbasemapdiv.style.display="none";
                        graybasemapdiv.style.display="block";
                        basefx.animateProperty({
                            duration:1000,
                            node: graybasemapdiv,
                            properties: { opacity: 1 }
                        }).play();
                    }
                }).play();
            }
        }
    });