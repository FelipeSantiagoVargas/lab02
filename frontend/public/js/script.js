// document.getElementById("file").onchange = function (e) {
//   // Creamos el objeto de la clase FileReader
//   let reader = new FileReader();

//   // Leemos el archivo subido y se lo pasamos a nuestro fileReader
//   reader.readAsDataURL(e.target.files[0]);

//   // Le decimos que cuando este listo ejecute el código interno
//   reader.onload = function () {
//     let preview = document.getElementById("preview"),
//       image = document.createElement("img");

//     image.src = reader.result;
//     preview.innerHTML = "";
//     preview.append(image);
//   };
// };
new Vue({
  el: "#app",
  data: {
    items: [
      {
        image: false,
      },
    ],
  },
  methods: {
    onFileChange(item, e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(item, files[0]);
    },
    createImage(item, file) {
      var image = new Image();
      var reader = new FileReader();

      reader.onload = (e) => {
        item.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (item) {
      item.image = false;
    },
  },
});

function pruebaBoton() {
  alert("Hola perro si sirvo");
}
