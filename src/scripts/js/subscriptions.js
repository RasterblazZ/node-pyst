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