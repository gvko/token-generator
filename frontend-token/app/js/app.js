import Vue from 'vue'
import Config from './config.js'
import Axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, Axios);

new Vue({
    el: '#app',
    data: {
        selectedEnvironment: null,
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
            
            Vue.axios.post(Config.api_endpoint+'/token', payload).then((response) => {
                console.log(response.data);
                this.generatedToken = resonse.data;
            });

            this.generatedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.BrM-t5lxrLj32ityJDeUoAgwLN1G63pUj60JUn_E4qo';
            
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