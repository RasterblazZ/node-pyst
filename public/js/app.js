(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
document.addEventListener('DOMContentLoaded', function () {
    const forms = {
        "subscription" : {
            "form_id" : "newsubscription-form",
            "table_id" : "subscription-table",
        },
        "payments" : {
            "form_id" : "newpayment-form",
            "table_id" : "payment-table",
        }
    }

    const changePage = (direction) => {
        // TODO: make this usefull when {forms} is bigger
        if(direction == 'right'){
            document.getElementById(forms.subscription.form_id).setAttribute('hidden','true')
            document.getElementById(forms.subscription.table_id).setAttribute('hidden','true')

            document.getElementById(forms.payments.form_id).removeAttribute('hidden')
            document.getElementById(forms.payments.table_id).removeAttribute('hidden')
        }else{
            document.getElementById(forms.payments.form_id).setAttribute('hidden','true')
            document.getElementById(forms.payments.table_id).setAttribute('hidden','true')

            document.getElementById(forms.subscription.form_id).removeAttribute('hidden')
            document.getElementById(forms.subscription.table_id).removeAttribute('hidden')
        }
    }

    const formLeft = document.getElementById('btn-change-form-left')
    if(formLeft)
        formLeft.addEventListener('click',(event)=>{
            changePage('left')
        })
    
    const formRight = document.getElementById('btn-change-form-right')
    if(formRight)
        formRight.addEventListener('click',(event)=>{
            changePage('right')
        })
})
},{}]},{},[1]);
