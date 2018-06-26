$(function () {
    let weather;
    let name;
    let tem;
    let cond;
    let hours;
    $.ajax({
        url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=广州`,
        dataType:`jsonp`,
        success:function(obj){   //请求成功后执行的函数
            weather=obj.data.weather;
            name=weather.city_name;
            tem=weather.current_temperature;
            cond=weather.current_condition;
            hours=weather.hourly_forecast;
            console.log(weather);
            ww();
        }
    });
    function ww() {
        $(".tTop b").html(name);
        $(".tem span").html(tem);
        $(".yun span").html(cond);
        $(".wuran span").html(weather.aqi);
        let num=Number($(".wuran span").html());
        if (num<50){
            $(".wuran").css({"background":"yellowGreen"});
        }else if(num>=50&&num<100){
            $(".wuran").css({"background":"#DEF508"});
        }else if(num>=100&&num<150){
            $(".wuran").css({"background":"orange"});
        }else if(num>150){
            $(".wuran").css({"background":"red"});
        }
        $(".wuran i").html(weather.quality_level);
        $(".mj span").html(weather.dat_high_temperature+"/"+weather.dat_low_temperature);
        $(".mj i").html(weather.dat_condition);
        $(".mj>div>img").attr({"src":`img/${weather.dat_weather_icon_id}.png`});
        $(".mm span").html(weather.tomorrow_high_temperature
            +"/"+weather.tomorrow_low_temperature);
        $(".mm i").html(weather.tomorrow_condition);
        $(".mm>div>img").attr({"src":`img/${weather.tomorrow_weather_icon_id}.png`});
        $(".feng span").eq(0).html(weather.wind_direction);
        $(".feng span").eq(1).html(weather.quality_level);
        function h() {
            $(".feng span").toggle("slow")
        }
        setInterval(h,2000);
        // for(let i=0;i<26;i++){
        //     $(".ho>li").eq(i).children("span").html($(hours).eq(i).attr("hour")+":00");
        //     $(".ho>li").eq(i).find("img").attr("src","img/"+$(hours).eq(i).attr("weather_icon_id")+".png");
        //     $(".ho>li").eq(i).find("i").html($(hours).eq(i).attr("temperature"));
        // }
        $(weather.hourly_forecast).each(function (i,v) {
            let str=`<li>
            <span>${v.hour}:00</span>
            <div class="ht">
                <img src="img/${v.weather_icon_id}.png" alt="">
            </div>
            <i>${v.temperature}</i>°
        </li>`;
            $(".ho").append(str);
        });
        $(weather.forecast_list).each(function (i,v) {
            let mouth=v.date.split("-")[1];
            let day=v.date.split("-")[2];
            let str=`<li>
            <span>${mouth}/${day}</span>
            <i>${v.high_temperature}</i>°
            <img src="img/${v.weather_icon_id}.png" alt="">
            <b>${v.condition}</b>
            <p>${v.wind_direction}</p>
        </li>`;
            $(".do").append(str);
        })

        // console.log(weather.hourly_forecast);
    }

});