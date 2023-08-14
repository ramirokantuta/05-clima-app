const axios=require('axios');
class Busquedas{
    historial = ['zona sur','El alto','Achacahi'];
    constructor(){
        //leer base de datos si existe
    }

    get paramMapBox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'languaje':'es'
        }
    }
    get paramsWeather(){
        return{
            appid:process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    async ciudad(lugar=''){
        try {
            //console.log('ciudad',lugar);
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:this.paramMapBox
            });
                        
            const resp = await instance.get('');
            //console.log(resp.data.features);
            //return[];
            return resp.data.features.map(lugar=>({
                id: lugar.id,
                nombre:lugar.place_name,
                long:lugar.center[0],
                lat:lugar.center[1]
            }));   
        } catch (error) {
            return [];
        }
    }
    async climaLugar(lat, long){
        try{
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/`,
                params: {...this.paramsWeather, lat, long}

            })
            const resp = await instance.get();
            const{weather, main}=resp.data;

            //console.log(weather);
            return{
                desc:weather[0].description,
                min:main.temp_min,
                max:main.temp_max,
                temp:main.temp

            }
        }catch (error){
            console.log(error);
        }
    }
}
module.exports=Busquedas;