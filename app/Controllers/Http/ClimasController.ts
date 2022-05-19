// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import TemperatureValidator from "App/Validators/TemperatureValidator";

export default class ClimasController {
    public async calculateTemp({ request, response }: HttpContextContract) {
        const {value,typeSend} = await request.validate(TemperatureValidator);
    
        var resultCelsius;
        var resultAll = {
          fahrenheit: 0,
          celsius: 0,
          kelvin: 0
        }
        function fromFahrenheitToCelsius(value){
          return (5*(value-32))/9
        }
        function fromKelvinToCelsius(value){
          return value-273
        }
        function fromCelsiusToFahrenheit(value){
          return ((value * 9)/5) + 32
        }
        function fromCelsiusToKelvin(value){
          return value+273
        }
    
        switch(typeSend.toString()) {
          case "fahrenheit":
            resultCelsius = fromFahrenheitToCelsius(value)
            // code block
            break;
            case "celsius":
              resultCelsius = value;
              // code block
            break;
            case "kelvin":
              resultCelsius = fromKelvinToCelsius(value)
            // code block
            break;
          default:
            // code block
        }
        resultAll.celsius = resultCelsius;
        resultAll.fahrenheit = fromCelsiusToFahrenheit(resultCelsius)
        resultAll.kelvin = fromCelsiusToKelvin(resultCelsius)
        
        return response.ok(resultAll);
      }
}
