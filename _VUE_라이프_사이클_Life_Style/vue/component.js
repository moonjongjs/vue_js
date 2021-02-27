Vue.component('comp-prop',{
    props:['mymessage'],
    template:`
        <li> {{ mymessage.name }}</li>
    `
});