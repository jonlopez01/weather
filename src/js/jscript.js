$(document).ready(function () {
  function inputError() {
    $("#ciudad").addClass("inputCity");
    $("#ciudad").focus();
    $("#msjError").fadeIn(500);
  }

  function removeError(params) {
    $("#ciudad").removeClass("inputCity");
    $("#msjError").hide();
  }

  $("form").submit(function () {
    var ciudad = $("#ciudad").val();
    if (ciudad.length > 0) {
      $.get(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
          ciudad +
          "&appid=507ae25cced274be286f92f1acf99e2d&units=metric",
        function (data, statusText, xhr) {
          var succes = xhr.status;
          if (succes == 200) {
            console.log(data);
            removeError(); // funcion para quitar los avisos de error

            $("#contentTemp").fadeIn(3000);
            var sky = data.weather[0].description;
            var temperature = data.main.temp;
            var lon = data.coord.lon;
            var lat = data.coord.lat;

            $(".pCity").html(
              "<p id='" +
                ciudad +
                "'>" +
                ciudad +
                ": " +
                "<span>" +
                sky +
                "</span></p>"
            );

            $(".temp").html(
              "<p>Temperature: <span>" + temperature + "°</span></p>"
            );

            $(".coord").html(
              "<p>Coord: <span>Lon:" + lon + " Lat: " + lat + "</span></p>"
            );
          } else {
            alert("error");
          }
        },
        "json"
      )

        //Detecta si hay algun error en la consulta
        .fail(function () {
          inputError();
        }); //fin $.get
    } else {
      inputError();
    } // FIN if (ciudad.lenght > 0)

    // Se debe retornar false para que el submit del formulario no recarge la pagina.
    return false;
  });
}); //fin .ready
