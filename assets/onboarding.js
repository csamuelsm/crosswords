$(document).ready(function(){
    if (!api.get(`${getGameLang()}_onboarding`)) {
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
        //api.set(`${getGameLang()}_onboarding`, true)
    }

    $('.onboarding-show').on('click', function(){
        const onboardingModal = new bootstrap.Modal(document.getElementById('onboarding-1'))
        onboardingModal.show()
    })

    $('.configuracoes-show').on('click', function(){
        const configuracoesModal = new bootstrap.Modal(document.getElementById('configuracoes'))
        configuracoesModal.show()
    })
})