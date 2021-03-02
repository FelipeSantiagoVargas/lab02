new Vue({
  el: "#app",
  data: {
    item: false,
    file: undefined,
    result: false,
  },
  methods: {
    onFileChange(item, e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) return;
      this.file = files[0];
      this.createImage(item, files[0]);
      console.log(files[0]);
    },
    createImage(item, file) {
      var reader = new FileReader();

      reader.onload = (e) => {
        this.item = e.target.result;
      };
      reader.readAsDataURL(file);
      
    },
    removeImage: function (item) {
      this.item = false;
    },
    pruebaBoton() {
      const formData = new FormData();
      console.log(formData);
      formData.append("file", this.file);
      console.log(formData);
      try {
        axios
          .post("http://localhost:3000/sendImage", formData)
          .then(function (response) {
            console.log(response.data);
            var reader = new FileReader();
            reader.readAsArrayBuffer(response.data.file.data.data)
            console.log(reader)
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
});
