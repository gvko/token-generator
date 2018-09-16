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
        hideCopiendMsgTimeout: null,
        userId: "",
        customerId: "",
        expirationOptionsInDays:[1,2,7,30,365],
        expirationInHours: null
    },
    computed:{
        environments() {
            return Config.environments;
        }
    },
    methods:{
        generateToken: function() {
            let payload = {
                userId: this.userId,
                customerId: this.customerId,
                exp: Config.exp,
                environment: this.selectedEnvironment
            }
            
            // Vue.axios.post(Config.api_endpoint+'/token', payload).then((response) => {
            //     console.log(response.data);
            //     this.generatedToken = resonse.data;
            // });
            
            Vue.axios.get('https://geek-jokes.sameerkumar.website/api').then((response) => {
                this.generatedToken = response.data;
            });
            
            
        },
        copyToken: function() {
            var copyText = document.getElementById("token");
            var textArea = document.createElement("textarea");
            textArea.value = copyText.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("Copy");
            textArea.remove();
            this.showCopiedMsg = true;

            if(!this.hideCopiendMsgTimeout){

                this.hideCopiendMsgTimeout = setTimeout(function(){
                    this.showCopiedMsg = false;
                    this.hideCopiendMsgTimeout = null;
                }, 3000);

            }

        },
        setExpirationInFromDays(days){
            this.expirationInHours = days*24;
        }
    }
});