const $form = document.querySelector('#form');
$form.addEventListener('submit', handleSubmit);
async function handleSubmit(event) {


    event.preventDefault();

    const form = new FormData(this);
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'aplication/json'
        }

    });
    if (response.ok) {
        this.reset();
        alertify
            .alert("Muchas Gracias! Lo estaremos contactando en breve. ¡Que tengas un lindo día!", function () {
                alertify.message('Genial');
            });
    };
};