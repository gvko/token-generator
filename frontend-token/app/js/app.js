import Vue from 'vue'
import Config from './config.js'
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios);

new Vue({
  el: '#app',
  data: {
    selectedEnvironment: Config.environments[0].value,
    generatedToken: null,
    showCopiedMsg: false,
    hideCopiedMsgTimeout: null,
    userId: "",
    customerId: "",
    expirationOptionsInDays: [1, 2, 7, 30, 365],
    expirationInHours: null
  },
  computed: {
    environments() {
      return Config.environments;
    }
  },
  methods: {
    generateToken: async function () {
      let payload = {
        userId: this.userId,
        customerId: this.customerId,
        expirationInHours: this.expirationInHours,
        environment: this.selectedEnvironment
      };

      const response = await Vue.axios.post(Config.api_endpoint + '/tokens', payload);
      this.generatedToken = response.data;

      // Vue.axios.get('https://geek-jokes.sameerkumar.website/api').then((response) => {
      //     this.generatedToken = response.data;
      // });


    },
    copyToken: function () {
      const copyText = document.getElementById("token");
      const textArea = document.createElement("textarea");
      textArea.value = copyText.textContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("Copy");
      textArea.remove();
      this.showCopiedMsg = true;

      if (!this.hideCopiedMsgTimeout) {

        this.hideCopiendMsgTimeout = setTimeout(function () {
          this.showCopiedMsg = false;
          this.hideCopiedMsgTimeout = null;
        }, 3000);

      }

    },
    setExpirationInFromDays(days) {
      this.expirationInHours = days * 24;
    }
  }
});
