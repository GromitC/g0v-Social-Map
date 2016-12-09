// Define a class like this
createMap=function(id){
    $.getJSON(window.location.href+'getSocial/',function(_dataS){ 
     $.getJSON(window.location.href+'getTiles/',function(_dataT){ 

        
        var leafletMap = L.map(id,{ zoomControl:false }).setView([40.706,-74.0088], 14);
        var videoIcon = L.icon({
            iconUrl: '../img/youtube.svg',
                iconSize:     [20, 20], // size of the icon
            });
        var photoIcon= L.icon({
            iconUrl: '../img/photo.svg',
                iconSize:     [20, 20], // size of the icon
            });

        var newspaperIcon=L.icon({
            iconUrl: '../img/newspaper.svg',
                iconSize:     [20, 20], // size of the icon
            });

        var musicIcon=L.icon({
            iconUrl: '../img/music.svg',
                iconSize:     [20,20], // size of the icon
            });

        function onEachFeature(feature, layer) {
                // does this feature have a property named popupContent?
                if (feature.properties && feature.properties.content) {
                    var link='';
                    if(feature.properties.source!=null){
                        link='<a target="_blank" href="'+feature.properties.source+'">'+'source'+'</a>'
                    }
                    var timeStamp=''
                    if (feature.properties.starttime===feature.properties.endtime){
                        timeStamp=feature.properties.starttime
                    }else{
                        timeStamp=feature.properties.starttime+'-'+feature.properties.endtime
                    }
                    layer.bindPopup(
                        '<h6>'+feature.properties.event+'</h6>'+
                        '<h6>'+feature.properties.typology+' '+timeStamp+'</h6>'+
                        '<h6><small>'+feature.properties.content+'</small></h6>'+
                        link);
                }
            }
            //'#fbe5ce' , '#f4b171','#e49042' ,'#b25f19' ,'#de6768' '#ca0813'
            var layerT=[];
            for (var i=0;i<_dataT.length;i++){
                layerT.push(L.geoJSON(_dataT[i], {
                    onEachFeature: onEachFeature,
                    style:  function(feature){
                        var line='0,0'
                        var weight='1';
                        var color="#FFFFFF"
                        if (feature.properties.action=='moving'){
                            line='2,2'
                            
                        }else{
                            weight='0'
                        }
                        switch (feature.properties.typology) {
                            case 'march': color= "#a4ce39"; break;
                            case 'demonstration':  color= "#f6ec13"; break;
                            case 'strike': color='#fab018'; break;
                                    // case 'sabotage' : color='#b25f19'; break;
                                    case 'occupy' : color='#f26643'; break;
                                    case 'riot' : color='#ed1c24'; break;
                                }
                                return {
                                    weight: weight,
                                    color: color,
                                    dashArray:line,
                                    fillColor: color,
                                    fillOpacity: '0.5',
                                    opacity: '0.5'
                                }   
                            }}))
                layerT[i].addTo(leafletMap);
            }
            var layerS=[]
            for(var j=0;j<_dataS.length;j++){
                if ((_dataS[j].lat!==null)&& (_dataS[j].lng!==null)){
                    var icon;
            var link;//='<a target="_blank" href="'+_dataS[j].link1+'">'+_dataS[j].link1+'</a>';
            switch(_dataS[j].type1){
                case 'Video': 
                icon=videoIcon;
                var videoId='' 
                if(_dataS[j].link1.split('?v=')[1]==null){
                    videoId=_dataS[j].link1.split('.be/')[1]
                }else{
                    videoId=_dataS[j].link1.split('?v=')[1]
                }
                link='<iframe width="420" height="315" src="https://www.youtube.com/embed/'+
                videoId+
                '"></iframe>'
                break;
                case 'Music': 
                icon=musicIcon;
                var videoId='' 
                if(_dataS[j].link1.split('?v=')[1]==null){
                    videoId=_dataS[j].link1.split('.be/')[1]
                }else{
                    videoId=_dataS[j].link1.split('?v=')[1]
                }
                link='<iframe width="420" height="315" src="https://www.youtube.com/embed/'+
                videoId+
                '"></iframe>'
                break;
                case 'Article': 
                icon=newspaperIcon; 
                link='<a target="_blank" href="'+_dataS[j].link1+'">'+_dataS[j].link1+'</a>'
                break;
                case 'Photo': 
                icon=photoIcon;

                link='<img src="'+_dataS[j].link1+'" height="200" width="200">'
                break;
            }
            //console.log(_dataS[j])
            layerS.push(L.marker([_dataS[j].lat, _dataS[j].lng], {icon: icon}))
            layerS[j].addTo(leafletMap).bindPopup(link)
        }
    }

    L.tileLayer("https://api.mapbox.com/styles/v1/socialmap/ciuz2jmzc00hp2io4n0bum2a8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic29jaWFsbWFwIiwiYSI6ImNpdXoyZm9iZDA1ZmYycHBzaDF3OWo5azIifQ.IERpI9CJcaWUCEXTu6lVJg").addTo(leafletMap);
            //L.tileLayer("http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png").addTo(leafletMap);


              // DOM element where the Timeline will be attached
              var container = document.getElementById('timeline');
              var visTime=[]
              // Create a DataSet (allows two way data-binding)
              var visData=[]
              var i=0
              _dataT.forEach(function(d) {
                var tmpStartDate=d.properties.starttime.split('.');
                var tmpEndDate=d.properties.endtime.split('.');
                var isPoint=''
                if (d.properties.starttime==d.properties.endtime){
                    isPoint='point'
                }else{
                    isPoint='box'
                }
                visData.push({
                    id:i,
                    content: d.properties.starttime,//typology,
                    start: tmpStartDate[2]+'-'+tmpStartDate[0]+'-'+tmpStartDate[1],
                    end: tmpEndDate[2]+'-'+tmpEndDate[0]+'-'+tmpEndDate[1],
                    type: isPoint,
                    className: d.properties.typology
                }) 
                visTime.push(tmpStartDate[2]+tmpStartDate[0]+tmpStartDate[1])
                i+=1;
            });

              var items = new vis.DataSet(visData);


              // Configuration for the Timeline
              var options = {
                multiselect : true,
                align:'left',
                maxHeight: $('#map').height()*0.35
            };

            var querying=false
              // Create a Timeline
              var timeline = new vis.Timeline(container, items, options);
              timeline.on('select', function (properties) {

                  var itemId = properties.items;
                  for(var i=0;i<layerT.length;i++){
                    if (itemId.indexOf(i)==-1){
                    }else{ 
                        layerT[i].eachLayer(function(layer) {
                          layer.openPopup()
                      });    
                    }
                //console.log(properties.items)
                if (!querying)
                    updateTweets(visTime[properties.items[0]])
            }
        });
              updateTweets('20110917')
              //put some example
              function updateTweets(date){
                querying=true
                $.getJSON(window.location.href+'getTweets/'+date,function(_tweets){
                    //console.log(_tweets)
                    querying=false
                    
                    $( "#tweetTable" ).empty()
                    if(_tweets.length>0){
                        for (var j=0;j<_tweets[0].tweets.length;j++){
                            var tmpDate=new Date(_tweets[0].tweets[j].date)
                       // console.log(tmpDate)
                       $( "#tweetTable" ).append(
                        '<div class="panel panel-default">'+
                        '<div>'+
                        '<h6><span class="name">'+_tweets[0].tweets[j].username+'</span>'+
                    //'<span class="time">.'+(_tweets[0].tweets[j].hashtags!==null)?_tweets[0].tweets[j].hashtags:''+'</span>'+
                    '<span class="date">'+' '+tmpDate.getFullYear()+'/'+(tmpDate.getMonth()+1).toString()+'/'+tmpDate.getDate()+' '+tmpDate.getHours()+':'+tmpDate.getMinutes()+'</span>'+
                    '</h6></div>'+
                    '<div class="tweet-text">'+_tweets[0].tweets[j].text+'</div>'+
                    '<a target="_blank" href="'+_tweets[0].tweets[j].permalink+'">'+_tweets[0].tweets[j].permalink+'</a>'+
                    //'<div class="tweet-text">'+_tweets[0].tweets[j].permalink+'</div>'+
                    '</div>'
                    ) 
                   }
               }

           })
            }

            $('#resetMap').on('click',function(){
                for (var i=0;i<layerT.length;i++){
                    layerT[i].setStyle({
                        opacity: 0.5,
                        fillOpacity: 0.5
                    })
                }
            })

        })
})
//})
// })
// })
// })
}
