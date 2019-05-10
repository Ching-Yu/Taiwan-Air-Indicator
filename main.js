// Vue.prototype.$http = axios;
var app = new Vue({
  el: "#app",
  data: {
    datas: [],
    county: [],
    selectCounty: "",
    information: {}
  },
  methods: {
    getData: function() {
      let vm = this;
      axios({
        methods: "get",
        url:
          "https://script.googleusercontent.com/macros/echo?user_content_key=lFKV-uRxj23J5cUQ1hjalxvdb0BESkFGi0y2IwKJRSfrPXfTb9LpXCrLNJP52UFrCmdbdoiVW6neepRiUYYKb0FivvJTw_JMOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMWojr9NvTBuBLhyHCd5hHa_xrjaoASiGvAeahWvkZTb2bi7JE1b5KDYZAj9vNTABfrJVLrDbFSoVp0Q3Zel6XzMPh_kljTXl7NHEvd_4-pQQlL1xe6QhjkO6i_s9crweZ8nzYNsx9xivbeRY3r6HNWwCJp59WPWboshFyOeiXM7zHZQ206ClGshu0XK1b9qtD&lib=M2KXVg-uR3n9Al0N_7AoYUEV_H-FNRPhS"
      }).then(response => {
        console.log("success");
        vm.datas = response.data;
        for (var i = 0; i < response.data.length; i++) {
          vm.county.push(response.data[i].County);
        }
        vm.county = this.filterData(vm.county);
      });
    },
    filterData: function(array) {
      var result = array.filter(function(element, index, arr) {
        return arr.indexOf(element) === index;
      });
      return result;
    },
    changeInformation(item) {
      const vm = this;
      vm.information = item;
    },
    dependBackground(status) {
      let background;
      switch (status) {
        case "普通":
          return (background = "background-yellow");
          break;
        case "良好":
          return (background = "background-green");
          break;
        case "對敏感族群不健康":
          return (background = "background-orange");
          break;
        case "對敏感族群不健康":
          return (background = "background-peach-red");
          break;
        case "對敏感族群不健康":
          return (background = "background-purple");
          break;
        case "對敏感族群不健康":
          return (background = "background-wine-red");
          break;
      }
    }
  },
  computed: {
    filterDatas: function() {
      const vm = this;
      let newArray = [];
      if (!vm.selectCounty) {
        newArray = vm.datas.filter(item => {
          return item.County === "臺北市";
        });
        vm.information = newArray[0];
        return newArray;
      } else {
        newArray = vm.datas.filter(item => {
          return item.County === vm.selectCounty;
        });
        vm.information = newArray[0];
        return newArray;
      }
    }
  },
  created: function() {
    this.getData();
  }
});
